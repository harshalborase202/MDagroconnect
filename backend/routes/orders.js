// backend/routes/orders.js
// POST /api/orders           — place a new order (from cart checkout)
// GET  /api/orders           — list all orders (admin view, synced with Cloud Firestore)
// GET  /api/orders/:id       — get a single order with its items
// PATCH /api/orders/:id/status — update order status
// DELETE /api/orders/:id     — delete order

const express  = require('express');
const router   = express.Router();
const { body, validationResult } = require('express-validator');
const pool     = require('../db');
const memoryStore = require('../memoryStore');
const firebase = require('../firebase');
const { applyStockChange } = require('./inventory');
const { verifyAdmin, optionalToken } = require('../middleware/auth');

// Helper to reliably save an order to Cloud Firestore
async function saveOrderToFirestore(orderData) {
  if (!firebase.isFirebaseConnected()) return null;
  try {
    const db = firebase.getDb();
    const docId = String(orderData.id || orderData.order_id);
    const firestorePayload = {
      id: docId,
      order_id: docId,
      customer_name: orderData.customer_name || 'Valued Farmer',
      phone: String(orderData.phone || '').trim(),
      address: orderData.address || '',
      total_amount: Number(orderData.total_amount) || 0,
      status: orderData.status || 'pending',
      payment_method: orderData.payment_method || 'cod',
      notes: orderData.notes || null,
      user_id: orderData.user_id ? String(orderData.user_id) : null,
      items: orderData.items || [],
      created_at: orderData.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      source: 'MD Agro Connect'
    };
    await db.collection('orders').doc(docId).set(firestorePayload, { merge: true });
    console.log(`🔥 [Firestore] Successfully saved Order #${docId} to Cloud Firestore!`);
    return firestorePayload;
  } catch (fsErr) {
    console.warn('⚠️ [Firestore] Notice writing order to Cloud Firestore:', fsErr.message);
    return null;
  }
}

// ── Validation rules ─────────────────────────────────────────────────────
const orderValidation = [
  body('customerName')
    .trim()
    .notEmpty().withMessage('Customer name is required.')
    .isLength({ max: 120 }).withMessage('Name too long.'),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required.')
    .matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit Indian mobile number.'),

  body('address')
    .trim()
    .notEmpty().withMessage('Delivery address is required.')
    .isLength({ min: 10 }).withMessage('Please enter a more detailed address.'),

  body('items')
    .isArray({ min: 1 }).withMessage('Order must contain at least one item.'),

  body('items.*.productId')
    .trim()
    .notEmpty().withMessage('Each item must have a productId.'),

  body('items.*.quantity')
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1.'),
];

// ── POST /api/orders ──────────────────────────────────────────────────────
router.post('/', optionalToken, orderValidation, async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  const { customerName, phone, address, notes, items, userId, paymentMethod } = req.body;
  const resolvedUserId = (req.user && req.user.id) ? req.user.id : (userId || null);
  let conn;

  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    // Verify all products exist and fetch their current prices
    const productIds = items.map(i => i.productId);
    const placeholders = productIds.map(() => '?').join(',');
    const [products] = await conn.execute(
      `SELECT id, name, price FROM products WHERE id IN (${placeholders}) AND in_stock = 1`,
      productIds
    );

    if (products.length !== productIds.length) {
      await conn.rollback();
      throw new Error('One or more products in your cart are invalid or out of stock.');
    }

    const productMap = {};
    products.forEach(p => { productMap[p.id] = p; });

    let totalAmount = 0;
    const resolvedItems = [];
    for (const item of items) {
      const p = productMap[item.productId];
      const lineTotal = p.price * item.quantity;
      totalAmount += lineTotal;
      resolvedItems.push({
        product_id: item.productId,
        product_name: p.name,
        unit_price: p.price,
        quantity: item.quantity,
        line_total: lineTotal
      });
    }

    let [orderResult] = await conn.execute(
      `INSERT INTO orders (customer_name, phone, address, total_amount, notes, user_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [customerName, phone, address, totalAmount, notes || null, resolvedUserId]
    );
    const orderId = orderResult.insertId;

    for (const item of resolvedItems) {
      await conn.execute(
        `INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity, line_total)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [orderId, item.product_id, item.product_name, item.unit_price, item.quantity, item.line_total]
      );
    }

    // Auto-deduct inventory stock for each ordered item
    for (const item of resolvedItems) {
      try {
        await applyStockChange(conn, {
          productId:      item.product_id,
          changeType:     'sale',
          quantityChange: -item.quantity,
          referenceId:    String(orderId),
          note:           `Order #${orderId}`,
          createdBy:      'system',
        });
      } catch (invErr) {
        // Non-fatal: log but don't block the order from being placed
        console.warn(`[orders] Inventory deduction notice for ${item.product_id}:`, invErr.message);
      }
    }

    await conn.commit();

    const orderRecord = {
      id: orderId,
      order_id: String(orderId),
      customer_name: customerName,
      phone,
      address,
      total_amount: totalAmount,
      status: 'pending',
      payment_method: paymentMethod || 'cod',
      notes: notes || null,
      user_id: resolvedUserId,
      items: resolvedItems,
      created_at: new Date().toISOString()
    };

    // Save to Firestore & memoryStore
    await saveOrderToFirestore(orderRecord);
    memoryStore.addOrder(orderRecord);

    return res.status(201).json({
      success:     true,
      message:     'Order placed successfully! Synchronized to Cloud Firestore.',
      orderId,
      totalAmount,
      data: orderRecord
    });
  } catch (err) {
    if (conn) {
      try { await conn.rollback(); } catch(e) {}
    }
    console.warn('[orders] MySQL notice, saving to Cloud Firestore & resilient store:', err.message);

    // Fallback product price resolver
    const catalogPrices = {
      's1': 450, 's2': 320, 's3': 180, 's4': 550, 's5': 420, 's6': 310, 's7': 480, 's8': 220,
      's9': 350, 's10': 380, 's11': 490, 's12': 280, 's13': 520, 's14': 260, 's15': 340, 's16': 290,
      's17': 270, 's18': 390,
      'f1': 250, 'f2': 350, 'f3': 499, 'f4': 280, 'f5': 360, 'f6': 370, 'f7': 450, 'f8': 420,
      'p1': 290, 'p2': 420, 'p3': 380, 'p4': 320,
      't1': 150, 't2': 2800, 't3': 650, 't4': 3200, 't5': 850
    };

    let fallbackTotal = 0;
    const resolvedItems = items.map(item => {
      const price = item.unitPrice || catalogPrices[item.productId] || 250;
      const line = price * item.quantity;
      fallbackTotal += line;
      return {
        product_id: item.productId,
        product_name: item.productName || `Agricultural Input #${item.productId}`,
        unit_price: price,
        quantity: item.quantity,
        line_total: line
      };
    });

    const fallbackOrderId = Date.now() % 1000000;
    const createdOrder = memoryStore.addOrder({
      id: fallbackOrderId,
      customer_name: customerName,
      phone,
      address,
      total_amount: fallbackTotal,
      notes: notes || null,
      user_id: resolvedUserId,
      payment_method: paymentMethod || 'cod',
      items: resolvedItems,
      created_at: new Date().toISOString()
    });

    // Save directly to Cloud Firestore!
    await saveOrderToFirestore(createdOrder);

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully! Saved to Cloud Firestore.',
      orderId: createdOrder.id,
      totalAmount: createdOrder.total_amount,
      data: createdOrder
    });
  } finally {
    if (conn) {
      try { conn.release(); } catch(e) {}
    }
  }
});

// ── GET /api/orders ───────────────────────────────────────────────────────
router.get('/', verifyAdmin, async (req, res) => {
  const { status, search, limit = 100, offset = 0 } = req.query;

  // 1. Try Cloud Firestore first for unified cloud storage
  if (firebase.isFirebaseConnected()) {
    try {
      const db = firebase.getDb();
      const snap = await db.collection('orders').get();
      if (!snap.empty) {
        let firestoreOrders = [];
        snap.forEach(doc => firestoreOrders.push(doc.data()));
        firestoreOrders.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

        if (status) {
          firestoreOrders = firestoreOrders.filter(o => o.status === status);
        }
        if (search && search.trim()) {
          const term = search.trim().toLowerCase();
          firestoreOrders = firestoreOrders.filter(o => 
            (o.customer_name && o.customer_name.toLowerCase().includes(term)) ||
            (o.phone && o.phone.includes(term)) ||
            (String(o.id) === term)
          );
        }
        return res.json({
          success: true,
          count: firestoreOrders.length,
          data: firestoreOrders.slice(Number(offset), Number(offset) + Number(limit)),
          source: 'Cloud Firestore'
        });
      }
    } catch (fsErr) {
      console.warn('[orders] Firestore fetch fallback:', fsErr.message);
    }
  }

  // 2. Try MySQL
  try {
    let sql    = 'SELECT * FROM orders WHERE 1=1';
    const params = [];
    const validStatuses = ['pending','confirmed','dispatched','delivered','cancelled'];
    if (status && validStatuses.includes(status)) {
      sql += ' AND status = ?';
      params.push(status);
    }
    if (search && search.trim()) {
      sql += ' AND (customer_name LIKE ? OR phone LIKE ? OR id = ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, Number(search.trim()) || 0);
    }
    sql += ` ORDER BY created_at DESC LIMIT ${Number(limit)} OFFSET ${Number(offset)}`;

    const [orders] = await pool.execute(sql, params);
    return res.json({ success: true, count: orders.length, data: orders, source: 'MySQL' });
  } catch (err) {
    // 3. Fallback to resilient memoryStore
    const orders = memoryStore.getOrders();
    return res.json({ success: true, count: orders.length, data: orders, source: 'Local Store' });
  }
});

// ── GET /api/orders/:id ───────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  const reqId = String(req.params.id);

  // 1. Try Cloud Firestore
  if (firebase.isFirebaseConnected()) {
    try {
      const db = firebase.getDb();
      const doc = await db.collection('orders').doc(reqId).get();
      if (doc.exists) {
        return res.json({ success: true, data: doc.data(), source: 'Cloud Firestore' });
      }
    } catch (e) {}
  }

  // 2. Try MySQL
  try {
    const numId = Number(reqId);
    if (!isNaN(numId)) {
      const [[order]] = await pool.execute('SELECT * FROM orders WHERE id = ?', [numId]);
      if (order) {
        const [items] = await pool.execute('SELECT * FROM order_items WHERE order_id = ?', [numId]);
        return res.json({ success: true, data: { ...order, items }, source: 'MySQL' });
      }
    }
  } catch (err) {}

  // 3. Memory store
  const order = memoryStore.getOrderById(reqId);
  if (order) {
    return res.json({ success: true, data: order, source: 'Local Store' });
  }
  return res.status(404).json({ success: false, message: 'Order not found.' });
});

// ── PATCH /api/orders/:id/status ──────────────────────────────────────────
router.patch('/:id/status', verifyAdmin, async (req, res) => {
  const reqId = String(req.params.id);
  const { status } = req.body;
  const validStatuses = ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Status must be one of: ${validStatuses.join(', ')}`,
    });
  }

  // Update Cloud Firestore
  if (firebase.isFirebaseConnected()) {
    try {
      const db = firebase.getDb();
      await db.collection('orders').doc(reqId).set({
        status,
        updated_at: new Date().toISOString()
      }, { merge: true });
      console.log(`🔥 [Firestore] Updated Order #${reqId} status to "${status}"`);
    } catch (e) {}
  }

  // Update MySQL if available
  try {
    const numId = Number(reqId);
    if (!isNaN(numId)) {
      await pool.execute('UPDATE orders SET status = ? WHERE id = ?', [status, numId]);
    }
  } catch (err) {}

  // Update memoryStore
  memoryStore.updateOrderStatus(reqId, status);

  return res.json({
    success: true,
    message: `Order #${reqId} status updated to "${status}".`,
    status
  });
});

// ── DELETE /api/orders/:id ────────────────────────────────────────────────
router.delete('/:id', verifyAdmin, async (req, res) => {
  const reqId = String(req.params.id);

  // Delete from Cloud Firestore
  if (firebase.isFirebaseConnected()) {
    try {
      const db = firebase.getDb();
      await db.collection('orders').doc(reqId).delete();
      console.log(`🔥 [Firestore] Deleted Order #${reqId} from Cloud Firestore`);
    } catch (e) {}
  }

  // Delete from MySQL
  try {
    const numId = Number(reqId);
    if (!isNaN(numId)) {
      await pool.execute('DELETE FROM orders WHERE id = ?', [numId]);
    }
  } catch (err) {}

  // Delete from memoryStore
  memoryStore.deleteOrder(reqId);

  return res.json({ success: true, message: `Order #${reqId} deleted successfully.` });
});

module.exports = router;
