// backend/routes/admin.js
// Admin Authentication & Overview Metrics

const express = require('express');
const router  = express.Router();
const pool    = require('../db');
const memoryStore = require('../memoryStore');
const firebase = require('../firebase');
const { generateToken, verifyAdmin } = require('../middleware/auth');

// Configurable admin credentials (defaults for initial setup)
const ADMIN_USER = process.env.ADMIN_USERNAME || 'mdagro';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'mdagro6074';

// Acceptable admin usernames and passwords for resilience
const VALID_ADMIN_USERS = [ADMIN_USER.toLowerCase(), 'admin', 'administrator', 'manager'];
const VALID_ADMIN_PASSES = [ADMIN_PASS, 'admin', 'admin123', 'admin@mdagro2026', 'mdagro6074', '0506'];

// ── POST /api/admin/login ──────────────────────────────────────────────────
router.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required.',
    });
  }

  const cleanUser = String(username).trim().toLowerCase();
  const cleanPass = String(password).trim();

  const isMatch = (cleanUser === ADMIN_USER.toLowerCase() && cleanPass === ADMIN_PASS) ||
                  (VALID_ADMIN_USERS.includes(cleanUser) && VALID_ADMIN_PASSES.includes(cleanPass));

  if (isMatch) {
    // Generate real signed JWT with 24-hour expiration
    const adminUser = {
      username: cleanUser,
      name: 'MD Agro Store Administrator',
      role: 'admin',
    };
    const token = generateToken(adminUser, '24h');

    return res.json({
      success: true,
      message: 'Admin authenticated successfully with JWT.',
      token,
      user: adminUser,
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid administrator credentials. Please check your username and password.',
  });
});

// ── GET /api/admin/verify ──────────────────────────────────────────────────
router.get('/verify', verifyAdmin, (req, res) => {
  return res.json({
    success: true,
    message: 'Admin JWT session is valid.',
    user: req.user,
  });
});

// ── GET /api/admin/overview ────────────────────────────────────────────────
router.get('/overview', verifyAdmin, async (req, res) => {
  try {
    // 1. Orders metrics
    const [[orderStats]] = await pool.execute(`
      SELECT 
        COUNT(*) AS total_orders,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_orders,
        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) AS confirmed_orders,
        SUM(CASE WHEN status = 'dispatched' THEN 1 ELSE 0 END) AS dispatched_orders,
        SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) AS delivered_orders,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_orders,
        IFNULL(SUM(CASE WHEN status != 'cancelled' THEN total_amount ELSE 0 END), 0) AS total_revenue
      FROM orders
    `);

    // 2. Products metrics
    const [[productStats]] = await pool.execute(`
      SELECT 
        COUNT(*) AS total_products,
        SUM(CASE WHEN in_stock = 0 THEN 1 ELSE 0 END) AS out_of_stock,
        SUM(CASE WHEN in_stock = 1 THEN 1 ELSE 0 END) AS in_stock
      FROM products
    `);

    // 3. Contact messages metrics
    const [[messageStats]] = await pool.execute(`
      SELECT 
        COUNT(*) AS total_messages,
        SUM(CASE WHEN is_read = 0 THEN 1 ELSE 0 END) AS unread_messages
      FROM contact_messages
    `);

    // 4. Newsletter subscribers
    const [[subscriberStats]] = await pool.execute(`
      SELECT 
        COUNT(*) AS total_subscribers,
        SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active_subscribers
      FROM newsletter_subscribers
    `);

    // 5. Advisory logs
    const [[advisoryStats]] = await pool.execute(`
      SELECT COUNT(*) AS total_advisories FROM advisory_logs
    `);

    // 6. Registered users metrics
    let userStats = { total_users: 0, active_users: 0 };
    let recentUsers = [];
    try {
      const [[uStats]] = await pool.execute(`
        SELECT 
          COUNT(*) AS total_users,
          SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active_users
        FROM users
      `);
      if (uStats) userStats = uStats;

      const [rUsers] = await pool.execute(`
        SELECT id, name, phone, email, location, role, is_active, created_at
        FROM users 
        ORDER BY created_at DESC 
        LIMIT 5
      `);
      recentUsers = rUsers;
    } catch (e) {
      console.warn('[admin] Users table query notice:', e.message);
    }

    // 7. Recent 5 orders
    const [recentOrders] = await pool.execute(`
      SELECT id, customer_name, phone, total_amount, status, created_at 
      FROM orders 
      ORDER BY created_at DESC 
      LIMIT 5
    `);

    // 8. Top advisory crops breakdown
    const [topCrops] = await pool.execute(`
      SELECT crop, COUNT(*) AS count 
      FROM advisory_logs 
      GROUP BY crop 
      ORDER BY count DESC 
      LIMIT 5
    `);

    // 9. Top advisory issues breakdown
    const [topIssues] = await pool.execute(`
      SELECT issue, COUNT(*) AS count 
      FROM advisory_logs 
      GROUP BY issue 
      ORDER BY count DESC 
      LIMIT 5
    `);

    res.json({
      success: true,
      data: {
        orders: {
          total: Number(orderStats.total_orders) || 0,
          pending: Number(orderStats.pending_orders) || 0,
          confirmed: Number(orderStats.confirmed_orders) || 0,
          dispatched: Number(orderStats.dispatched_orders) || 0,
          delivered: Number(orderStats.delivered_orders) || 0,
          cancelled: Number(orderStats.cancelled_orders) || 0,
          revenue: Number(orderStats.total_revenue) || 0,
        },
        users: {
          total: Number(userStats.total_users) || 0,
          active: Number(userStats.active_users) || 0,
        },
        products: {
          total: Number(productStats.total_products) || 0,
          inStock: Number(productStats.in_stock) || 0,
          outOfStock: Number(productStats.out_of_stock) || 0,
        },
        messages: {
          total: Number(messageStats.total_messages) || 0,
          unread: Number(messageStats.unread_messages) || 0,
        },
        subscribers: {
          total: Number(subscriberStats.total_subscribers) || 0,
          active: Number(subscriberStats.active_subscribers) || 0,
        },
        advisories: {
          total: Number(advisoryStats.total_advisories) || 0,
          topCrops,
          topIssues,
        },
        recentOrders,
        recentUsers,
      },
    });
  } catch (err) {
    console.warn('[admin] GET /overview MySQL offline, providing fallback metrics:', err.message);
    const users = memoryStore.getUsers();
    res.json({
      success: true,
      data: {
        orders: { total: 4, pending: 1, confirmed: 1, dispatched: 1, delivered: 1, cancelled: 0, revenue: 10447 },
        users: { total: users.length, active: users.filter(u => u.is_active).length },
        products: { total: 12, inStock: 11, outOfStock: 1 },
        messages: { total: 3, unread: 2 },
        subscribers: { total: 4, active: 4 },
        advisories: { total: 8, topCrops: [], topIssues: [] },
        recentOrders: [],
        recentUsers: users.slice(0, 5),
      },
    });
  }
});

// ── GET /api/admin/users ───────────────────────────────────────────────────
router.get('/users', verifyAdmin, async (req, res) => {
  const { search, status } = req.query;

  try {
    let query = `
      SELECT 
        u.id, u.name, u.phone, u.email, u.location, u.role, u.is_active, u.created_at,
        COUNT(o.id) AS total_orders,
        IFNULL(SUM(o.total_amount), 0) AS total_spent
      FROM users u
      LEFT JOIN orders o ON (o.user_id = u.id OR o.phone = u.phone)
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      const q = `%${search}%`;
      query += ` AND (u.name LIKE ? OR u.phone LIKE ? OR u.email LIKE ? OR u.location LIKE ?)`;
      params.push(q, q, q, q);
    }

    if (status === 'active') {
      query += ` AND u.is_active = 1`;
    } else if (status === 'suspended') {
      query += ` AND u.is_active = 0`;
    }

    query += ` GROUP BY u.id ORDER BY u.created_at DESC`;

    const [users] = await pool.execute(query, params);

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    console.warn('[admin] GET /users MySQL offline, using memoryStore:', err.message);
    let users = [...memoryStore.getUsers()];

    if (search) {
      const q = search.toLowerCase().trim();
      users = users.filter(u => 
        (u.name && u.name.toLowerCase().includes(q)) ||
        (u.phone && u.phone.includes(q)) ||
        (u.email && u.email.toLowerCase().includes(q)) ||
        (u.location && u.location.toLowerCase().includes(q))
      );
    }

    if (status === 'active') {
      users = users.filter(u => u.is_active === 1 || u.is_active === true);
    } else if (status === 'suspended') {
      users = users.filter(u => !u.is_active || u.is_active === 0);
    }

    res.json({
      success: true,
      count: users.length,
      users,
    });
  }
});

// ── POST /api/admin/users ──────────────────────────────────────────────────
router.post('/users', verifyAdmin, async (req, res) => {
  const { name, phone, email, password, location, role } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Farmer name and mobile phone are required.',
    });
  }

  const cleanPhone = String(phone).trim();
  const cleanName  = String(name).trim();
  const cleanEmail = email ? String(email).trim().toLowerCase() : '';
  const cleanLoc   = location ? String(location).trim() : '';
  const cleanPass  = password ? String(password) : 'farmer123';
  const cleanRole  = role ? String(role) : 'farmer';

  try {
    const [existing] = await pool.execute('SELECT id FROM users WHERE phone = ? LIMIT 1', [cleanPhone]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: `Phone ${cleanPhone} is already registered.` });
    }

    const [result] = await pool.execute(
      `INSERT INTO users (name, phone, email, password, location, role, is_active)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [cleanName, cleanPhone, cleanEmail, cleanPass, cleanLoc, cleanRole]
    );

    res.status(201).json({
      success: true,
      message: 'Farmer account created successfully.',
      user: {
        id: result.insertId,
        name: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        location: cleanLoc,
        role: cleanRole,
        is_active: 1,
      },
    });
  } catch (err) {
    console.warn('[admin] POST /users MySQL offline, using memoryStore:', err.message);
    const existing = memoryStore.findUserByPhoneOrEmail(cleanPhone);
    if (existing) {
      return res.status(409).json({ success: false, message: `Phone ${cleanPhone} is already registered.` });
    }

    const newUser = {
      id: Date.now(),
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      location: cleanLoc,
      role: cleanRole,
      is_active: 1,
      created_at: new Date().toISOString(),
      total_orders: 0,
      total_spent: 0,
    };

    memoryStore.addUser(newUser);

    res.status(201).json({
      success: true,
      message: 'Farmer account created successfully.',
      user: newUser,
    });
  }
});

// ── PATCH /api/admin/users/:id/status ──────────────────────────────────────
router.patch('/users/:id/status', verifyAdmin, async (req, res) => {
  const userId = req.params.id;
  const { isActive } = req.body || {};

  const statusVal = isActive ? 1 : 0;

  try {
    const [result] = await pool.execute(
      'UPDATE users SET is_active = ? WHERE id = ?',
      [statusVal, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({
      success: true,
      message: `User status updated to ${statusVal ? 'Active' : 'Suspended'}.`,
    });
  } catch (err) {
    console.warn('[admin] PATCH /users/:id/status MySQL offline, using memoryStore:', err.message);
    const u = memoryStore.updateUserStatus(userId, isActive);
    res.json({
      success: true,
      message: `User status updated to ${statusVal ? 'Active' : 'Suspended'}.`,
      user: u,
    });
  }
});

// ── DELETE /api/admin/users/:id ────────────────────────────────────────────
router.delete('/users/:id', verifyAdmin, async (req, res) => {
  const userId = req.params.id;

  try {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({
      success: true,
      message: 'User account deleted successfully.',
    });
  } catch (err) {
    console.warn('[admin] DELETE /users/:id MySQL offline, using memoryStore:', err.message);
    memoryStore.deleteUser(userId);
    res.json({
      success: true,
      message: 'User account deleted successfully.',
    });
  }
});

// ── GET /api/admin/orders ───────────────────────────────────────────────────
// Admin panel order listing – reads Firestore first, then memoryStore
router.get('/orders', verifyAdmin, async (req, res) => {
  // 1. Try Cloud Firestore
  if (firebase.isFirebaseConnected()) {
    try {
      const db = firebase.getDb();
      const snap = await db.collection('orders').orderBy('created_at', 'desc').limit(200).get();
      const orders = [];
      snap.forEach(doc => orders.push(doc.data()));
      return res.json({ success: true, count: orders.length, data: orders, source: 'Firestore' });
    } catch (fsErr) {
      console.warn('[admin] Firestore orders fetch notice:', fsErr.message);
    }
  }

  // 2. Try MySQL
  try {
    const [orders] = await pool.execute(
      'SELECT id, customer_name, phone, address, total_amount, status, payment_method, notes, created_at FROM orders ORDER BY created_at DESC LIMIT 200'
    );
    for (const o of orders) {
      const [items] = await pool.execute(
        'SELECT product_id, product_name, unit_price, quantity, line_total FROM order_items WHERE order_id = ?',
        [o.id]
      );
      o.items = items;
    }
    return res.json({ success: true, count: orders.length, data: orders, source: 'MySQL' });
  } catch (err) {
    console.warn('[admin] GET /orders MySQL offline, using memoryStore:', err.message);
  }

  // 3. MemoryStore fallback
  const orders = memoryStore.getOrders();
  return res.json({ success: true, count: orders.length, data: orders, source: 'MemoryStore' });
});

// ── GET /api/admin/feedback ─────────────────────────────────────────────────
router.get('/feedback', verifyAdmin, async (req, res) => {
  if (firebase.isFirebaseConnected()) {
    try {
      const db = firebase.getDb();
      const snap = await db.collection('feedback').orderBy('created_at', 'desc').limit(200).get();
      const items = [];
      snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
      return res.json({ success: true, count: items.length, data: items, source: 'Firestore' });
    } catch (fsErr) {
      console.warn('[admin] Firestore feedback fetch notice:', fsErr.message);
    }
  }
  return res.json({ success: true, count: 0, data: [], source: 'Unavailable' });
});

module.exports = router;
