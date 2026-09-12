// backend/routes/contact.js
// POST /api/contact  — save a contact form message
// GET  /api/contact  — list all messages (admin view)
// PATCH /api/contact/:id/read — mark read/unread
// DELETE /api/contact/:id — delete message

const express  = require('express');
const router   = express.Router();
const { body, validationResult } = require('express-validator');
const pool     = require('../db');

// In-memory fallback if MySQL is offline
let fallbackInquiries = [
  { id: 1, name: 'Anil Deshmukh', email: 'anil.deshmukh@gmail.com', phone: '9822156789', message: 'I have 5 acres of cotton. Facing pink bollworm infestation in flowering stage. Suggest dosage of Neem Shield.', is_read: 0, created_at: new Date(Date.now() - 3600000 * 4).toISOString() },
  { id: 2, name: 'Vikram Joshi', email: 'v.joshi@agritech.in', phone: '9422034567', message: 'Do you provide bulk delivery of NPK 19:19:19 fertilizers for our farmer cooperative in Nashik? Looking for 50 bags.', is_read: 0, created_at: new Date(Date.now() - 3600000 * 12).toISOString() }
];

// ── Validation rules ─────────────────────────────────────────────────────
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 120 }).withMessage('Name too long.'),

  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail().withMessage('Enter a valid email address.')
    .normalizeEmail(),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[6-9]\d{9}$/).withMessage('Enter a valid 10-digit Indian mobile number.'),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required.')
    .isLength({ min: 5, max: 2000 }).withMessage('Message must be 5–2000 characters.'),
];

// ── POST /api/contact ─────────────────────────────────────────────────────
router.post('/', contactValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  let { name, email, phone, message } = req.body;
  const cleanEmail = email && String(email).trim() ? String(email).trim() : (phone ? `${phone}@farmer.in` : 'farmer@mdagro.com');

  try {
    const [result] = await pool.execute(
      'INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name, cleanEmail, phone || null, message]
    );

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. An MD Agro advisor will contact you within 24 hours.',
      id: result.insertId,
    });
  } catch (err) {
    console.warn('[contact] POST / MySQL offline, saving in fallback storage:', err.message);
    const newMsg = {
      id: Date.now() % 100000,
      name,
      email: cleanEmail,
      phone: phone || null,
      message,
      is_read: 0,
      created_at: new Date().toISOString()
    };
    fallbackInquiries.unshift(newMsg);
    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. An MD Agro advisor will contact you within 24 hours.',
      id: newMsg.id,
    });
  }
});

// ── GET /api/contact ──────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 100'
    );
    return res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.warn('[contact] GET / MySQL offline, serving fallback inquiries:', err.message);
    return res.json({ success: true, count: fallbackInquiries.length, data: fallbackInquiries });
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

    return res.json({ success: true, message: `Message marked as ${target === 1 ? 'read' : 'unread'}.`, is_read: target });
  } catch (err) {
    console.warn('[contact] PATCH /:id/read MySQL offline:', err.message);
    const msg = fallbackInquiries.find(m => String(m.id) === String(req.params.id));
    if (msg) {
      msg.is_read = req.body.is_read ? 1 : 0;
      return res.json({ success: true, message: `Message marked as ${msg.is_read ? 'read' : 'unread'}.`, is_read: msg.is_read });
    }
    return res.status(404).json({ success: false, message: 'Message not found.' });
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

    return res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (err) {
    console.warn('[contact] DELETE /:id MySQL offline:', err.message);
    fallbackInquiries = fallbackInquiries.filter(m => String(m.id) !== String(req.params.id));
    return res.json({ success: true, message: 'Message deleted successfully.' });
  }
});

module.exports = router;
