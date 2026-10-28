// backend/firebase.js
// Firebase Admin SDK Initialization & Cloud Firestore Interface
// Modern modular API (firebase-admin v12+) for MD Agro Connect

const { initializeApp, getApps, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');
const fs = require('fs');

let isConnected = false;
let db = null;
let activeProjectId = null;
let appInstance = null;

function initializeFirebase() {
  const existingApps = getApps();
  if (existingApps.length > 0) {
    appInstance = existingApps[0];
    db = getFirestore(appInstance);
    isConnected = true;
    return { isConnected: true, db, projectId: activeProjectId };
  }

  try {
    // 1. Try serviceAccountKey.json in backend directory or custom path
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY 
      ? path.resolve(process.cwd(), process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      : path.join(__dirname, 'serviceAccountKey.json');

    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      appInstance = initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id || process.env.FIREBASE_PROJECT_ID,
      });
      activeProjectId = serviceAccount.project_id || process.env.FIREBASE_PROJECT_ID;
      db = getFirestore(appInstance);
      isConnected = true;
      console.log(`🔥  Firebase Admin SDK connected with serviceAccountKey (Project: "${activeProjectId}")`);
      return { isConnected: true, db, projectId: activeProjectId };
    }

    // 2. Try inline environment credentials
    if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PROJECT_ID) {
      appInstance = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
      activeProjectId = process.env.FIREBASE_PROJECT_ID;
      db = getFirestore(appInstance);
      isConnected = true;
      console.log(`🔥  Firebase Admin SDK connected via Environment Secrets (Project: "${activeProjectId}")`);
      return { isConnected: true, db, projectId: activeProjectId };
    }

    // 3. Try Project ID with default credentials if configured
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PROJECT_ID.trim().length > 0) {
      activeProjectId = process.env.FIREBASE_PROJECT_ID.trim();
      appInstance = initializeApp({
        projectId: activeProjectId,
      });
      db = getFirestore(appInstance);
      isConnected = true;
      console.log(`🔥  Firebase Admin SDK initialized with Project ID: "${activeProjectId}"`);
      return { isConnected: true, db, projectId: activeProjectId };
    }

    console.log('ℹ️  Firebase: Ready for connection. Place "serviceAccountKey.json" in backend/ or set FIREBASE_PROJECT_ID in backend/.env');
    return { isConnected: false, db: null, projectId: null };
  } catch (err) {
    console.warn('⚠️  Firebase initialization notice:', err.message);
    return { isConnected: false, db: null, projectId: null, error: err.message };
  }
}

// Initial setup call
initializeFirebase();

module.exports = {
  getApp: () => appInstance,
  getDb: () => db,
  isFirebaseConnected: () => isConnected,
  getProjectId: () => activeProjectId,
  initializeFirebase,
  collections: {
    get products() { return db ? db.collection('products') : null; },
    get orders() { return db ? db.collection('orders') : null; },
    get users() { return db ? db.collection('users') : null; },
    get feedback() { return db ? db.collection('feedback') : null; },
    get contact() { return db ? db.collection('contact_messages') : null; },
  }
};
