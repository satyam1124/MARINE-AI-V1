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
    '<div style="background:#0b1120;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px 36px;width:380px;box-shadow:0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05);font-family:\'Inter\',-apple-system,BlinkMacSystemFont,sans-serif;">' +
      
      // Header
      '<div style="text-align:center;margin-bottom:28px;">' +
        '<div style="width:48px;height:48px;background:linear-gradient(135deg,#d4a017,#b88b12);border-radius:12px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;box-shadow:0 8px 16px rgba(212,160,23,0.2);">⚓</div>' +
        '<h2 style="font-size:1.4rem;font-weight:700;color:#f8fafc;margin:0 0 6px;letter-spacing:-0.02em;">Welcome back</h2>' +
        '<p style="font-size:0.85rem;color:#94a3b8;margin:0;">Sign in to sync your progress automatically</p>' +
      '</div>' +

      // Google Sign-In button (only if Firebase configured)
      (hasFirebase ?
      '<button id="wpGoogleBtn" style="\
        width:100%;height:44px;border-radius:8px;\
        border:1px solid #334155;background:#1e293b;\
        color:#f8fafc;font-size:0.9rem;font-weight:500;cursor:pointer;\
        display:flex;align-items:center;justify-content:center;gap:10px;\
        transition:all 0.2s ease;\
      " onmouseover="this.style.background=\'#334155\'" onmouseout="this.style.background=\'#1e293b\'">\
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" height="20" alt="G" />\
        Continue with Google\
      </button>' +
      
      // OR Divider
      '<div style="display:flex;align-items:center;margin:24px 0;">' +
        '<div style="flex:1;height:1px;background:#334155;"></div>' +
        '<div style="padding:0 12px;color:#64748b;font-size:0.75rem;font-weight:500;text-transform:uppercase;letter-spacing:0.05em;">Or</div>' +
        '<div style="flex:1;height:1px;background:#334155;"></div>' +
      '</div>' : '') +

      // Manual Entry Form
      '<div style="display:flex;flex-direction:column;gap:14px;">' +
        '<div>' +
          '<label style="font-size:0.75rem;color:#cbd5e1;font-weight:500;display:block;margin-bottom:6px;">Full Name</label>' +
          '<input id="wpName" type="text" placeholder="John Doe" style="width:100%;height:42px;padding:0 14px;border-radius:8px;border:1px solid #334155;background:#0f172a;color:#f8fafc;font-size:0.9rem;box-sizing:border-box;outline:none;transition:border 0.2s;" onfocus="this.style.borderColor=\'#3b82f6\'" onblur="this.style.borderColor=\'#334155\'" />' +
        '</div>' +
        
        '<div>' +
          '<label style="font-size:0.75rem;color:#cbd5e1;font-weight:500;display:block;margin-bottom:6px;">Email address</label>' +
          '<input id="wpEmail" type="email" placeholder="john@example.com" style="width:100%;height:42px;padding:0 14px;border-radius:8px;border:1px solid #334155;background:#0f172a;color:#f8fafc;font-size:0.9rem;box-sizing:border-box;outline:none;transition:border 0.2s;" onfocus="this.style.borderColor=\'#3b82f6\'" onblur="this.style.borderColor=\'#334155\'" />' +
        '</div>' +
        
        '<div>' +
          '<label style="font-size:0.75rem;color:#cbd5e1;font-weight:500;display:block;margin-bottom:6px;">Current Level</label>' +
          '<select id="wpLevel" style="width:100%;height:42px;padding:0 14px;border-radius:8px;border:1px solid #334155;background:#0f172a;color:#cbd5e1;font-size:0.9rem;box-sizing:border-box;outline:none;appearance:none;transition:border 0.2s;" onfocus="this.style.borderColor=\'#3b82f6\'" onblur="this.style.borderColor=\'#334155\'">' +
            '<option value="btech" selected>B.Tech Marine Engineering</option>' +
            '<option value="pre-sea">Pre-Sea Training (DNS/GME)</option>' +
            '<option value="cl4">MEO Class IV</option>' +
            '<option value="cl2">MEO Class II</option>' +
            '<option value="cl1">MEO Class I</option>' +
            '<option value="other">Other / Self-Study</option>' +
          '</select>' +
        '</div>' +
      '</div>' +
      
      // Submit Button
      '<button id="wpSubmit" style="\
        width:100%;height:44px;border-radius:8px;margin-top:24px;\
        border:none;background:#2563eb;color:#ffffff;\
        font-size:0.95rem;font-weight:600;cursor:pointer;\
        transition:all 0.2s ease;\
      " onmouseover="this.style.background=\'#1d4ed8\'" onmouseout="this.style.background=\'#2563eb\'">Continue</button>' +

      // Skip Link
      '<div style="text-align:center;margin-top:20px;">' +
        '<button id="wpSkip" style="background:none;border:none;color:#94a3b8;font-size:0.8rem;cursor:pointer;text-decoration:none;" onmouseover="this.style.color=\'#cbd5e1\';this.style.textDecoration=\'underline\'" onmouseout="this.style.color=\'#94a3b8\';this.style.textDecoration=\'none\'">Skip for now</button>' +
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
        '<button onclick="fbLogout();localStorage.removeItem(\'miq_user_profile\');document.getElementById(\'profileMenu\').remove();document.getElementById(\'profileBadge\')?.remove();showWelcomeModal();" style="padding:6px 10px;border-radius:6px;border:none;background:transparent;color:#ef4444;font-size:0.65rem;cursor:pointer;text-align:left;">🚪 Sign Out</button>' : '') +
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
