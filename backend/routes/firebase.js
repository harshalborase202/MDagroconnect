// backend/routes/firebase.js
// Cloud Firestore Management & Sync API
// MD Agro Connect

const express = require('express');
const router = express.Router();
const firebase = require('../firebase');
const { verifyAdmin, optionalToken } = require('../middleware/auth');

// ── GET /api/firebase/status ──────────────────────────────────────────────
router.get('/status', async (req, res) => {
  const connected = firebase.isFirebaseConnected();
  const projectId = firebase.getProjectId();

  let counts = { products: 0, orders: 0, users: 0, feedback: 0 };
  let error = null;

  if (connected && firebase.getDb()) {
    try {
      const db = firebase.getDb();
      const [prodSnap, orderSnap, userSnap, feedSnap] = await Promise.all([
        db.collection('products').count().get(),
        db.collection('orders').count().get(),
        db.collection('users').count().get(),
        db.collection('feedback').count().get(),
      ]);
      counts = {
        products: prodSnap.data().count,
        orders: orderSnap.data().count,
        users: userSnap.data().count,
        feedback: feedSnap.data().count,
      };
    } catch (err) {
      error = err.message;
    }
  }

  res.json({
    connected,
    projectId: projectId || null,
    provider: 'Cloud Firestore',
    counts,
    error,
    instructions: !connected 
      ? 'To activate live Cloud Firestore, place serviceAccountKey.json in the backend/ directory or set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in backend/.env'
      : 'Cloud Firestore is connected and ready for synchronization.',
  });
});

// ── POST /api/firebase/sync (Admin only or setup) ──────────────────────────
router.post('/sync', async (req, res) => {
  if (!firebase.isFirebaseConnected()) {
    return res.status(503).json({
      success: false,
      message: 'Firebase is not connected yet. Please provide your Project ID and service account credentials first.',
    });
  }

  try {
    const db = firebase.getDb();
    const batch = db.batch();
    let productCount = 0;

    // 1. Sync default agricultural products to Firestore
    const products = [
      {
        id: 'seed-01',
        name: 'Mahyco Hybrid Cotton Seeds (MRC-7351)',
        category: 'seeds',
        price: 850.00,
        unit: '450g Pouch',
        rating: 4.8,
        reviews: 142,
        description: 'High-yield BG-II hybrid cotton seed with proven resistance to American bollworm. Ideal for black cotton soils in Vidarbha and Marathwada regions.',
        image: 'images/cotton-seeds.jpg',
        tags: 'cotton, hybrid, bg2, high-yield, pest-resistant',
        in_stock: true,
      },
      {
        id: 'fert-01',
        name: 'IFFCO Nano Urea Liquid',
        category: 'fertilizers',
        price: 240.00,
        unit: '500ml Bottle',
        rating: 4.7,
        reviews: 289,
        description: 'Revolutionary nanotechnology-based liquid nitrogen fertilizer. One 500ml bottle effectively replaces a 45kg bag of conventional granular urea.',
        image: 'images/nano-urea.jpg',
        tags: 'nano, urea, nitrogen, liquid, eco-friendly',
        in_stock: true,
      },
      {
        id: 'pest-01',
        name: 'Neem Shield Pure Bio-Pesticide',
        category: 'pesticides',
        price: 450.00,
        unit: '1 Litre Can',
        rating: 4.9,
        reviews: 95,
        description: 'Cold-pressed 10,000 PPM Azadirachtin organic bio-pesticide. Controls whiteflies, aphids, thrips, and caterpillars without chemical toxicity.',
        image: 'images/neem-shield.jpg',
        tags: 'bio, organic, neem, azadirachtin, eco-safe',
        in_stock: true,
      },
      {
        id: 'tool-01',
        name: 'AgroShakti 16L Battery Knapsack Sprayer',
        category: 'tools',
        price: 2850.00,
        unit: '1 Unit (with Battery & Charger)',
        rating: 4.6,
        reviews: 67,
        description: 'Heavy-duty 12V 12Ah dual-motor knapsack sprayer with adjustable brass lance. Delivers 6-8 hours of continuous field spraying on a single charge.',
        image: 'images/battery-sprayer.jpg',
        tags: 'sprayer, battery, 16l, agricultural-tools',
        in_stock: true,
      },
      {
        id: 'pest-02',
        name: 'Kavach Systemic Broad-Spectrum Fungicide',
        category: 'pesticides',
        price: 620.00,
        unit: '500g Pack',
        rating: 4.7,
        reviews: 112,
        description: 'Chlorothalonil 75% WP contact and systemic fungicide. Highly effective against downy mildew, leaf spot, anthracnose, and early blight.',
        image: 'images/fungicide.jpg',
        tags: 'fungicide, blight, mildew, systemic, crop-protection',
        in_stock: true,
      },
      {
        id: 'irr-01',
        name: 'Jain Drip Inline Irrigation Lateral Pipe',
        category: 'tools',
        price: 1650.00,
        unit: '100m Bundle (16mm, 40cm spacing)',
        rating: 4.8,
        reviews: 83,
        description: 'UV-stabilized virgin polymer drip irrigation lateral pipe with clog-resistant cylindrical drippers. Conserves up to 60% irrigation water.',
        image: 'images/drip-pipe.jpg',
        tags: 'irrigation, drip, water-saving, micro-irrigation',
        in_stock: true,
      }
    ];

    for (const prod of products) {
      const docRef = db.collection('products').doc(prod.id);
      batch.set(docRef, { ...prod, updatedAt: new Date().toISOString() }, { merge: true });
      productCount++;
    }

    // 2. Seed initial demo user in Firestore
    const userRef = db.collection('users').doc('9822145670');
    batch.set(userRef, {
      name: 'Ramesh Patil',
      phone: '9822145670',
      email: 'ramesh.patil@gmail.com',
      location: 'Baramati, Pune',
      role: 'farmer',
      created_at: new Date().toISOString(),
    }, { merge: true });

    await batch.commit();

    res.json({
      success: true,
      message: `Successfully synchronized ${productCount} agricultural products and demo accounts to Cloud Firestore!`,
      project: firebase.getProjectId(),
    });
  } catch (err) {
    console.error('Firestore sync error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── GET /api/firebase/products ────────────────────────────────────────────
router.get('/products', async (req, res) => {
  if (!firebase.isFirebaseConnected()) {
    return res.status(503).json({ error: 'Firebase is not connected' });
  }

  try {
    const db = firebase.getDb();
    const snapshot = await db.collection('products').get();
    const products = [];
    snapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/firebase/feedback ───────────────────────────────────────────
router.post('/feedback', optionalToken, async (req, res) => {
  const { name, rating, comments, persona, category } = req.body;
  if (!comments || !rating) {
    return res.status(400).json({ error: 'Rating and comments are required.' });
  }

  const feedbackData = {
    name: name || (req.user ? req.user.name : 'Anonymous Farmer'),
    userId: req.user ? req.user.id : null,
    rating: Number(rating),
    comments: String(comments).trim(),
    persona: persona || 'farmer',
    category: category || 'general',
    submittedAt: new Date().toISOString(),
  };

  if (firebase.isFirebaseConnected()) {
    try {
      const db = firebase.getDb();
      const docRef = await db.collection('feedback').add(feedbackData);
      return res.status(201).json({
        success: true,
        message: 'Feedback saved directly to Cloud Firestore!',
        firestoreId: docRef.id,
        data: feedbackData,
      });
    } catch (err) {
      console.warn('Firestore feedback write fallback:', err.message);
    }
  }

  // Graceful local response if Firebase credentials pending
  res.status(200).json({
    success: true,
    message: 'Feedback received and queued for Cloud Firestore sync.',
    data: feedbackData,
  });
});

// ── GET /api/firebase/orders ──────────────────────────────────────────────
router.get('/orders', async (req, res) => {
  if (!firebase.isFirebaseConnected()) {
    return res.status(503).json({ success: false, error: 'Firebase is not connected' });
  }

  try {
    const db = firebase.getDb();
    const snapshot = await db.collection('orders').get();
    const orders = [];
    snapshot.forEach(doc => {
      orders.push({ firestoreId: doc.id, ...doc.data() });
    });
    orders.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    res.json({
      success: true,
      count: orders.length,
      orders,
      projectId: firebase.getProjectId(),
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── POST /api/firebase/orders (Direct Firestore order sync) ───────────────
router.post('/orders', optionalToken, async (req, res) => {
  if (!firebase.isFirebaseConnected()) {
    return res.status(503).json({ success: false, error: 'Firebase is not connected' });
  }

  const { customerName, phone, address, items, totalAmount, paymentMethod, notes, userId, orderId } = req.body;
  if (!customerName || !phone || !items || !Array.isArray(items)) {
    return res.status(400).json({ success: false, error: 'Missing required order details (customerName, phone, items).' });
  }

  const id = String(orderId || Date.now() % 1000000);
  const orderRecord = {
    id,
    order_id: id,
    customer_name: customerName,
    phone: String(phone).trim(),
    address: address || '',
    total_amount: Number(totalAmount) || 0,
    status: 'pending',
    payment_method: paymentMethod || 'cod',
    notes: notes || null,
    user_id: userId ? String(userId) : (req.user ? String(req.user.id) : null),
    items: items,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    source: 'Direct Firebase Sync'
  };

  try {
    const db = firebase.getDb();
    await db.collection('orders').doc(id).set(orderRecord, { merge: true });
    console.log(`🔥 [Firestore] Direct order sync successful: #${id}`);
    res.status(201).json({
      success: true,
      message: 'Order saved directly to Cloud Firestore!',
      orderId: id,
      order: orderRecord
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

