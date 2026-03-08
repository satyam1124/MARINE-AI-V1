/* MarineIQ — Firebase Configuration
   Replace the placeholder values below with YOUR Firebase project config.
   Get these from: Firebase Console → Project Settings → General → Your Apps → Config */

/* ══════════════════════════════════════════════════════════
   1. FIREBASE CONFIG — FILL IN YOUR VALUES
   ══════════════════════════════════════════════════════════ */
const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

/* Admin email — this Google account gets admin privileges */
const ADMIN_EMAIL = 'satyam1124tech@gmail.com'; // Change to your email

/* ══════════════════════════════════════════════════════════
   2. FIREBASE AVAILABILITY CHECK
   ══════════════════════════════════════════════════════════ */
var FB_READY = false;
var FB_APP = null;
var FB_AUTH = null;
var FB_DB = null;
var FB_STORAGE = null;

function isFirebaseConfigured() {
  return FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.apiKey !== 'YOUR_API_KEY';
}

/* ══════════════════════════════════════════════════════════
   3. INITIALIZE FIREBASE
   ══════════════════════════════════════════════════════════ */
function initFirebase() {
  if (!isFirebaseConfigured()) {
    console.log('%cMarineIQ — Firebase: not configured (using offline mode)', 'color:#f59e0b;font-weight:bold');
    return false;
  }

  try {
    // Check if Firebase SDK is loaded
    if (typeof firebase === 'undefined') {
      console.warn('Firebase SDK not loaded');
      return false;
    }

    // Initialize app (avoid double init)
    if (!firebase.apps.length) {
      FB_APP = firebase.initializeApp(FIREBASE_CONFIG);
    } else {
      FB_APP = firebase.apps[0];
    }

    FB_AUTH = firebase.auth();
    FB_DB = firebase.firestore();
    FB_STORAGE = firebase.storage();
    FB_READY = true;

    // Enable offline persistence
    FB_DB.enablePersistence({ synchronizeTabs: true }).catch(function(e) {
      console.warn('Firestore persistence:', e.code);
    });

    console.log('%cMarineIQ — Firebase: initialized ✓', 'color:#22c55e;font-weight:bold');
    return true;
  } catch (e) {
    console.warn('Firebase init error:', e);
    return false;
  }
}

// Auto-init on load
document.addEventListener('DOMContentLoaded', function() {
  initFirebase();
});
