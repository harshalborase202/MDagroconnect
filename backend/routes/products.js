// backend/routes/products.js
// GET /api/products          — list all products (optional ?category= filter)
// GET /api/products/:id      — get a single product by id

const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// ── GET /api/products ─────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;

    let sql    = 'SELECT * FROM products WHERE in_stock = 1';
    const params = [];

    const validCategories = ['seeds', 'fertilizers', 'protection', 'tools'];
    if (category && validCategories.includes(category)) {
      sql += ' AND category = ?';
      params.push(category);
    }

    sql += ' ORDER BY category, id';

    const [rows] = await pool.execute(sql, params);

    // Parse the JSON tags column back to an array
    const products = rows.map(p => ({
      ...p,
      tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags,
    }));

    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    console.error('[products] GET /:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch products.' });
  }
});

// ── GET /api/products/:id ─────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM products WHERE id = ? AND in_stock = 1',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    const product = {
      ...rows[0],
      tags: typeof rows[0].tags === 'string' ? JSON.parse(rows[0].tags) : rows[0].tags,
    };

    res.json({ success: true, data: product });
  } catch (err) {
    console.error('[products] GET /:id:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch product.' });
  }
});

module.exports = router;
