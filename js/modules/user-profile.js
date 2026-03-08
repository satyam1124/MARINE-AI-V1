/* MarineIQ — User Profile: lightweight local profile for tracking
   Deps: config.js */

/* ══════════════════════════════════════════════════════════
   1. PROFILE STORAGE
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
   2. WELCOME MODAL — first visit
   ══════════════════════════════════════════════════════════ */
function showWelcomeModal() {
  // Don't show if profile exists
  if (getUserProfile()) return;

  var overlay = document.createElement('div');
  overlay.id = 'welcomeModal';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:800;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);';

  overlay.innerHTML =
    '<div style="background:var(--bg1);border:1px solid var(--b1);border-radius:14px;padding:24px;max-width:380px;width:90%;box-shadow:0 16px 48px rgba(0,0,0,0.5);">' +
      '<div style="text-align:center;margin-bottom:16px;">' +
        '<div style="font-size:2rem;">⚓</div>' +
        '<h2 style="font-family:JetBrains Mono,monospace;font-size:1rem;color:var(--tx);margin:8px 0 4px;">Welcome to Marine IQ</h2>' +
        '<p style="font-size:0.72rem;color:var(--tx3);line-height:1.4;">India\'s smartest marine engineering study platform.<br>Tell us a bit about yourself to personalize your experience.</p>' +
      '</div>' +
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
            '<option value="pre-sea">Pre-Sea Training (DNS/GME)</option>' +
            '<option value="cl4" selected>MEO Class IV</option>' +
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
      id: 'u_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6)
    };
    saveUserProfile(profile);
    closeWelcomeModal();
    updateProfileUI();
  });

  document.getElementById('wpSkip').addEventListener('click', function() {
    // Save minimal profile
    saveUserProfile({ name: 'Student', level: 'cl4', createdAt: Date.now(), id: 'u_' + Date.now().toString(36), skipped: true });
    closeWelcomeModal();
  });
}

function closeWelcomeModal() {
  var el = document.getElementById('welcomeModal');
  if (el) { el.style.opacity = '0'; el.style.transition = 'opacity 0.2s'; setTimeout(function() { el.remove(); }, 200); }
}

/* ══════════════════════════════════════════════════════════
   3. PROFILE UI — show name in topbar
   ══════════════════════════════════════════════════════════ */
function updateProfileUI() {
  var profile = getUserProfile();
  if (!profile || profile.skipped) return;

  var topbar = document.querySelector('.topbar-actions');
  if (!topbar || topbar.querySelector('#profileBadge')) return;

  var initials = profile.name.split(' ').map(function(w) { return w[0]; }).join('').toUpperCase().slice(0, 2);

  var badge = document.createElement('div');
  badge.id = 'profileBadge';
  badge.title = profile.name + (profile.email ? ' (' + profile.email + ')' : '');
  badge.style.cssText = 'width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#d4a017,#b8860b);color:#0a0e17;display:flex;align-items:center;justify-content:center;font-size:0.55rem;font-weight:700;font-family:JetBrains Mono,monospace;cursor:pointer;flex-shrink:0;';
  badge.textContent = initials;
  badge.addEventListener('click', showProfileMenu);
  topbar.appendChild(badge);
}

function showProfileMenu() {
  var profile = getUserProfile();
  if (!profile) return;

  // Remove existing
  var old = document.getElementById('profileMenu');
  if (old) { old.remove(); return; }

  var menu = document.createElement('div');
  menu.id = 'profileMenu';
  menu.style.cssText = 'position:fixed;top:56px;right:12px;z-index:500;background:var(--bg1);border:1px solid var(--b1);border-radius:12px;padding:14px;width:220px;box-shadow:0 8px 32px rgba(0,0,0,0.4);';
  menu.innerHTML =
    '<div style="font-size:0.78rem;color:var(--tx);font-weight:600;margin-bottom:2px;">👤 ' + esc(profile.name) + '</div>' +
    (profile.email ? '<div style="font-size:0.62rem;color:var(--tx3);margin-bottom:8px;">' + esc(profile.email) + '</div>' : '<div style="margin-bottom:8px;"></div>') +
    '<div style="font-size:0.58rem;color:var(--tx3);margin-bottom:8px;">Level: ' + (profile.level || 'Not set') + '</div>' +
    '<div style="border-top:1px solid var(--b0);padding-top:8px;display:flex;flex-direction:column;gap:4px;">' +
      '<button onclick="editProfile()" style="padding:6px 10px;border-radius:6px;border:1px solid var(--b1);background:var(--bg2);color:var(--tx);font-size:0.65rem;cursor:pointer;text-align:left;">✏️ Edit Profile</button>' +
      '<button onclick="document.getElementById(\'profileMenu\').remove()" style="padding:6px 10px;border-radius:6px;border:none;background:transparent;color:var(--tx3);font-size:0.65rem;cursor:pointer;text-align:left;">Close</button>' +
    '</div>';

  document.body.appendChild(menu);
  // Close on outside click
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
  // Reset and re-show welcome modal with existing data
  localStorage.removeItem(MIQ_PROFILE_KEY);
  var badge = document.getElementById('profileBadge');
  if (badge) badge.remove();
  showWelcomeModal();
};

/* ══════════════════════════════════════════════════════════
   4. TRACK USER ACTIVITY
   ══════════════════════════════════════════════════════════ */
function trackUserActivity(action, data) {
  try {
    var log = JSON.parse(localStorage.getItem('miq_user_activity') || '[]');
    log.push({ action: action, data: data, ts: Date.now(), user: (getUserProfile() || {}).id });
    // Keep last 200 entries
    if (log.length > 200) log = log.slice(-200);
    localStorage.setItem('miq_user_activity', JSON.stringify(log));
  } catch (e) {}
}

/* ══════════════════════════════════════════════════════════
   5. INIT
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    showWelcomeModal();
    updateProfileUI();
  }, 1500); // Delay to let main UI render first
});

console.log('%cMarineIQ — User Profile: active', 'color:#a78bfa;font-weight:bold');
