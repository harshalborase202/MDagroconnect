// backend/test_firebase.js
// Automated verification script for Firebase integration

const firebase = require('./firebase');
const assert = require('assert');

console.log('🧪 Testing MD Agro Firebase Module...');

// 1. Module export test
assert.strictEqual(typeof firebase.isFirebaseConnected, 'function', 'isFirebaseConnected must be a function');
assert.strictEqual(typeof firebase.getDb, 'function', 'getDb must be a function');
assert.strictEqual(typeof firebase.getProjectId, 'function', 'getProjectId must be a function');
assert.ok(firebase.collections, 'firebase.collections must be exported');
console.log('✅  Firebase module interface verified.');

// 2. Connection state inspection
const connected = firebase.isFirebaseConnected();
const projectId = firebase.getProjectId();
console.log(`ℹ️  Initial Firebase Connection Status: ${connected ? 'CONNECTED' : 'STANDBY (Awaiting Credentials)'}`);
console.log(`ℹ️  Active Project ID: ${projectId || 'None configured yet'}`);

console.log('🎉 Firebase module loaded cleanly and ready for Cloud Firestore!');
process.exit(0);
