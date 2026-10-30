// backend/memoryStore.js
// Resilient In-Memory & File-backed Store when MySQL is disconnected

const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(__dirname, 'mock_users_data.json');
const ORDERS_FILE = path.join(__dirname, 'mock_orders_data.json');

const DEFAULT_USERS = [
  {
    id: 1,
    name: 'Ramesh Patil',
    phone: '9822145670',
    email: 'ramesh.patil@gmail.com',
    location: 'Nashik, Maharashtra',
    password: 'farmer123',
    role: 'farmer',
    is_active: 1,
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    total_orders: 2,
    total_spent: 1250,
  },
  {
    id: 2,
    name: 'Santosh Shinde',
    phone: '9423589123',
    email: 'santosh.shinde@rediffmail.com',
    location: 'Dindori, Maharashtra',
    password: 'farmer123',
    role: 'farmer',
    is_active: 1,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    total_orders: 1,
    total_spent: 450,
  },
];

const DEFAULT_ORDERS = [
  {
    id: 101,
    user_id: 1,
    customer_name: 'Rajesh Patil',
    phone: '9822012345',
    address: 'Plot 14, Near Krishi Bhavan, Baramati, Pune - 413102',
    total_amount: 3250.00,
    status: 'pending',
    notes: 'Please dispatch morning batch. Sowing cycle.',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    items: [
      { id: 1, product_id: 's1', product_name: 'Premium Hybrid Cotton Seeds', unit_price: 450, quantity: 4, line_total: 1800 },
      { id: 2, product_id: 'f2', product_name: 'NPK 19:19:19 Soluble Fertilizer', unit_price: 350, quantity: 3, line_total: 1050 },
    ]
  },
  {
    id: 102,
    user_id: 2,
    customer_name: 'Suresh More',
    phone: '9421098765',
    address: 'Gat No. 88, Post Rahuri, Dist. Ahmednagar - 413705',
    total_amount: 3450.00,
    status: 'confirmed',
    notes: 'Call before dispatch.',
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
    items: [
      { id: 3, product_id: 't2', product_name: 'Battery Operated Knapsack Sprayer', unit_price: 2800, quantity: 1, line_total: 2800 },
      { id: 4, product_id: 't3', product_name: '3-in-1 Soil Moisture & pH Meter', unit_price: 650, quantity: 1, line_total: 650 },
    ]
  }
];

let users = [];
let orders = [];

try {
  if (fs.existsSync(USERS_FILE)) {
    users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
  } else {
    users = [...DEFAULT_USERS];
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  }
} catch (e) {
  users = [...DEFAULT_USERS];
}

try {
  if (fs.existsSync(ORDERS_FILE)) {
    orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
  } else {
    orders = [...DEFAULT_ORDERS];
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  }
} catch (e) {
  orders = [...DEFAULT_ORDERS];
}

function saveUsers() {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (e) {}
}

function saveOrders() {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  } catch (e) {}
}

module.exports = {
  // User operations
  getUsers: () => users,
  addUser: (user) => {
    users.unshift(user);
    saveUsers();
    return user;
  },
  findUserByPhoneOrEmail: (identifier) => {
    if (!identifier) return null;
    const clean = String(identifier).trim().toLowerCase();
    return users.find(u => 
      String(u.phone).trim() === clean || 
      (u.email && String(u.email).trim().toLowerCase() === clean)
    );
  },
  updateUserStatus: (id, isActive) => {
    const u = users.find(user => String(user.id) === String(id));
    if (u) {
      u.is_active = isActive ? 1 : 0;
      saveUsers();
      return u;
    }
    return null;
  },
  deleteUser: (id) => {
    users = users.filter(user => String(user.id) !== String(id));
    saveUsers();
  },

  // Order operations
  getOrders: () => orders,
  addOrder: (order) => {
    const newOrder = {
      id: order.id || Math.floor(100000 + Math.random() * 900000),
      user_id: order.user_id || order.userId || null,
      customer_name: order.customer_name || order.customerName,
      phone: order.phone,
      address: order.address,
      total_amount: Number(order.total_amount || order.totalAmount) || 0,
      status: order.status || 'pending',
      notes: order.notes || null,
      created_at: order.created_at || new Date().toISOString(),
      items: order.items || []
    };
    orders.unshift(newOrder);
    saveOrders();
    return newOrder;
  },
  getOrderById: (id) => {
    return orders.find(o => String(o.id) === String(id)) || null;
  },
  updateOrderStatus: (id, status) => {
    const o = orders.find(order => String(order.id) === String(id));
    if (o) {
      o.status = status;
      saveOrders();
      return o;
    }
    return null;
  },
  deleteOrder: (id) => {
    orders = orders.filter(order => String(order.id) !== String(id));
    saveOrders();
  }
};
