// backend/routes/advisory.js
// POST /api/advisory/log     — log a crop advisor query for analytics
// GET  /api/advisory/stats   — get top crop/issue combinations (admin)

const express  = require('express');
const router   = express.Router();
const { body, validationResult } = require('express-validator');
const pool     = require('../db');

const VALID_CROPS  = ['cotton', 'wheat', 'paddy', 'vegetables'];
const VALID_ISSUES = ['acidity', 'deficiency', 'pests', 'fungal', 'water'];

// ── Validation rules ─────────────────────────────────────────────────────
const logValidation = [
  body('crop')
    .trim()
    .notEmpty().withMessage('Crop is required.')
    .isIn(VALID_CROPS).withMessage(`Crop must be one of: ${VALID_CROPS.join(', ')}.`),

  body('issue')
    .trim()
    .notEmpty().withMessage('Issue is required.')
    .isIn(VALID_ISSUES).withMessage(`Issue must be one of: ${VALID_ISSUES.join(', ')}.`),
];

// ── POST /api/advisory/log ────────────────────────────────────────────────
router.post('/log', logValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  const { crop, issue } = req.body;

  try {
    await pool.execute(
      'INSERT INTO advisory_logs (crop, issue) VALUES (?, ?)',
      [crop, issue]
    );

    res.status(201).json({ success: true, message: 'Advisory query logged.' });
  } catch (err) {
    console.error('[advisory] POST /log:', err.message);
    res.status(500).json({ success: false, message: 'Failed to log advisory.' });
  }
});

// ── GET /api/advisory/stats ───────────────────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT crop, issue, COUNT(*) AS count
      FROM advisory_logs
      GROUP BY crop, issue
      ORDER BY count DESC
      LIMIT 20
    `);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('[advisory] GET /stats:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch stats.' });
  }
});

module.exports = router;
