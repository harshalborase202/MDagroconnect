// backend/routes/contact.js
// POST /api/contact  — save a contact form message
// GET  /api/contact  — list all messages (admin view)

const express  = require('express');
const router   = express.Router();
const { body, validationResult } = require('express-validator');
const pool     = require('../db');

// ── Validation rules ─────────────────────────────────────────────────────
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 120 }).withMessage('Name too long.'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Enter a valid email address.')
    .normalizeEmail(),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit mobile number.'),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required.')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be 10–2000 characters.'),
];

// ── POST /api/contact ─────────────────────────────────────────────────────
router.post('/', contactValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  const { name, email, phone, message } = req.body;

  try {
    const [result] = await pool.execute(
      'INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name, email, phone || null, message]
    );

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. An MD Agro advisor will contact you within 24 hours.',
      id: result.insertId,
    });
  } catch (err) {
    console.error('[contact] POST /:', err.message);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
});

// ── GET /api/contact ──────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 100'
    );
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error('[contact] GET /:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch messages.' });
  }
});

// ── PATCH /api/contact/:id/read ───────────────────────────────────────────
router.patch('/:id/read', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid message ID.' });

    const { is_read } = req.body;
    let target = is_read !== undefined ? (is_read ? 1 : 0) : 1;

    const [result] = await pool.execute('UPDATE contact_messages SET is_read = ? WHERE id = ?', [target, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    res.json({ success: true, message: `Message marked as ${target === 1 ? 'read' : 'unread'}.`, is_read: target });
  } catch (err) {
    console.error('[contact] PATCH /:id/read:', err.message);
    res.status(500).json({ success: false, message: 'Failed to update message status.' });
  }
});

// ── DELETE /api/contact/:id ───────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid message ID.' });

    const [result] = await pool.execute('DELETE FROM contact_messages WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (err) {
    console.error('[contact] DELETE /:id:', err.message);
    res.status(500).json({ success: false, message: 'Failed to delete message.' });
  }
});

module.exports = router;
