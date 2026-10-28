// firebase-config.js
// Client-side Firebase Configuration & Cloud Firestore Helper
// MD Agro Connect

const firebaseConfig = {
  // Replace these values with your Firebase Web App configuration from Firebase Console:
  apiKey: "AIzaSyDummyKeyReplaceWithYourOwnApiKey",
  authDomain: "md-agro-connect.firebaseapp.com",
  projectId: "md-agro-connect",
  storageBucket: "md-agro-connect.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Dynamic API base for both local dev and production hosting
const _fbPort = (typeof window !== 'undefined' && window.location && window.location.port) ? window.location.port : '';
const _FB_API_BASE = (_fbPort === '8080' || _fbPort === '5500') ? `http://${window.location.hostname || 'localhost'}:3001/api` : '/api';

// Check backend Firebase status
async function checkBackendFirebaseStatus() {
  try {
    const res = await fetch(`${_FB_API_BASE}/firebase/status`);
    if (!res.ok) return { connected: false, error: 'Server unreachable' };
    return await res.json();
  } catch (err) {
    return { connected: false, error: err.message };
  }
}

// Global accessor
window.MDAgroFirebase = {
  config: firebaseConfig,
  checkBackendFirebaseStatus,
  async syncToFirestore() {
    try {
      const res = await fetch(`${_FB_API_BASE}/firebase/sync`, { method: 'POST' });
      return await res.json();
    } catch (err) {
      return { success: false, error: err.message };
    }
  },
  async submitFeedbackToFirestore(feedbackData) {
    try {
      const token = localStorage.getItem('md_farmer_token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = 'Bearer ' + token;
      const res = await fetch(`${_FB_API_BASE}/firebase/feedback`, {
        method: 'POST',
        headers,
        body: JSON.stringify(feedbackData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
