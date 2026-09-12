// backend/server.js
// MD Agro Connect — Express API Server
// Starts on PORT from .env (default 3001)

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = Number(process.env.PORT) || 3001;

// Global process error guards to prevent server crashing on transient connection errors
process.on('uncaughtException', (err) => {
  console.warn('[server] Uncaught exception prevented crash:', err.message);
});
process.on('unhandledRejection', (reason) => {
  console.warn('[server] Unhandled rejection prevented crash:', reason?.message || reason);
});

// ── CORS ──────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:8080,http://127.0.0.1:8080,http://localhost:5500,http://127.0.0.1:5500,http://localhost:3000')
  .split(',')
  .map(o => o.trim());

// Regex to allow any local host / dev port or local network (LAN) IP
const localNetworkPattern = /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3})(:\d+)?$/;

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests, file:/// (origin is 'null'), listed origins, and LAN IPs
    if (!origin || origin === 'null' || allowedOrigins.includes(origin) || localNetworkPattern.test(origin)) {
      callback(null, true);
    } else {
      // In development mode, allow any origin to prevent friction
      callback(null, true);
    }
  },
  methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// ── Body Parsing ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ── Health Check ──────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status:  'ok',
    service: 'MD Agro Connect API',
    time:    new Date().toISOString(),
  });
});

// ── Routes ────────────────────────────────────────────────────────────────
app.use('/api/products',   require('./routes/products'));
app.use('/api/orders',     require('./routes/orders'));
app.use('/api/contact',    require('./routes/contact'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/advisory',   require('./routes/advisory'));
app.use('/api/chat',       require('./routes/chat'));
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/admin',      require('./routes/admin'));

// ── 404 Handler ───────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route "${req.method} ${req.path}" not found.` });
});

// ── Global Error Handler ──────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[server] Unhandled error:', err.message);
  res.status(500).json({ success: false, message: err.message || 'Internal server error.' });
});

// ── Start ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║       🌱  MD Agro Connect API Server         ║');
  console.log(`║       http://localhost:${PORT}                  ║`);
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');
  console.log('  Endpoints:');
  console.log(`  GET  http://localhost:${PORT}/api/health`);
  console.log(`  GET  http://localhost:${PORT}/api/products`);
  console.log(`  POST http://localhost:${PORT}/api/orders`);
  console.log(`  POST http://localhost:${PORT}/api/contact`);
  console.log(`  POST http://localhost:${PORT}/api/newsletter/subscribe`);
  console.log(`  POST http://localhost:${PORT}/api/advisory/log`);
  console.log('');
});
