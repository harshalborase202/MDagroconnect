// backend/sync_orders_to_firestore.js
// Synchronizes existing storefront orders from local storage into Cloud Firestore

require('dotenv').config();
const firebase = require('./firebase');
const memoryStore = require('./memoryStore');

async function syncOrders() {
  console.log('🌱 Starting MD Agro Orders Synchronization to Cloud Firestore...');

  if (!firebase.isFirebaseConnected()) {
    console.error('❌ Firebase is not connected!');
    process.exit(1);
  }

  const db = firebase.getDb();
  const orders = memoryStore.getOrders();
  console.log(`📦 Found ${orders.length} local orders to synchronize...`);

  const batch = db.batch();
  let count = 0;

  for (const o of orders) {
    const docId = String(o.id || o.order_id);
    const docRef = db.collection('orders').doc(docId);
    batch.set(docRef, {
      id: docId,
      order_id: docId,
      customer_name: o.customer_name || 'Farmer Customer',
      phone: String(o.phone || '').trim(),
      address: o.address || '',
      total_amount: Number(o.total_amount) || 0,
      status: o.status || 'pending',
      payment_method: o.payment_method || 'cod',
      notes: o.notes || null,
      user_id: o.user_id ? String(o.user_id) : null,
      items: o.items || [],
      created_at: o.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      source: 'MD Agro Storefront Sync'
    }, { merge: true });
    count++;
  }

  await batch.commit();
  console.log(`🎉 Successfully synchronized all ${count} orders to Cloud Firestore (Collection: "orders")!`);
  
  // Verify count in Firestore
  const countSnap = await db.collection('orders').count().get();
  console.log(`🔥 Total orders now present in Cloud Firestore: ${countSnap.data().count}`);
  process.exit(0);
}

syncOrders().catch(err => {
  console.error('❌ Orders sync failed:', err.message);
  process.exit(1);
});
