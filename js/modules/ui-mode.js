/* MarineIQ — UI Mode Toggle: Simple vs Full interface
   Deps: config.js */

/* ══════════════════════════════════════════════════════════
   1. MODE STORAGE
   ══════════════════════════════════════════════════════════ */
const UI_MODE_KEY = 'miq_ui_mode';

function getUIMode() {
  return localStorage.getItem(UI_MODE_KEY) || 'full';
}

function setUIMode(mode) {
  localStorage.setItem(UI_MODE_KEY, mode);
  applyUIMode(mode);
}

/* ══════════════════════════════════════════════════════════
   2. APPLY MODE — hide/show elements
   ══════════════════════════════════════════════════════════ */
function applyUIMode(mode) {
  var isSimple = mode === 'simple';
  document.body.classList.toggle('miq-simple-mode', isSimple);

  // Update toggle button state
  var toggle = document.getElementById('uiModeToggle');
  if (toggle) {
    toggle.textContent = isSimple ? '🎯 Simple' : '🔧 Full';
    toggle.title = isSimple ? 'Switch to full interface' : 'Switch to simple interface';
  }
}

/* ══════════════════════════════════════════════════════════
   3. TOGGLE BUTTON — inject into settings area
   ══════════════════════════════════════════════════════════ */
(function initUIMode() {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      // Add toggle to the topbar
      var topbar = document.querySelector('.topbar-actions');
      if (!topbar || topbar.querySelector('#uiModeToggle')) return;

      var btn = document.createElement('button');
      btn.id = 'uiModeToggle';
      btn.className = 'tbtn';
      btn.style.cssText = 'font-size:0.55rem;padding:4px 8px;white-space:nowrap;';
      btn.addEventListener('click', function() {
        var current = getUIMode();
        setUIMode(current === 'full' ? 'simple' : 'full');
      });

      // Insert before settings gear
      var settingsBtn = topbar.querySelector('[title="Settings"]') || topbar.lastElementChild;
      if (settingsBtn) {
        topbar.insertBefore(btn, settingsBtn);
      } else {
        topbar.appendChild(btn);
      }

      // Apply stored mode
      applyUIMode(getUIMode());
    }, 600);
  });
})();

/* ══════════════════════════════════════════════════════════
   4. CSS — Simple mode hides non-essential elements
   ══════════════════════════════════════════════════════════ */
(function injectUIModeCss() {
  var s = document.createElement('style');
  s.id = 'ui-mode-css';
  s.textContent = '\
/* ── Simple Mode: cleaner, less overwhelming ── */\
body.miq-simple-mode .mm-tab[data-panel="diagrams"] { display: none !important; }\
body.miq-simple-mode .ai-diag-generator { display: none !important; }\
body.miq-simple-mode .dyn-gen-prompt { display: none !important; }\
body.miq-simple-mode #suggestTopicWrap { display: none !important; }\
body.miq-simple-mode #homeSuggestBtn { display: none !important; }\
body.miq-simple-mode .streak-badge { display: none !important; }\
body.miq-simple-mode .mode-toggle { display: none !important; }\
body.miq-simple-mode .year-grid { display: none !important; }\
body.miq-simple-mode .home-tabs { display: none !important; }\
body.miq-simple-mode .info-strip { display: none !important; }\
body.miq-simple-mode .stats-row { display: none !important; }\
body.miq-simple-mode .tz-intro-hint { display: none !important; }\
/* Simplify tabs — keep only core study tabs */\
body.miq-simple-mode .mm-tab[data-panel="quiz"] { display: none !important; }\
/* Clean up topbar */\
body.miq-simple-mode .tbtn:not(#uiModeToggle):not(#globalSearchBtn):not([title="Settings"]) { display: none !important; }\
/* Keep sidebar clean */\
body.miq-simple-mode .sidebar-topic .topic-meta { display: none !important; }\
/* Show simple mode indicator */\
body.miq-simple-mode::after {\
  content: "SIMPLE MODE";\
  position: fixed; bottom: 8px; left: 50%; transform: translateX(-50%);\
  font-family: "JetBrains Mono", monospace; font-size: 0.5rem;\
  color: var(--tx3); opacity: 0.4; letter-spacing: 0.1em;\
  pointer-events: none; z-index: 10;\
}\
/* UI Mode toggle button */\
#uiModeToggle {\
  border: 1px solid var(--b1) !important; border-radius: 6px !important;\
  background: var(--bg2) !important; color: var(--tx) !important;\
  min-height: 28px !important;\
}\
  ';
  document.head.appendChild(s);
})();

console.log('%cMarineIQ — UI Mode: ' + (getUIMode() === 'simple' ? 'Simple' : 'Full'), 'color:#60a5fa;font-weight:bold');
