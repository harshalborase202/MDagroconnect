// backend/routes/orders.js
// POST /api/orders           — place a new order (from cart checkout)
// GET  /api/orders           — list all orders (admin view)
// GET  /api/orders/:id       — get a single order with its items

const express  = require('express');
const router   = express.Router();
const { body, validationResult } = require('express-validator');
const pool     = require('../db');

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

  const { customerName, phone, address, notes, items } = req.body;
  const conn = await pool.getConnection();

  try {
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
        message: 'One or more products are unavailable or out of stock.',
      });
    }

    const productMap = Object.fromEntries(products.map(p => [p.id, p]));

    // Calculate total
    let totalAmount = 0;
    for (const item of items) {
      const p = productMap[item.productId];
      if (!p) {
        await conn.rollback();
        return res.status(400).json({
          success: false,
          message: `Product "${item.productId}" not found.`,
        });
      }
      totalAmount += p.price * item.quantity;
    }

    // Insert order
    const [orderResult] = await conn.execute(
      `INSERT INTO orders (customer_name, phone, address, total_amount, notes)
       VALUES (?, ?, ?, ?, ?)`,
      [customerName, phone, address, totalAmount, notes || null]
    );
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

    res.status(201).json({
      success:     true,
      message:     'Order placed successfully! Our team will contact you shortly.',
      orderId,
      totalAmount,
    });
  } catch (err) {
    await conn.rollback();
    console.error('[orders] POST /:', err.message);
    res.status(500).json({ success: false, message: 'Failed to place order. Please try again.' });
  } finally {
    conn.release();
  }
});

// ── GET /api/orders ───────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;

    let sql    = 'SELECT * FROM orders';
    const params = [];

    const validStatuses = ['pending','confirmed','dispatched','delivered','cancelled'];
    if (status && validStatuses.includes(status)) {
      sql += ' WHERE status = ?';
      params.push(status);
    }

    sql += ` ORDER BY created_at DESC LIMIT ${Number(limit)} OFFSET ${Number(offset)}`;

    const [orders] = await pool.execute(sql, params);
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    console.error('[orders] GET /:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch orders.' });
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

    res.json({ success: true, data: { ...order, items } });
  } catch (err) {
    console.error('[orders] GET /:id:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch order.' });
  }
});

module.exports = router;
