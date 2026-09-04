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

const DEFAULT_CATALOG = [
  { id: 's1', name: 'Cotton Hybrid Pro Seeds', category: 'seeds', price: 450, unit: 'per kg', rating: 4.8, reviews: 128, description: 'High-yield cotton seeds with excellent pest resistance.', image: 'cotton-seed', tags: ['Best Seller', 'High Yield'], in_stock: 1 },
  { id: 's2', name: 'Golden Wheat Premium Seeds', category: 'seeds', price: 320, unit: 'per 5kg bag', rating: 4.7, reviews: 95, description: 'Certified premium grade wheat seeds optimized for maximum grain weight.', image: 'wheat-seed', tags: ['Organic', 'Certified'], in_stock: 1 },
  { id: 's3', name: 'Sweet Corn Hybrid F1', category: 'seeds', price: 180, unit: 'per 500g', rating: 4.9, reviews: 64, description: 'Super sweet F1 hybrid variety with high germination rates.', image: 'corn-seed', tags: ['Sweet', 'F1 Hybrid'], in_stock: 1 },
  { id: 's4', name: 'High-Yield Paddy Seeds', category: 'seeds', price: 550, unit: 'per 10kg bag', rating: 4.6, reviews: 112, description: 'Premium rice seeds suitable for direct seeding.', image: 'paddy-seed', tags: ['Drought Tolerant'], in_stock: 1 },
  { id: 'f1', name: 'Organic Vermicompost booster', category: 'fertilizers', price: 250, unit: 'per 10kg bag', rating: 4.9, reviews: 210, description: '100% organic earthworm compost enriched with nitrogen.', image: 'vermicompost', tags: ['100% Organic', 'Soil Health'], in_stock: 1 },
  { id: 'f2', name: 'NPK 19:19:19 Soluble Fertilizer', category: 'fertilizers', price: 350, unit: 'per kg', rating: 4.7, reviews: 142, description: 'Fully water-soluble fertilizer for balanced crop nutrition.', image: 'npk', tags: ['Water Soluble'], in_stock: 1 },
  { id: 'f3', name: 'Premium Crop Booster Liquid', category: 'fertilizers', price: 499, unit: 'per 500ml', rating: 4.8, reviews: 87, description: 'Advanced liquid fertilizer with micronutrients and seaweed extract.', image: 'liquid-booster', tags: ['Fast Acting', 'Micronutrients'], in_stock: 1 },
  { id: 'f4', name: 'Soil Micronutrient Mixture', category: 'fertilizers', price: 280, unit: 'per 2kg bag', rating: 4.5, reviews: 49, description: 'Formulated mix of Zinc, Iron, Manganese, Boron, and Copper.', image: 'micronutrient', tags: ['Deficiency Cure'], in_stock: 1 },
  { id: 'p1', name: 'Bio-Pesticide Neem Shield', category: 'protection', price: 399, unit: 'per litre', rating: 4.8, reviews: 175, description: 'Cold-pressed concentrated neem oil extract. Natural repellent.', image: 'neem-oil', tags: ['Eco Friendly', 'Organic'], in_stock: 1 },
  { id: 'p2', name: 'Systemic Fungicide Guard', category: 'protection', price: 520, unit: 'per 500g', rating: 4.6, reviews: 88, description: 'Broad-spectrum systemic fungicide for leaf spots and powdery mildew.', image: 'fungicide', tags: ['Broad Spectrum'], in_stock: 1 },
  { id: 'p3', name: 'Sticky Insect Traps (Pack of 20)', category: 'protection', price: 199, unit: 'pack of 20', rating: 4.7, reviews: 93, description: 'Bright yellow/blue double-sided sticky glue traps.', image: 'sticky-trap', tags: ['Zero Chemical'], in_stock: 1 },
  { id: 't1', name: 'Battery Powered Knapsack Sprayer', category: 'tools', price: 2499, unit: 'per unit (16L)', rating: 4.9, reviews: 310, description: '16L tank with 12V 8Ah rechargeable battery.', image: 'sprayer', tags: ['Heavy Duty', '1 Year Warranty'], in_stock: 1 }
];

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
    console.warn('[products] MySQL offline, serving fallback catalog:', err.message);
    const { category, all } = req.query;
    let filtered = DEFAULT_CATALOG;
    if (all !== 'true') {
      filtered = filtered.filter(p => p.in_stock === 1);
    }
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }
    res.json({ success: true, count: filtered.length, data: filtered, isFallback: true });
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
