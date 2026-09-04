// backend/routes/products.js
// GET    /api/products          — list products (optional ?category= & ?all=true for admin)
// GET    /api/products/:id      — get a single product by id
// POST   /api/products          — create a new product (admin)
// PUT    /api/products/:id      — update product details (admin)
// PATCH  /api/products/:id/stock — toggle/set stock status (admin)
// DELETE /api/products/:id      — delete product (admin)

const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// ── GET /api/products ─────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { category, all } = req.query;

    // By default storefront only sees in-stock products; admin with ?all=true sees all
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (all !== 'true') {
      sql += ' AND in_stock = 1';
    }

    const validCategories = ['seeds', 'fertilizers', 'protection', 'tools'];
    if (category && validCategories.includes(category)) {
      sql += ' AND category = ?';
      params.push(category);
    }

    sql += ' ORDER BY category, id';

    const [rows] = await pool.execute(sql, params);

    // Parse the JSON tags column back to an array safely
    const products = rows.map(p => {
      let tags = [];
      try {
        tags = typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags;
      } catch (e) {
        tags = typeof p.tags === 'string' ? p.tags.split(',').map(t => t.trim()) : [];
      }
      return { ...p, tags };
    });

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
      'SELECT * FROM products WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    let tags = [];
    try {
      tags = typeof rows[0].tags === 'string' ? JSON.parse(rows[0].tags) : rows[0].tags;
    } catch (e) {
      tags = typeof rows[0].tags === 'string' ? rows[0].tags.split(',').map(t => t.trim()) : [];
    }

    const product = { ...rows[0], tags };
    res.json({ success: true, data: product });
  } catch (err) {
    console.error('[products] GET /:id:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch product.' });
  }
});

// ── POST /api/products (Create Product) ───────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { id, name, category, price, unit, rating, reviews, description, image, tags, in_stock } = req.body;

    if (!id || !name || !category || price === undefined || !unit) {
      return res.status(400).json({
        success: false,
        message: 'Product ID, name, category, price, and unit are required.',
      });
    }

    const tagsJson = Array.isArray(tags) ? JSON.stringify(tags) : JSON.stringify([tags || 'Quality Assured']);

    await pool.execute(
      `INSERT INTO products (id, name, category, price, unit, rating, reviews, description, image, tags, in_stock)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id.trim(),
        name.trim(),
        category.trim(),
        Number(price),
        unit.trim(),
        Number(rating) || 0.0,
        Number(reviews) || 0,
        description || '',
        image || 'md-agro-store',
        tagsJson,
        in_stock !== undefined ? (in_stock ? 1 : 0) : 1,
      ]
    );

    res.status(201).json({
      success: true,
      message: `Product "${name}" created successfully.`,
      productId: id,
    });
  } catch (err) {
    console.error('[products] POST /:', err.message);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: `Product ID "${req.body.id}" already exists.` });
    }
    res.status(500).json({ success: false, message: 'Failed to create product.' });
  }
});

// ── PUT /api/products/:id (Update Product) ────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const { name, category, price, unit, rating, reviews, description, image, tags, in_stock } = req.body;

    const tagsJson = Array.isArray(tags) ? JSON.stringify(tags) : JSON.stringify([tags || '']);

    const [result] = await pool.execute(
      `UPDATE products 
       SET name = ?, category = ?, price = ?, unit = ?, rating = ?, reviews = ?, description = ?, image = ?, tags = ?, in_stock = ?
       WHERE id = ?`,
      [
        name,
        category,
        Number(price),
        unit,
        Number(rating) || 0.0,
        Number(reviews) || 0,
        description || '',
        image,
        tagsJson,
        in_stock ? 1 : 0,
        req.params.id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.json({ success: true, message: `Product "${name}" updated successfully.` });
  } catch (err) {
    console.error('[products] PUT /:id:', err.message);
    res.status(500).json({ success: false, message: 'Failed to update product.' });
  }
});

// ── PATCH /api/products/:id/stock (Toggle Stock) ──────────────────────────
router.patch('/:id/stock', async (req, res) => {
  try {
    const { in_stock } = req.body;

    let targetStock;
    if (in_stock !== undefined) {
      targetStock = in_stock ? 1 : 0;
    } else {
      // Toggle current value
      const [[current]] = await pool.execute('SELECT in_stock FROM products WHERE id = ?', [req.params.id]);
      if (!current) return res.status(404).json({ success: false, message: 'Product not found.' });
      targetStock = current.in_stock === 1 ? 0 : 1;
    }

    await pool.execute('UPDATE products SET in_stock = ? WHERE id = ?', [targetStock, req.params.id]);

    res.json({
      success: true,
      message: `Product stock status updated to ${targetStock === 1 ? 'In Stock' : 'Out of Stock'}.`,
      in_stock: targetStock,
    });
  } catch (err) {
    console.error('[products] PATCH /:id/stock:', err.message);
    res.status(500).json({ success: false, message: 'Failed to update stock status.' });
  }
});

// ── DELETE /api/products/:id (Delete Product) ─────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.json({ success: true, message: 'Product deleted successfully.' });
  } catch (err) {
    console.error('[products] DELETE /:id:', err.message);
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete product because it is referenced in existing customer orders. You can set it to Out of Stock instead.',
      });
    }
    res.status(500).json({ success: false, message: 'Failed to delete product.' });
  }
});

module.exports = router;
