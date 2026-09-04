// backend/memoryStore.js
// Resilient In-Memory & File-backed Store when MySQL is disconnected

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'mock_users_data.json');

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

let users = [];

try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    users = JSON.parse(raw);
  } else {
    users = [...DEFAULT_USERS];
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  }
} catch (e) {
  users = [...DEFAULT_USERS];
}

function saveUsers() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  } catch (e) {
    // Ignore write errors
  }
}

module.exports = {
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
  }
};
