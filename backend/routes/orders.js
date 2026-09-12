// backend/routes/orders.js
// POST /api/orders           — place a new order (from cart checkout)
// GET  /api/orders           — list all orders (admin view)
// GET  /api/orders/:id       — get a single order with its items
// PATCH /api/orders/:id/status — update order status
// DELETE /api/orders/:id     — delete order

const express  = require('express');
const router   = express.Router();
const { body, validationResult } = require('express-validator');
const pool     = require('../db');
const memoryStore = require('../memoryStore');

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
router.post('/', orderValidation, async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  const { customerName, phone, address, notes, items, userId } = req.body;
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
      return res.status(400).json({
        success: false,
        message: 'One or more products in your cart are invalid or out of stock.',
      });
    }

    // Build product lookup
    const productMap = {};
    products.forEach(p => { productMap[p.id] = p; });

    // Calculate total amount and validate line items
    let totalAmount = 0;
    for (const item of items) {
      const p = productMap[item.productId];
      if (!p) {
        await conn.rollback();
        return res.status(400).json({
          success: false,
          message: `Product ${item.productId} is not available.`,
        });
      }
      totalAmount += p.price * item.quantity;
    }

    // Insert order (with optional user_id)
    let orderResult;
    try {
      [orderResult] = await conn.execute(
        `INSERT INTO orders (customer_name, phone, address, total_amount, notes, user_id)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [customerName, phone, address, totalAmount, notes || null, userId || null]
      );
    } catch (insertErr) {
      [orderResult] = await conn.execute(
        `INSERT INTO orders (customer_name, phone, address, total_amount, notes)
         VALUES (?, ?, ?, ?, ?)`,
        [customerName, phone, address, totalAmount, notes || null]
      );
    }
    const orderId = orderResult.insertId;

    // Insert order items
    for (const item of items) {
      const p = productMap[item.productId];
      await conn.execute(
        `INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity, line_total)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [orderId, item.productId, p.name, p.price, item.quantity, p.price * item.quantity]
      );
    }

    await conn.commit();

    return res.status(201).json({
      success:     true,
      message:     'Order placed successfully! Our team will contact you shortly.',
      orderId,
      totalAmount,
    });
  } catch (err) {
    if (conn) {
      try { await conn.rollback(); } catch(e) {}
    }
    console.warn('[orders] MySQL unavailable, saving to resilient memory store:', err.message);

    // Fallback: Calculate from catalog or items directly
    const catalogPrices = {
      's1': 450, 's2': 320, 's3': 180, 's4': 550,
      'f1': 250, 'f2': 350, 'f3': 499, 'f4': 280,
      'p1': 290, 'p2': 420, 'p3': 380,
      't1': 150, 't2': 2800, 't3': 650
    };
    let fallbackTotal = 0;
    const resolvedItems = items.map(item => {
      const price = item.unitPrice || catalogPrices[item.productId] || 250;
      fallbackTotal += price * item.quantity;
      return {
        product_id: item.productId,
        product_name: item.productName || `Item #${item.productId}`,
        unit_price: price,
        quantity: item.quantity,
        line_total: price * item.quantity
      };
    });

    const createdOrder = memoryStore.addOrder({
      customer_name: customerName,
      phone,
      address,
      total_amount: fallbackTotal,
      notes: notes || null,
      user_id: userId || null,
      items: resolvedItems
    });

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully! Our team will contact you shortly.',
      orderId: createdOrder.id,
      totalAmount: createdOrder.total_amount,
    });
  } finally {
    if (conn) {
      try { conn.release(); } catch(e) {}
    }
  }
});

// ── GET /api/orders ───────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { status, search, limit = 100, offset = 0 } = req.query;

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
    return res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    console.warn('[orders] GET / MySQL offline, using memory store:', err.message);
    const orders = memoryStore.getOrders();
    return res.json({ success: true, count: orders.length, data: orders });
  }
});

// ── GET /api/orders/:id ───────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid order ID.' });

    const [[order]] = await pool.execute('SELECT * FROM orders WHERE id = ?', [id]);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });

    const [items] = await pool.execute(
      'SELECT * FROM order_items WHERE order_id = ?',
      [id]
    );

    return res.json({ success: true, data: { ...order, items } });
  } catch (err) {
    console.warn('[orders] GET /:id MySQL offline, using memory store:', err.message);
    const order = memoryStore.getOrderById(req.params.id);
    if (order) {
      return res.json({ success: true, data: order });
    }
    return res.status(404).json({ success: false, message: 'Order not found.' });
  }
});

// ── PATCH /api/orders/:id/status ──────────────────────────────────────────
router.patch('/:id/status', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid order ID.' });

    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const [result] = await pool.execute('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    return res.json({ success: true, message: `Order #${id} status updated to "${status}".`, status });
  } catch (err) {
    console.warn('[orders] PATCH /:id/status MySQL offline, using memory store:', err.message);
    const updated = memoryStore.updateOrderStatus(req.params.id, req.body.status);
    if (updated) {
      return res.json({ success: true, message: `Order #${req.params.id} status updated to "${req.body.status}".`, status: req.body.status });
    }
    return res.status(404).json({ success: false, message: 'Order not found.' });
  }
});

// ── DELETE /api/orders/:id ────────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid order ID.' });

    const [result] = await pool.execute('DELETE FROM orders WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    return res.json({ success: true, message: `Order #${id} deleted successfully.` });
  } catch (err) {
    console.warn('[orders] DELETE /:id MySQL offline, using memory store:', err.message);
    memoryStore.deleteOrder(req.params.id);
    return res.json({ success: true, message: `Order #${req.params.id} deleted successfully.` });
  }
});

module.exports = router;
