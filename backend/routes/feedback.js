// backend/routes/feedback.js
// POST /api/feedback   — submit customer feedback (saved to Cloud Firestore)
// GET  /api/feedback   — retrieve all feedbacks (public, for frontend display)

const express  = require('express');
const router   = express.Router();
const firebase = require('../firebase');

// POST /api/feedback
router.post('/', async (req, res) => {
  const { name, phone, email, role, rating, category, message, product } = req.body || {};

  if (!name || !message) {
    return res.status(400).json({ success: false, message: 'Name and feedback message are required.' });
  }

  const feedbackDoc = {
    name:      String(name).trim(),
    phone:     phone  ? String(phone).trim()  : '',
    email:     email  ? String(email).trim().toLowerCase() : '',
    role:      role   ? String(role)   : 'Farmer / Customer',
    rating:    Number(rating) || 5,
    category:  category ? String(category) : 'General Experience',
    product:   product  ? String(product)  : '',
    message:   String(message).trim(),
    created_at: new Date().toISOString(),
    status: 'new'
  };

  if (firebase.isFirebaseConnected()) {
    try {
      const db = firebase.getDb();
      const docRef = await db.collection('feedback').add(feedbackDoc);
      console.log('Feedback saved to Firestore: ' + docRef.id);
      feedbackDoc.id = docRef.id;
    } catch (fsErr) {
      console.warn('[Feedback] Firestore save notice:', fsErr.message);
    }
  }

  return res.status(201).json({
    success: true,
    message: 'Thank you! Your feedback has been submitted successfully.',
    feedback: feedbackDoc
  });
});

// GET /api/feedback
router.get('/', async (req, res) => {
  if (firebase.isFirebaseConnected()) {
    try {
      const db = firebase.getDb();
      const snap = await db.collection('feedback').orderBy('created_at', 'desc').limit(50).get();
      const items = [];
      snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
      return res.json({ success: true, count: items.length, data: items });
    } catch (fsErr) {
      console.warn('[Feedback] Firestore read notice:', fsErr.message);
    }
  }
  return res.json({ success: true, count: 0, data: [] });
});

module.exports = router;
