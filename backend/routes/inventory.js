// backend/routes/inventory.js
// Inventory management endpoints — requires admin JWT
// Resilient: Works with MySQL when connected, and provides automatic file-backed
// in-memory persistence when MySQL is offline.

const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');
const pool    = require('../db');
const { verifyAdmin } = require('../middleware/auth');

let catalogData = [];
try {
  catalogData = require('../catalog_data');
} catch (e) {
  try {
    catalogData = require('./products').DEFAULT_CATALOG || [];
  } catch (e2) {
    catalogData = [];
  }
}

// File-backed offline stores
const INVENTORY_STORE_FILE = path.join(__dirname, '..', 'inventory_store.json');
const INVENTORY_LOGS_FILE  = path.join(__dirname, '..', 'inventory_logs.json');

let offlineInventory = {};
let offlineLogs = [];

// Initialize offline inventory from catalog data if file doesn't exist
try {
  if (fs.existsSync(INVENTORY_STORE_FILE)) {
    offlineInventory = JSON.parse(fs.readFileSync(INVENTORY_STORE_FILE, 'utf-8'));
  } else {
    catalogData.forEach(p => {
      offlineInventory[p.id] = {
        id: p.id,
        name: p.name,
        category: p.category,
        price: Number(p.price) || 0,
        unit: p.unit || '',
        image: p.image || '',
        in_stock: p.in_stock !== undefined ? p.in_stock : 1,
        stock_quantity: p.stockCount !== undefined ? p.stockCount : 50,
        low_stock_threshold: 15,
      };
    });
    fs.writeFileSync(INVENTORY_STORE_FILE, JSON.stringify(offlineInventory, null, 2));
  }
} catch (e) {
  console.warn('[inventory] Notice initializing offline inventory store:', e.message);
}

// Initialize offline logs
try {
  if (fs.existsSync(INVENTORY_LOGS_FILE)) {
    offlineLogs = JSON.parse(fs.readFileSync(INVENTORY_LOGS_FILE, 'utf-8'));
  } else {
    // Seed sample initial logs
    offlineLogs = [
      {
        id: 1,
        product_id: 's1',
        product_name: 'Premium Hybrid Cotton Seeds (Bt-II)',
        change_type: 'restock',
        quantity_change: 150,
        quantity_after: 150,
        reference_id: 'PO-2026-001',
        note: 'Opening warehouse stock',
        created_by: 'system',
        created_at: new Date(Date.now() - 86400000 * 3).toISOString()
      },
      {
        id: 2,
        product_id: 's2',
        product_name: 'Golden Wheat Premium Seeds (HD-2967)',
        change_type: 'restock',
        quantity_change: 120,
        quantity_after: 120,
        reference_id: 'PO-2026-001',
        note: 'Opening warehouse stock',
        created_by: 'system',
        created_at: new Date(Date.now() - 86400000 * 3).toISOString()
      }
    ];
    fs.writeFileSync(INVENTORY_LOGS_FILE, JSON.stringify(offlineLogs, null, 2));
  }
} catch (e) {
  console.warn('[inventory] Notice initializing offline logs store:', e.message);
}

function saveOfflineStores() {
  try {
    fs.writeFileSync(INVENTORY_STORE_FILE, JSON.stringify(offlineInventory, null, 2));
    fs.writeFileSync(INVENTORY_LOGS_FILE, JSON.stringify(offlineLogs, null, 2));
  } catch (e) {
    console.warn('[inventory] Could not save offline inventory:', e.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Stock movement executor: MySQL with fallback to File/Memory Store
// ─────────────────────────────────────────────────────────────────────────────
async function applyStockChange(conn, { productId, changeType, quantityChange, referenceId, note, createdBy }) {
  if (conn) {
    const [[product]] = await conn.execute(
      'SELECT stock_quantity FROM products WHERE id = ? FOR UPDATE',
      [productId]
    );
    if (!product) throw new Error(`Product "${productId}" not found.`);

    const newQty = Math.max(0, product.stock_quantity + quantityChange);

    await conn.execute(
      'UPDATE products SET stock_quantity = ?, in_stock = ? WHERE id = ?',
      [newQty, newQty > 0 ? 1 : 0, productId]
    );

    await conn.execute(
      `INSERT INTO inventory_logs
         (product_id, change_type, quantity_change, quantity_after, reference_id, note, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [productId, changeType, quantityChange, newQty, referenceId || null, note || null, createdBy || 'admin']
    );

    return newQty;
  }

  // Fallback to offline store
  const item = offlineInventory[productId];
  if (!item) {
    const found = catalogData.find(c => c.id === productId);
    if (found) {
      offlineInventory[productId] = {
        id: found.id,
        name: found.name,
        category: found.category,
        price: found.price,
        unit: found.unit,
        image: found.image,
        in_stock: 1,
        stock_quantity: 50,
        low_stock_threshold: 15,
      };
    }
  }

  const target = offlineInventory[productId];
  const oldQty = target ? target.stock_quantity : 0;
  const newQty = Math.max(0, oldQty + quantityChange);
  if (target) {
    target.stock_quantity = newQty;
    target.in_stock = newQty > 0 ? 1 : 0;
  }

  const logEntry = {
    id: Date.now(),
    product_id: productId,
    product_name: target ? target.name : productId,
    change_type: changeType,
    quantity_change: quantityChange,
    quantity_after: newQty,
    reference_id: referenceId || null,
    note: note || null,
    created_by: createdBy || 'admin',
    created_at: new Date().toISOString()
  };

  offlineLogs.unshift(logEntry);
  saveOfflineStores();
  return newQty;
}

// All endpoints require admin JWT verification
router.use(verifyAdmin);

// ── GET /api/inventory ────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  const { category, status } = req.query; // status: 'low' | 'out' | 'ok'

  // 1. Try MySQL
  try {
    let sql = `
      SELECT
        p.id, p.name, p.category, p.price, p.unit, p.image,
        p.in_stock, p.stock_quantity, p.low_stock_threshold,
        CASE
          WHEN p.stock_quantity = 0                                    THEN 'out'
          WHEN p.stock_quantity <= p.low_stock_threshold               THEN 'low'
          ELSE 'ok'
        END AS stock_status
      FROM products p
      WHERE 1=1
    `;
    const params = [];

    if (category && ['seeds','fertilizers','protection','tools'].includes(category)) {
      sql += ' AND p.category = ?';
      params.push(category);
    }

    if (status === 'out') {
      sql += ' AND p.stock_quantity = 0';
    } else if (status === 'low') {
      sql += ' AND p.stock_quantity > 0 AND p.stock_quantity <= p.low_stock_threshold';
    } else if (status === 'ok') {
      sql += ' AND p.stock_quantity > p.low_stock_threshold';
    }

    sql += ' ORDER BY p.category, p.name';

    const [rows] = await pool.execute(sql, params);
    return res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.warn('[inventory] GET / MySQL offline, using offline inventory store:', err.message);
  }

  // 2. Offline Store fallback
  let items = Object.values(offlineInventory);
  if (items.length === 0) {
    // Populate from catalog data if empty
    catalogData.forEach(p => {
      offlineInventory[p.id] = {
        id: p.id,
        name: p.name,
        category: p.category,
        price: Number(p.price) || 0,
        unit: p.unit || '',
        image: p.image || '',
        in_stock: p.in_stock !== undefined ? p.in_stock : 1,
        stock_quantity: p.stockCount !== undefined ? p.stockCount : 50,
        low_stock_threshold: 15,
      };
    });
    items = Object.values(offlineInventory);
  }

  items = items.map(p => {
    let stock_status = 'ok';
    if (p.stock_quantity === 0) stock_status = 'out';
    else if (p.stock_quantity <= p.low_stock_threshold) stock_status = 'low';
    return { ...p, stock_status };
  });

  if (category && category !== 'all') {
    items = items.filter(p => p.category === category);
  }

  if (status === 'out') {
    items = items.filter(p => p.stock_status === 'out');
  } else if (status === 'low') {
    items = items.filter(p => p.stock_status === 'low');
  } else if (status === 'ok') {
    items = items.filter(p => p.stock_status === 'ok');
  }

  res.json({ success: true, count: items.length, data: items, source: 'offline-store' });
});

// ── GET /api/inventory/summary ────────────────────────────────────────────────
router.get('/summary', async (req, res) => {
  try {
    const [[stats]] = await pool.execute(`
      SELECT
        COUNT(*)                                                    AS total_products,
        SUM(stock_quantity)                                         AS total_units,
        SUM(CASE WHEN stock_quantity = 0                     THEN 1 ELSE 0 END) AS out_of_stock,
        SUM(CASE WHEN stock_quantity > 0
                  AND stock_quantity <= low_stock_threshold   THEN 1 ELSE 0 END) AS low_stock,
        SUM(CASE WHEN stock_quantity > low_stock_threshold    THEN 1 ELSE 0 END) AS healthy_stock,
        IFNULL(SUM(stock_quantity * price), 0)                     AS total_inventory_value
      FROM products
    `);

    const [lowItems] = await pool.execute(`
      SELECT id, name, category, stock_quantity, low_stock_threshold
      FROM products
      WHERE stock_quantity > 0 AND stock_quantity <= low_stock_threshold
      ORDER BY stock_quantity ASC
      LIMIT 10
    `);

    const [outItems] = await pool.execute(`
      SELECT id, name, category, stock_quantity
      FROM products
      WHERE stock_quantity = 0
      ORDER BY name
      LIMIT 10
    `);

    return res.json({
      success: true,
      data: {
        totalProducts:        Number(stats.total_products) || 0,
        totalUnits:           Number(stats.total_units) || 0,
        outOfStock:           Number(stats.out_of_stock) || 0,
        lowStock:             Number(stats.low_stock) || 0,
        healthyStock:         Number(stats.healthy_stock) || 0,
        totalInventoryValue:  Number(stats.total_inventory_value) || 0,
        lowStockItems:        lowItems,
        outOfStockItems:      outItems,
      }
    });
  } catch (err) {
    console.warn('[inventory] GET /summary MySQL offline, computing from offline store:', err.message);
  }

  // Fallback computation
  const items = Object.values(offlineInventory);
  const totalProducts = items.length;
  const totalUnits = items.reduce((sum, p) => sum + (Number(p.stock_quantity) || 0), 0);
  const outOfStock = items.filter(p => p.stock_quantity === 0).length;
  const lowStock = items.filter(p => p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold).length;
  const healthyStock = items.filter(p => p.stock_quantity > p.low_stock_threshold).length;
  const totalInventoryValue = items.reduce((sum, p) => sum + ((Number(p.stock_quantity) || 0) * (Number(p.price) || 0)), 0);

  res.json({
    success: true,
    data: {
      totalProducts,
      totalUnits,
      outOfStock,
      lowStock,
      healthyStock,
      totalInventoryValue,
      lowStockItems: items.filter(p => p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold).slice(0, 10),
      outOfStockItems: items.filter(p => p.stock_quantity === 0).slice(0, 10),
    },
    source: 'offline-store'
  });
});

// ── GET /api/inventory/logs ───────────────────────────────────────────────────
router.get('/logs', async (req, res) => {
  const page  = Math.max(1, parseInt(req.query.page)  || 1);
  const limit = Math.min(100, parseInt(req.query.limit) || 20);
  const offset = (page - 1) * limit;
  const { productId, changeType } = req.query;

  try {
    let sql = `
      SELECT
        il.id, il.product_id, p.name AS product_name, p.category,
        il.change_type, il.quantity_change, il.quantity_after,
        il.reference_id, il.note, il.created_by, il.created_at
      FROM inventory_logs il
      JOIN products p ON p.id = il.product_id
      WHERE 1=1
    `;
    const params = [];
    if (productId) { sql += ' AND il.product_id = ?'; params.push(productId); }
    if (changeType) { sql += ' AND il.change_type = ?'; params.push(changeType); }
    sql += ` ORDER BY il.created_at DESC LIMIT ${limit} OFFSET ${offset}`;

    const [logs] = await pool.execute(sql, params);

    let countSql = 'SELECT COUNT(*) AS total FROM inventory_logs il WHERE 1=1';
    const countParams = [];
    if (productId) { countSql += ' AND il.product_id = ?'; countParams.push(productId); }
    if (changeType) { countSql += ' AND il.change_type = ?'; countParams.push(changeType); }
    const [[{ total }]] = await pool.execute(countSql, countParams);

    return res.json({
      success: true,
      count: logs.length,
      total: Number(total),
      page,
      totalPages: Math.ceil(Number(total) / limit),
      data: logs,
    });
  } catch (err) {
    console.warn('[inventory] GET /logs MySQL offline, using offline logs:', err.message);
  }

  // Fallback logs
  let filtered = [...offlineLogs];
  if (productId) {
    filtered = filtered.filter(l => l.product_id === productId);
  }
  if (changeType) {
    filtered = filtered.filter(l => l.change_type === changeType);
  }

  const paginated = filtered.slice(offset, offset + limit);

  res.json({
    success: true,
    count: paginated.length,
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit) || 1,
    data: paginated,
    source: 'offline-store'
  });
});

// ── GET /api/inventory/logs/:productId ───────────────────────────────────────
router.get('/logs/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const [logs] = await pool.execute(
      `SELECT il.*, p.name AS product_name
       FROM inventory_logs il
       JOIN products p ON p.id = il.product_id
       WHERE il.product_id = ?
       ORDER BY il.created_at DESC
       LIMIT 100`,
      [productId]
    );
    return res.json({ success: true, count: logs.length, data: logs });
  } catch (err) {
    console.warn('[inventory] GET /logs/:id MySQL offline, using offline logs:', err.message);
  }

  const logs = offlineLogs.filter(l => l.product_id === productId);
  res.json({ success: true, count: logs.length, data: logs, source: 'offline-store' });
});

// ── POST /api/inventory/adjust ────────────────────────────────────────────────
router.post('/adjust', async (req, res) => {
  const { productId, changeType, quantity, note } = req.body || {};

  if (!productId || !changeType || quantity === undefined) {
    return res.status(400).json({
      success: false,
      message: 'productId, changeType, and quantity are required.',
    });
  }

  const VALID_TYPES = ['restock', 'adjustment', 'damage', 'correction'];
  if (!VALID_TYPES.includes(changeType)) {
    return res.status(400).json({
      success: false,
      message: `changeType must be one of: ${VALID_TYPES.join(', ')}.`,
    });
  }

  const qty = parseInt(quantity);
  if (isNaN(qty) || qty === 0) {
    return res.status(400).json({ success: false, message: 'quantity must be a non-zero integer.' });
  }

  let quantityChange = qty;
  if (changeType === 'damage' && qty > 0) {
    quantityChange = -qty;
  }

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const newQty = await applyStockChange(conn, {
      productId,
      changeType,
      quantityChange,
      referenceId: null,
      note: note || null,
      createdBy: req.user?.username || 'admin',
    });

    await conn.commit();

    return res.json({
      success: true,
      message: `Stock ${changeType === 'restock' ? 'added' : 'adjusted'} successfully. New quantity: ${newQty}.`,
      data: { productId, newQuantity: newQty, changeType, quantityChange },
    });
  } catch (err) {
    if (conn) { try { await conn.rollback(); } catch (e) {} }
    console.warn('[inventory] POST /adjust MySQL offline, applying to offline store:', err.message);
  } finally {
    if (conn) conn.release();
  }

  // Offline adjustment
  try {
    const newQty = await applyStockChange(null, {
      productId,
      changeType,
      quantityChange,
      referenceId: null,
      note: note || null,
      createdBy: req.user?.username || 'admin',
    });

    res.json({
      success: true,
      message: `Stock ${changeType === 'restock' ? 'added' : 'adjusted'} successfully. New quantity: ${newQty}.`,
      data: { productId, newQuantity: newQty, changeType, quantityChange },
      source: 'offline-store'
    });
  } catch (offErr) {
    res.status(500).json({ success: false, message: offErr.message || 'Failed to adjust stock.' });
  }
});

// ── PATCH /api/inventory/:productId/threshold ─────────────────────────────────
router.patch('/:productId/threshold', async (req, res) => {
  const { threshold } = req.body || {};
  const thresh = parseInt(threshold);

  if (isNaN(thresh) || thresh < 0) {
    return res.status(400).json({ success: false, message: 'threshold must be a non-negative integer.' });
  }

  try {
    const [result] = await pool.execute(
      'UPDATE products SET low_stock_threshold = ? WHERE id = ?',
      [thresh, req.params.productId]
    );
    if (result.affectedRows > 0) {
      return res.json({ success: true, message: `Low-stock threshold updated to ${thresh}.`, threshold: thresh });
    }
  } catch (err) {
    console.warn('[inventory] PATCH /threshold MySQL offline, saving to offline store:', err.message);
  }

  if (offlineInventory[req.params.productId]) {
    offlineInventory[req.params.productId].low_stock_threshold = thresh;
    saveOfflineStores();
  }

  res.json({ success: true, message: `Low-stock threshold updated to ${thresh}.`, threshold: thresh, source: 'offline-store' });
});

module.exports = router;
module.exports.applyStockChange = applyStockChange;
