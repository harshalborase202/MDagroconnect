// backend/routes/newsletter.js
// POST /api/newsletter/subscribe   — subscribe an email address
// GET  /api/newsletter/subscribers — list subscribers (admin view)

const express  = require('express');
const router   = express.Router();
const { body, validationResult } = require('express-validator');
const pool     = require('../db');

// ── Validation rules ─────────────────────────────────────────────────────
const subscribeValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email address is required.')
    .isEmail().withMessage('Enter a valid email address.')
    .normalizeEmail(),
];

// ── POST /api/newsletter/subscribe ───────────────────────────────────────
router.post('/subscribe', subscribeValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  const { email } = req.body;

  try {
    // INSERT IGNORE handles duplicate emails silently
    const [result] = await pool.execute(
      'INSERT IGNORE INTO newsletter_subscribers (email) VALUES (?)',
      [email]
    );

    if (result.affectedRows === 0) {
      // Already subscribed — still return success so we don't leak info
      return res.json({
        success: true,
        message: "You're already subscribed! We'll keep you updated with the latest crop advisories and deals.",
      });
    }

    res.status(201).json({
      success: true,
      message: 'Subscribed successfully! Welcome to the MD Agro monthly advisory newsletter.',
      id: result.insertId,
    });
  } catch (err) {
    console.error('[newsletter] POST /subscribe:', err.message);
    res.status(500).json({ success: false, message: 'Subscription failed. Please try again.' });
  }
});

// ── GET /api/newsletter/subscribers ──────────────────────────────────────
router.get('/subscribers', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, email, is_active, subscribed_at FROM newsletter_subscribers ORDER BY subscribed_at DESC LIMIT 500'
    );
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error('[newsletter] GET /subscribers:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch subscribers.' });
  }
});

// ── PATCH /api/newsletter/subscribers/:id/status ──────────────────────────
router.patch('/subscribers/:id/status', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid subscriber ID.' });

    const { is_active } = req.body;
    let target = is_active !== undefined ? (is_active ? 1 : 0) : 1;

    const [result] = await pool.execute('UPDATE newsletter_subscribers SET is_active = ? WHERE id = ?', [target, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Subscriber not found.' });
    }

    res.json({ success: true, message: `Subscriber status updated to ${target === 1 ? 'active' : 'inactive'}.`, is_active: target });
  } catch (err) {
    console.error('[newsletter] PATCH /subscribers/:id/status:', err.message);
    res.status(500).json({ success: false, message: 'Failed to update subscriber.' });
  }
});

// ── DELETE /api/newsletter/subscribers/:id ────────────────────────────────
router.delete('/subscribers/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid subscriber ID.' });

    const [result] = await pool.execute('DELETE FROM newsletter_subscribers WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Subscriber not found.' });
    }

    res.json({ success: true, message: 'Subscriber removed successfully.' });
  } catch (err) {
    console.error('[newsletter] DELETE /subscribers/:id:', err.message);
    res.status(500).json({ success: false, message: 'Failed to delete subscriber.' });
  }
});

module.exports = router;
