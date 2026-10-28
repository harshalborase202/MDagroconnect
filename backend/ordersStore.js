// backend/ordersStore.js
// Resilient In-Memory & File-backed Store for Orders when MySQL is disconnected

const fs = require('fs');
const path = require('path');

const ORDERS_FILE = path.join(__dirname, 'orders_store.json');

let orders = [];

function loadOrders() {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
      orders = JSON.parse(raw);
    } else {
      orders = [];
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
    }
  } catch (e) {
    console.warn('[ordersStore] Error reading orders file:', e.message);
    orders = [];
  }
}

function saveOrders() {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  } catch (e) {
    console.error('[ordersStore] Failed to write orders file:', e.message);
  }
}

// Initial load
loadOrders();

module.exports = {
  getOrders: ({ status, search, limit = 100, offset = 0 } = {}) => {
    loadOrders();
    let result = [...orders];

    if (status && status !== 'all') {
      result = result.filter(o => o.status === status);
    }

    if (search && search.trim()) {
      const term = search.trim().toLowerCase();
      result = result.filter(o =>
        String(o.id).includes(term) ||
        (o.customer_name && o.customer_name.toLowerCase().includes(term)) ||
        (o.phone && String(o.phone).includes(term)) ||
        (o.address && o.address.toLowerCase().includes(term))
      );
    }

    // Sort newest first
    result.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

    const paged = result.slice(Number(offset), Number(offset) + Number(limit));
    return { count: result.length, data: paged };
  },

  getOrderById: (id) => {
    loadOrders();
    const numId = Number(id);
    return orders.find(o => Number(o.id) === numId || String(o.id) === String(id)) || null;
  },

  addOrder: (orderData) => {
    loadOrders();
    const newId = orderData.id || Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: newId,
      user_id: orderData.userId || orderData.user_id || null,
      customer_name: orderData.customerName || orderData.customer_name || 'Farmer Customer',
      phone: orderData.phone || '',
      address: orderData.address || '',
      total_amount: Number(orderData.totalAmount || orderData.total_amount || 0),
      status: orderData.status || 'pending',
      notes: orderData.notes || 'Placed via storefront',
      created_at: orderData.created_at || new Date().toISOString(),
      items: orderData.items || []
    };

    orders.unshift(newOrder);
    saveOrders();
    return newOrder;
  },

  updateOrderStatus: (id, status) => {
    loadOrders();
    const numId = Number(id);
    const order = orders.find(o => Number(o.id) === numId || String(o.id) === String(id));
    if (order) {
      order.status = status;
      saveOrders();
      return order;
    }
    return null;
  },

  deleteOrder: (id) => {
    loadOrders();
    const numId = Number(id);
    const initialLen = orders.length;
    orders = orders.filter(o => Number(o.id) !== numId && String(o.id) !== String(id));
    if (orders.length !== initialLen) {
      saveOrders();
      return true;
    }
    return false;
  }
};
