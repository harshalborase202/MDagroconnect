// backend/sync-to-firestore.js
// One-click sync script to migrate & seed MD Agro products and data into Cloud Firestore
// Usage: node backend/sync-to-firestore.js

require('dotenv').config();
const firebase = require('./firebase');
const products = require('./catalog_data');

async function syncCatalog() {
  console.log('🌱 Starting MD Agro Firestore Catalog Synchronization...');

  if (!firebase.isFirebaseConnected()) {
    console.error('❌  Firebase is not connected!');
    console.error('    Please provide your Firebase Project credentials:');
    console.error('    1. Place your serviceAccountKey.json file in the backend/ directory, OR');
    console.error('    2. Set FIREBASE_PROJECT_ID in backend/.env');
    process.exit(1);
  }

  const db = firebase.getDb();
  console.log(`✅  Connected to Firestore (Project: "${firebase.getProjectId()}")`);
  console.log(`📦 Writing ${products.length} products to "products" collection in Firestore...`);

  // Firestore allows up to 500 operations per batch
  const batch = db.batch();

  for (const item of products) {
    const ref = db.collection('products').doc(item.id);
    batch.set(ref, {
      ...item,
      syncedAt: new Date().toISOString(),
    }, { merge: true });
  }

  // Also seed demo farmer user in Firestore
  const farmerRef = db.collection('users').doc('9822145670');
  batch.set(farmerRef, {
    name: 'Ramesh Patil',
    phone: '9822145670',
    email: 'ramesh.patil@gmail.com',
    location: 'Baramati, Pune, Maharashtra',
    role: 'farmer',
    is_active: true,
    syncedAt: new Date().toISOString(),
  }, { merge: true });

  await batch.commit();
  console.log(`🎉 Successfully synchronized all ${products.length} catalog items and users into Cloud Firestore!`);
  process.exit(0);
}

syncCatalog().catch(err => {
  console.error('❌ Sync failed:', err.message);
  process.exit(1);
});
