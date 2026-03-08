/* MarineIQ — User Profile: Firebase Auth + localStorage fallback
   Deps: config.js, firebase-config.js, firebase-backend.js */

/* ══════════════════════════════════════════════════════════
   1. PROFILE STORAGE (localStorage — always works)
   ══════════════════════════════════════════════════════════ */
const MIQ_PROFILE_KEY = 'miq_user_profile';

function getUserProfile() {
  try {
    var raw = localStorage.getItem(MIQ_PROFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function saveUserProfile(profile) {
  profile.updatedAt = Date.now();
  localStorage.setItem(MIQ_PROFILE_KEY, JSON.stringify(profile));
  return profile;
}

/* ══════════════════════════════════════════════════════════
   2. WELCOME MODAL — Google Sign-In + manual fallback
   ══════════════════════════════════════════════════════════ */
function showWelcomeModal() {
  // Don't show if profile already exists or Firebase user is signed in
  if (getUserProfile()) return;
  if (typeof fbGetUser === 'function' && fbGetUser()) return;

  var overlay = document.createElement('div');
  overlay.id = 'welcomeModal';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:800;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);';

  var hasFirebase = typeof isFirebaseConfigured === 'function' && isFirebaseConfigured();

  overlay.innerHTML =
    '<div style="background:var(--bg1);border:1px solid var(--b1);border-radius:14px;padding:24px;max-width:380px;width:90%;box-shadow:0 16px 48px rgba(0,0,0,0.5);">' +
      '<div style="text-align:center;margin-bottom:16px;">' +
        '<div style="font-size:2rem;">⚓</div>' +
        '<h2 style="font-family:JetBrains Mono,monospace;font-size:1rem;color:var(--tx);margin:8px 0 4px;">Welcome to Marine IQ</h2>' +
        '<p style="font-size:0.72rem;color:var(--tx3);line-height:1.4;">India\'s smartest marine engineering study platform.<br>Sign in to sync your progress across devices.</p>' +
      '</div>' +

      // Google Sign-In button (only if Firebase configured)
      (hasFirebase ?
      '<button id="wpGoogleBtn" style="\
        width:100%;padding:12px;border-radius:10px;\
        border:1px solid var(--b1);background:var(--bg2);\
        color:var(--tx);font-size:0.78rem;cursor:pointer;\
        display:flex;align-items:center;justify-content:center;gap:8px;\
        font-family:JetBrains Mono,monospace;font-weight:600;\
        margin-bottom:12px;transition:all 0.12s;\
      "><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" height="18" alt="G" /> Sign in with Google</button>' +
      '<div style="text-align:center;font-size:0.6rem;color:var(--tx3);margin-bottom:12px;">— or continue without an account —</div>' : '') +

      '<div style="display:flex;flex-direction:column;gap:10px;">' +
        '<div>' +
          '<label style="font-family:JetBrains Mono,monospace;font-size:0.58rem;color:var(--tx3);letter-spacing:0.06em;text-transform:uppercase;display:block;margin-bottom:4px;">Your Name *</label>' +
          '<input id="wpName" type="text" placeholder="e.g. Satyam" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--b1);background:var(--bg2);color:var(--tx);font-size:0.82rem;box-sizing:border-box;outline:none;" />' +
        '</div>' +
        '<div>' +
          '<label style="font-family:JetBrains Mono,monospace;font-size:0.58rem;color:var(--tx3);letter-spacing:0.06em;text-transform:uppercase;display:block;margin-bottom:4px;">Email (optional)</label>' +
          '<input id="wpEmail" type="email" placeholder="your@email.com" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--b1);background:var(--bg2);color:var(--tx);font-size:0.82rem;box-sizing:border-box;outline:none;" />' +
        '</div>' +
        '<div>' +
          '<label style="font-family:JetBrains Mono,monospace;font-size:0.58rem;color:var(--tx3);letter-spacing:0.06em;text-transform:uppercase;display:block;margin-bottom:4px;">Current Level</label>' +
          '<select id="wpLevel" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--b1);background:var(--bg2);color:var(--tx);font-size:0.82rem;box-sizing:border-box;">' +
            '<option value="btech" selected>B.Tech Marine Engineering</option>' +
            '<option value="pre-sea">Pre-Sea Training (DNS/GME)</option>' +
            '<option value="cl4">MEO Class IV</option>' +
            '<option value="cl2">MEO Class II</option>' +
            '<option value="cl1">MEO Class I</option>' +
            '<option value="other">Other / Self-Study</option>' +
          '</select>' +
        '</div>' +
        '<button id="wpSubmit" style="padding:12px;border-radius:10px;border:none;background:linear-gradient(135deg,#d4a017,#b8860b);color:#0a0e17;font-family:JetBrains Mono,monospace;font-size:0.78rem;font-weight:700;cursor:pointer;margin-top:4px;transition:all 0.12s;">Start Learning →</button>' +
        '<button id="wpSkip" style="padding:8px;border:none;background:transparent;color:var(--tx3);font-size:0.65rem;cursor:pointer;">Skip for now</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);

  // Google Sign-In handler
  var googleBtn = document.getElementById('wpGoogleBtn');
  if (googleBtn) {
    googleBtn.addEventListener('click', async function() {
      googleBtn.textContent = 'Signing in…';
      googleBtn.disabled = true;
      try {
        var user = await fbLogin();
        if (user) {
          saveUserProfile({
            name: user.displayName || 'Student',
            email: user.email || '',
            photoURL: user.photoURL || '',
            level: 'cl4',
            createdAt: Date.now(),
            id: user.uid,
            authProvider: 'google'
          });
          closeWelcomeModal();
          updateProfileUI();
          return;
        }
      } catch(e) {}
      googleBtn.textContent = 'Sign-in failed — try manual entry below';
      googleBtn.disabled = false;
    });
  }

  // Manual submit
  document.getElementById('wpSubmit').addEventListener('click', function() {
    var name = (document.getElementById('wpName').value || '').trim();
    if (!name) {
      document.getElementById('wpName').style.borderColor = '#ef4444';
      return;
    }
    var profile = {
      name: name,
      email: (document.getElementById('wpEmail').value || '').trim(),
      level: document.getElementById('wpLevel').value,
      createdAt: Date.now(),
      id: 'u_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6),
      authProvider: 'manual'
    };
    saveUserProfile(profile);
    closeWelcomeModal();
    updateProfileUI();
  });

  document.getElementById('wpSkip').addEventListener('click', function() {
    saveUserProfile({ name: 'Student', level: 'cl4', createdAt: Date.now(), id: 'u_' + Date.now().toString(36), skipped: true });
    closeWelcomeModal();
  });
}

function closeWelcomeModal() {
  var el = document.getElementById('welcomeModal');
  if (el) { el.style.opacity = '0'; el.style.transition = 'opacity 0.2s'; setTimeout(function() { el.remove(); }, 200); }
}

/* ══════════════════════════════════════════════════════════
   3. PROFILE UI — show avatar in topbar (Google photo or initials)
   ══════════════════════════════════════════════════════════ */
function updateProfileUI() {
  // Check Firebase user first
  var fbUser = (typeof fbGetUser === 'function') ? fbGetUser() : null;
  var profile = getUserProfile();

  if (!fbUser && !profile) return;

  var topbar = document.querySelector('.topbar-actions');
  if (!topbar) return;

  // Remove old badge
  var oldBadge = topbar.querySelector('#profileBadge');
  if (oldBadge) oldBadge.remove();

  var badge = document.createElement('div');
  badge.id = 'profileBadge';
  badge.style.cssText = 'width:28px;height:28px;border-radius:50%;cursor:pointer;flex-shrink:0;overflow:hidden;display:flex;align-items:center;justify-content:center;';

  if (fbUser && fbUser.photoURL) {
    // Google profile photo
    badge.innerHTML = '<img src="' + fbUser.photoURL + '" width="28" height="28" style="border-radius:50%;" alt="" referrerpolicy="no-referrer" />';
    badge.title = fbUser.displayName + ' (' + fbUser.email + ')';
  } else if (profile && profile.skipped) {
    // Skipped profile badge (gray anonymous icon)
    badge.style.cssText += 'background:var(--bg3);color:var(--tx3);font-size:0.8rem;';
    badge.innerHTML = '👤';
    badge.title = 'Student (Offline) — Click to Sign In';
  } else if (profile) {
    // Initials badge
    var initials = (profile.name || 'Student').split(' ').map(function(w) { return w[0]; }).join('').toUpperCase().slice(0, 2);
    badge.style.cssText += 'background:linear-gradient(135deg,#d4a017,#b8860b);color:#0a0e17;font-size:0.55rem;font-weight:700;font-family:JetBrains Mono,monospace;';
    badge.textContent = initials;
    badge.title = profile.name + (profile.email ? ' (' + profile.email + ')' : '');
  }

  badge.addEventListener('click', showProfileMenu);
  topbar.appendChild(badge);
}

function showProfileMenu() {
  var fbUser = (typeof fbGetUser === 'function') ? fbGetUser() : null;
  var profile = getUserProfile();
  var name = fbUser ? fbUser.displayName : (profile ? profile.name : 'Unknown');
  var email = fbUser ? fbUser.email : (profile ? profile.email : '');
  var isAdmin = (typeof fbIsAdmin === 'function') ? fbIsAdmin() : false;

  // Remove existing
  var old = document.getElementById('profileMenu');
  if (old) { old.remove(); return; }

  var menu = document.createElement('div');
  menu.id = 'profileMenu';
  menu.style.cssText = 'position:fixed;top:56px;right:12px;z-index:500;background:var(--bg1);border:1px solid var(--b1);border-radius:12px;padding:14px;width:240px;box-shadow:0 8px 32px rgba(0,0,0,0.4);';
  menu.innerHTML =
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">' +
      (fbUser && fbUser.photoURL ? '<img src="' + fbUser.photoURL + '" width="32" height="32" style="border-radius:50%;" referrerpolicy="no-referrer" />' : '<div style="width:32px;height:32px;border-radius:50%;background:#d4a017;display:flex;align-items:center;justify-content:center;color:#0a0e17;font-weight:700;font-size:0.7rem;">👤</div>') +
      '<div>' +
        '<div style="font-size:0.78rem;color:var(--tx);font-weight:600;">' + esc(name) + '</div>' +
        (email ? '<div style="font-size:0.58rem;color:var(--tx3);">' + esc(email) + '</div>' : '') +
      '</div>' +
    '</div>' +
    (isAdmin ? '<div style="font-size:0.55rem;color:#ef4444;font-weight:600;margin-bottom:8px;padding:3px 8px;background:rgba(239,68,68,0.1);border-radius:6px;display:inline-block;">🔐 ADMIN</div>' : '') +
    '<div style="font-size:0.58rem;color:var(--tx3);margin-bottom:8px;">Level: ' + ((profile ? profile.level : '') || 'Not set') + '</div>' +
    (fbUser ? '<div style="font-size:0.55rem;color:#22c55e;margin-bottom:8px;">✓ Synced with Google</div>' : '<div style="font-size:0.55rem;color:var(--tx3);margin-bottom:8px;">⚠ Offline mode</div>') +
    '<div style="border-top:1px solid var(--b0);padding-top:8px;display:flex;flex-direction:column;gap:4px;">' +
      (isAdmin ? '<button onclick="if(typeof openAdminDashboard===\'function\')openAdminDashboard();document.getElementById(\'profileMenu\').remove();" style="padding:6px 10px;border-radius:6px;border:1px solid rgba(239,68,68,0.3);background:rgba(239,68,68,0.05);color:#ef4444;font-size:0.65rem;cursor:pointer;text-align:left;">🔐 Admin Dashboard</button>' : '') +
      (!fbUser && typeof fbLogin === 'function' && typeof isFirebaseConfigured === 'function' && isFirebaseConfigured() ?
        '<button onclick="fbLogin().then(function(){document.getElementById(\'profileMenu\').remove();updateProfileUI();})" style="padding:6px 10px;border-radius:6px;border:1px solid rgba(34,197,94,0.3);background:rgba(34,197,94,0.05);color:#22c55e;font-size:0.65rem;cursor:pointer;text-align:left;">🔗 Sign in with Google</button>' : '') +
      (fbUser ?
        '<button onclick="fbLogout();localStorage.removeItem(\'miq_user_profile\');document.getElementById(\'profileMenu\').remove();document.getElementById(\'profileBadge\')?.remove();showWelcomeModal();" style="padding:6px 10px;border-radius:6px;border:none;background:transparent;color:#ef4444;font-size:0.65rem;cursor:pointer;text-align:left;">🚪 Sign Out</button>' : 
        '<button onclick="localStorage.removeItem(\'miq_user_profile\');document.getElementById(\'profileMenu\').remove();document.getElementById(\'profileBadge\')?.remove();showWelcomeModal();" style="padding:6px 10px;border-radius:6px;border:1px solid rgba(239,68,68,0.3);background:rgba(239,68,68,0.05);color:#ef4444;font-size:0.65rem;cursor:pointer;text-align:left;">🚪 Clear Profile & Sign Out</button>') +
      '<button onclick="editProfile()" style="padding:6px 10px;border-radius:6px;border:1px solid var(--b1);background:var(--bg2);color:var(--tx);font-size:0.65rem;cursor:pointer;text-align:left;">✏️ Edit Profile</button>' +
      '<button onclick="document.getElementById(\'profileMenu\').remove()" style="padding:6px 10px;border-radius:6px;border:none;background:transparent;color:var(--tx3);font-size:0.65rem;cursor:pointer;text-align:left;">Close</button>' +
    '</div>';

  document.body.appendChild(menu);
  setTimeout(function() {
    document.addEventListener('click', function closeMenu(e) {
      if (!menu.contains(e.target) && e.target.id !== 'profileBadge') {
        menu.remove();
        document.removeEventListener('click', closeMenu);
      }
    });
  }, 100);
}

window.editProfile = function() {
  var old = document.getElementById('profileMenu');
  if (old) old.remove();
  localStorage.removeItem(MIQ_PROFILE_KEY);
  var badge = document.getElementById('profileBadge');
  if (badge) badge.remove();
  showWelcomeModal();
};

/* ══════════════════════════════════════════════════════════
   4. TRACK USER ACTIVITY (localStorage + Firebase)
   ══════════════════════════════════════════════════════════ */
function trackUserActivity(action, data) {
  try {
    var log = JSON.parse(localStorage.getItem('miq_user_activity') || '[]');
    log.push({ action: action, data: data, ts: Date.now(), user: (getUserProfile() || {}).id });
    if (log.length > 200) log = log.slice(-200);
    localStorage.setItem('miq_user_activity', JSON.stringify(log));
  } catch (e) {}
}

/* ══════════════════════════════════════════════════════════
   5. INIT — listen for Firebase auth changes too
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    // Listen for Firebase auth changes
    if (typeof fbOnAuthChange === 'function') {
      fbOnAuthChange(function(user) {
        if (user) {
          // Sync Firebase user to local profile
          saveUserProfile({
            name: user.displayName || 'Student',
            email: user.email || '',
            photoURL: user.photoURL || '',
            level: (getUserProfile() || {}).level || 'cl4',
            createdAt: Date.now(),
            id: user.uid,
            authProvider: 'google'
          });
        }
        updateProfileUI();
      });
    }

    showWelcomeModal();
    updateProfileUI();
  }, 1500);
});

console.log('%cMarineIQ — User Profile: active (Firebase + offline)', 'color:#a78bfa;font-weight:bold');
