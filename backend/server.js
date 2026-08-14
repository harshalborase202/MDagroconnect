// backend/server.js
// MD Agro Connect — Express API Server
// Starts on PORT from .env (default 3001)

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = Number(process.env.PORT) || 3001;

// ── CORS ──────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:8080')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. Postman, curl) and listed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked — origin "${origin}" is not allowed.`));
    }
  },
  methods:     ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
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
