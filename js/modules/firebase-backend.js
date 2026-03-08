/* MarineIQ — Firebase Backend: Auth, Firestore CRUD, Storage
   Deps: firebase-config.js (FB_READY, FB_AUTH, FB_DB, FB_STORAGE, ADMIN_EMAIL)
   All functions gracefully fall back to localStorage when Firebase is unavailable */

/* ══════════════════════════════════════════════════════════
   1. AUTH — Google Sign-In
   ══════════════════════════════════════════════════════════ */
var _fbCurrentUser = null;
var _authListeners = [];

function fbOnAuthChange(callback) {
  _authListeners.push(callback);
}

function _notifyAuthListeners(user) {
  _authListeners.forEach(function(cb) { try { cb(user); } catch(e) {} });
}

async function fbLogin() {
  if (!FB_READY || !FB_AUTH) {
    console.warn('Firebase not configured — using offline profile');
    return null;
  }
  try {
    var provider = new firebase.auth.GoogleAuthProvider();
    var result = await FB_AUTH.signInWithPopup(provider);
    _fbCurrentUser = result.user;

    // Save/update user profile in Firestore
    await fbSaveUserProfile(_fbCurrentUser);
    _notifyAuthListeners(_fbCurrentUser);
    return _fbCurrentUser;
  } catch (e) {
    console.warn('Google sign-in failed:', e.message);
    return null;
  }
}

async function fbLogout() {
  if (FB_AUTH) {
    await FB_AUTH.signOut();
    _fbCurrentUser = null;
    _notifyAuthListeners(null);
  }
}

function fbGetUser() {
  return _fbCurrentUser;
}

function fbIsAdmin() {
  if (!_fbCurrentUser) return false;
  return _fbCurrentUser.email === ADMIN_EMAIL;
}

// Listen for auth state changes
function fbInitAuth() {
  if (!FB_READY || !FB_AUTH) return;
  FB_AUTH.onAuthStateChanged(function(user) {
    _fbCurrentUser = user;
    _notifyAuthListeners(user);
    if (user) {
      console.log('%cMarineIQ — Signed in: ' + user.displayName, 'color:#22c55e');
      fbSaveUserProfile(user);
    }
  });
}

/* ══════════════════════════════════════════════════════════
   2. USER PROFILES — Firestore
   ══════════════════════════════════════════════════════════ */
async function fbSaveUserProfile(user) {
  if (!FB_READY || !FB_DB || !user) return;
  try {
    await FB_DB.collection('users').doc(user.uid).set({
      name: user.displayName || 'Student',
      email: user.email || '',
      photoURL: user.photoURL || '',
      level: (typeof getUserProfile === 'function' && getUserProfile()) ? getUserProfile().level : 'cl4',
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      isAdmin: user.email === ADMIN_EMAIL
    }, { merge: true });
  } catch (e) { console.warn('Save user profile:', e); }
}

async function fbGetAllUsers() {
  if (!FB_READY || !FB_DB) return [];
  try {
    var snap = await FB_DB.collection('users').orderBy('lastSeen', 'desc').limit(50).get();
    return snap.docs.map(function(d) { return Object.assign({ id: d.id }, d.data()); });
  } catch(e) { return []; }
}

/* ══════════════════════════════════════════════════════════
   3. SUGGESTIONS — Firestore shared
   ══════════════════════════════════════════════════════════ */
async function fbAddSuggestion(suggestion) {
  if (!FB_READY || !FB_DB) {
    // Fallback to localStorage
    var arr = JSON.parse(localStorage.getItem('miq_suggestions') || '[]');
    arr.push(suggestion);
    localStorage.setItem('miq_suggestions', JSON.stringify(arr));
    return;
  }
  try {
    suggestion.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    suggestion.userId = _fbCurrentUser ? _fbCurrentUser.uid : 'anon';
    suggestion.userName = _fbCurrentUser ? _fbCurrentUser.displayName : 'Anonymous';
    suggestion.votes = 1;
    suggestion.voters = _fbCurrentUser ? [_fbCurrentUser.uid] : [];
    await FB_DB.collection('suggestions').add(suggestion);
  } catch(e) {
    console.warn('Add suggestion to Firestore failed:', e);
    var arr = JSON.parse(localStorage.getItem('miq_suggestions') || '[]');
    arr.push(suggestion);
    localStorage.setItem('miq_suggestions', JSON.stringify(arr));
  }
}

async function fbGetSuggestions() {
  if (!FB_READY || !FB_DB) {
    return JSON.parse(localStorage.getItem('miq_suggestions') || '[]');
  }
  try {
    var snap = await FB_DB.collection('suggestions').orderBy('votes', 'desc').limit(50).get();
    return snap.docs.map(function(d) { return Object.assign({ id: d.id }, d.data()); });
  } catch(e) {
    return JSON.parse(localStorage.getItem('miq_suggestions') || '[]');
  }
}

async function fbVoteSuggestion(suggestionId) {
  if (!FB_READY || !FB_DB || !_fbCurrentUser) return;
  try {
    var ref = FB_DB.collection('suggestions').doc(suggestionId);
    await ref.update({
      votes: firebase.firestore.FieldValue.increment(1),
      voters: firebase.firestore.FieldValue.arrayUnion(_fbCurrentUser.uid)
    });
  } catch(e) { console.warn('Vote failed:', e); }
}

async function fbDeleteSuggestion(suggestionId) {
  if (!FB_READY || !FB_DB) return;
  try { await FB_DB.collection('suggestions').doc(suggestionId).delete(); } catch(e) {}
}

/* ══════════════════════════════════════════════════════════
   4. AI CACHE — Firestore shared
   ══════════════════════════════════════════════════════════ */
async function fbGetCachedTopic(topicId) {
  if (!FB_READY || !FB_DB) return null;
  try {
    var doc = await FB_DB.collection('ai_cache').doc(topicId).get();
    if (doc.exists) return doc.data();
  } catch(e) {}
  return null;
}

async function fbSaveCachedTopic(topicId, data) {
  if (!FB_READY || !FB_DB) return;
  try {
    data.cachedAt = firebase.firestore.FieldValue.serverTimestamp();
    data.cachedBy = _fbCurrentUser ? _fbCurrentUser.displayName : 'System';
    await FB_DB.collection('ai_cache').doc(topicId).set(data);
  } catch(e) { console.warn('Save AI cache:', e); }
}

async function fbGetAllCachedTopics() {
  if (!FB_READY || !FB_DB) return [];
  try {
    var snap = await FB_DB.collection('ai_cache').orderBy('cachedAt', 'desc').limit(50).get();
    return snap.docs.map(function(d) { return Object.assign({ id: d.id }, d.data()); });
  } catch(e) { return []; }
}

async function fbDeleteCachedTopic(topicId) {
  if (!FB_READY || !FB_DB) return;
  try { await FB_DB.collection('ai_cache').doc(topicId).delete(); } catch(e) {}
}

/* ══════════════════════════════════════════════════════════
   5. PDF METADATA — Firestore
   ══════════════════════════════════════════════════════════ */
async function fbSavePdfMeta(docId, meta) {
  if (!FB_READY || !FB_DB) return;
  try {
    meta.uploadedAt = firebase.firestore.FieldValue.serverTimestamp();
    meta.uploadedBy = _fbCurrentUser ? _fbCurrentUser.displayName : 'Unknown';
    meta.uploaderUid = _fbCurrentUser ? _fbCurrentUser.uid : 'anon';
    meta.status = 'pending';
    await FB_DB.collection('pdf_meta').doc(docId).set(meta);
  } catch(e) { console.warn('Save PDF meta:', e); }
}

async function fbGetAllPdfMeta() {
  if (!FB_READY || !FB_DB) return [];
  try {
    var snap = await FB_DB.collection('pdf_meta').orderBy('uploadedAt', 'desc').limit(50).get();
    return snap.docs.map(function(d) { return Object.assign({ id: d.id }, d.data()); });
  } catch(e) { return []; }
}

async function fbApprovePdf(docId) {
  if (!FB_READY || !FB_DB) return;
  try {
    await FB_DB.collection('pdf_meta').doc(docId).update({ status: 'approved' });
  } catch(e) { console.warn('Approve PDF:', e); }
}

async function fbDeletePdfMeta(docId) {
  if (!FB_READY || !FB_DB) return;
  try { await FB_DB.collection('pdf_meta').doc(docId).delete(); } catch(e) {}
}

/* ══════════════════════════════════════════════════════════
   6. ACTIVITY TRACKING — Firestore
   ══════════════════════════════════════════════════════════ */
async function fbTrackActivity(action, data) {
  // Always save to localStorage
  if (typeof trackUserActivity === 'function') {
    trackUserActivity(action, data);
  }
  // Also save to Firestore
  if (!FB_READY || !FB_DB) return;
  try {
    await FB_DB.collection('activity').add({
      action: action,
      data: data || null,
      userId: _fbCurrentUser ? _fbCurrentUser.uid : 'anon',
      userName: _fbCurrentUser ? _fbCurrentUser.displayName : 'Anonymous',
      ts: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch(e) {}
}

async function fbGetActivity(limit) {
  if (!FB_READY || !FB_DB) {
    return JSON.parse(localStorage.getItem('miq_user_activity') || '[]');
  }
  try {
    var snap = await FB_DB.collection('activity').orderBy('ts', 'desc').limit(limit || 50).get();
    return snap.docs.map(function(d) { return Object.assign({ id: d.id }, d.data()); });
  } catch(e) {
    return JSON.parse(localStorage.getItem('miq_user_activity') || '[]');
  }
}

/* ══════════════════════════════════════════════════════════
   7. INIT
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    fbInitAuth();
  }, 500);
});

console.log('%cMarineIQ — Firebase Backend: loaded', 'color:#60a5fa;font-weight:bold');
