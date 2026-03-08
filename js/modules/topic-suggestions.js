/* MarineIQ — Community Topic Suggestions + Debug Panel
   Deps: config.js */

/* ══════════════════════════════════════════════════════════
   1. STORAGE
   ══════════════════════════════════════════════════════════ */
const SUGGEST_KEY = 'miq_suggestions';

function getSuggestions() {
  try { return JSON.parse(localStorage.getItem(SUGGEST_KEY) || '[]'); }
  catch(e) { return []; }
}

function saveSuggestions(arr) {
  try { localStorage.setItem(SUGGEST_KEY, JSON.stringify(arr)); }
  catch(e) {}
}

/* ══════════════════════════════════════════════════════════
   2. SUGGEST BUTTON — injected into sidebar
   ══════════════════════════════════════════════════════════ */
(function addSuggestButton() {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      var sidebar = document.getElementById('sidebar');
      if (!sidebar) return;
      // Avoid duplicate
      if (sidebar.querySelector('#suggestTopicBtn')) return;

      var wrap = document.createElement('div');
      wrap.style.cssText = 'padding:12px 16px;border-top:1px solid var(--b0);';
      wrap.innerHTML =
        '<button id="suggestTopicBtn" style="\
          width:100%;padding:10px 14px;border-radius:10px;\
          border:1px solid rgba(212,160,23,0.3);\
          background:rgba(212,160,23,0.06);\
          color:#d4a017;cursor:pointer;\
          font-family:JetBrains Mono,monospace;font-size:0.68rem;\
          font-weight:600;letter-spacing:0.04em;\
          display:flex;align-items:center;gap:8px;justify-content:center;\
          transition:all 0.12s;\
        ">💡 Suggest a Topic</button>';

      wrap.querySelector('#suggestTopicBtn').addEventListener('click', openSuggestModal);
      sidebar.appendChild(wrap);
    }, 500);
  });
})();

/* ══════════════════════════════════════════════════════════
   3. SUGGEST MODAL
   ══════════════════════════════════════════════════════════ */
function openSuggestModal() {
  // Remove existing
  var old = document.getElementById('suggestModal');
  if (old) old.remove();

  var overlay = document.createElement('div');
  overlay.id = 'suggestModal';
  overlay.className = 'sug-overlay';
  overlay.innerHTML =
    '<div class="sug-modal">' +
      '<div class="sug-header">' +
        '<span>💡 Suggest a Topic</span>' +
        '<button class="sug-close" onclick="document.getElementById(\'suggestModal\').remove()">✕</button>' +
      '</div>' +
      '<div class="sug-body">' +
        '<label class="sug-label">Topic Name</label>' +
        '<input type="text" id="sugTopicInput" class="sug-input" placeholder="e.g. Stern Tube Seal, Exhaust Gas Economiser..." maxlength="100" />' +
        '<label class="sug-label">Category</label>' +
        '<select id="sugCatSelect" class="sug-input">' +
          '<option value="diesel">Marine Diesel Engines</option>' +
          '<option value="aux">Auxiliary Machinery</option>' +
          '<option value="electrical">Marine Electrical</option>' +
          '<option value="naval">Naval Architecture / Stability</option>' +
          '<option value="safety">Safety & Regulations</option>' +
          '<option value="thermo">Thermodynamics / Fluids</option>' +
          '<option value="env">Environment / Green Shipping</option>' +
          '<option value="other">Other</option>' +
        '</select>' +
        '<button class="sug-submit" onclick="submitSuggestion()">Submit Suggestion</button>' +
        '<div id="sugStatus" class="sug-status"></div>' +
      '</div>' +
      '<div class="sug-existing" id="sugExisting"></div>' +
    '</div>';

  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);

  // Show existing suggestions
  renderSuggestionList();
  setTimeout(function() { document.getElementById('sugTopicInput')?.focus(); }, 200);
}

function submitSuggestion() {
  var inp = document.getElementById('sugTopicInput');
  var cat = document.getElementById('sugCatSelect');
  var status = document.getElementById('sugStatus');
  if (!inp || !cat) return;

  var topic = inp.value.trim();
  if (!topic) { status.textContent = '⚠ Please enter a topic name'; return; }
  if (topic.length < 3) { status.textContent = '⚠ Too short — be more specific'; return; }

  var suggestions = getSuggestions();

  // Check for duplicate
  var exists = suggestions.find(function(s) { return s.topic.toLowerCase() === topic.toLowerCase(); });
  if (exists) {
    exists.votes = (exists.votes || 1) + 1;
    status.textContent = '👍 Upvoted! Now has ' + exists.votes + ' votes';
  } else {
    suggestions.push({
      topic: topic,
      category: cat.value,
      votes: 1,
      date: new Date().toISOString().split('T')[0]
    });
    status.textContent = '✅ Suggestion added! Thank you';
  }

  saveSuggestions(suggestions);
  inp.value = '';
  renderSuggestionList();
}

function renderSuggestionList() {
  var el = document.getElementById('sugExisting');
  if (!el) return;
  var suggestions = getSuggestions();
  if (!suggestions.length) {
    el.innerHTML = '<div class="sug-empty">No suggestions yet. Be the first!</div>';
    return;
  }

  suggestions.sort(function(a, b) { return (b.votes || 1) - (a.votes || 1); });
  var top5 = suggestions.slice(0, 5);

  el.innerHTML =
    '<div class="sug-list-title">Top Requested Topics</div>' +
    top5.map(function(s) {
      return '<div class="sug-item">' +
        '<span class="sug-item-votes">' + (s.votes || 1) + '×</span>' +
        '<span class="sug-item-topic">' + (typeof esc === 'function' ? esc(s.topic) : s.topic) + '</span>' +
        '<span class="sug-item-cat">' + s.category + '</span>' +
      '</div>';
    }).join('');
}

/* ══════════════════════════════════════════════════════════
   4. DEBUG PANEL — activated by typing "marine-debug"
   ══════════════════════════════════════════════════════════ */
(function initDebugPanel() {
  var buffer = '';
  document.addEventListener('keydown', function(e) {
    buffer += e.key.toLowerCase();
    if (buffer.length > 20) buffer = buffer.slice(-20);
    if (buffer.includes('marine-debug')) {
      buffer = '';
      openDebugPanel();
    }
  });
})();

function openDebugPanel() {
  var old = document.getElementById('debugPanel');
  if (old) { old.remove(); return; }

  var suggestions = getSuggestions();
  suggestions.sort(function(a, b) { return (b.votes || 1) - (a.votes || 1); });

  // Count by category
  var cats = {};
  suggestions.forEach(function(s) {
    cats[s.category] = (cats[s.category] || 0) + 1;
  });

  // Count dynamic topic cache entries
  var dynCount = 0;
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).startsWith('miq_dyntopic_')) dynCount++;
  }

  var overlay = document.createElement('div');
  overlay.id = 'debugPanel';
  overlay.className = 'dbg-overlay';
  overlay.innerHTML =
    '<div class="dbg-panel">' +
      '<div class="dbg-header">' +
        '<span>🔧 MarineIQ Debug Panel</span>' +
        '<button class="sug-close" onclick="document.getElementById(\'debugPanel\').remove()">✕</button>' +
      '</div>' +
      '<div class="dbg-body">' +
        '<div class="dbg-stat">' +
          '<span class="dbg-stat-n">' + suggestions.length + '</span>' +
          '<span class="dbg-stat-l">Topic Suggestions</span>' +
        '</div>' +
        '<div class="dbg-stat">' +
          '<span class="dbg-stat-n">' + dynCount + '</span>' +
          '<span class="dbg-stat-l">AI-Cached Topics</span>' +
        '</div>' +
        '<div class="dbg-stat">' +
          '<span class="dbg-stat-n">' + Object.keys(cats).length + '</span>' +
          '<span class="dbg-stat-l">Categories</span>' +
        '</div>' +
        '<div class="dbg-section">Category Breakdown</div>' +
        Object.entries(cats).map(function(e) {
          return '<div class="dbg-cat-row"><span>' + e[0] + '</span><span>' + e[1] + '</span></div>';
        }).join('') +
        '<div class="dbg-section">All Suggestions (sorted by votes)</div>' +
        '<div class="dbg-list">' +
          (suggestions.length ? suggestions.map(function(s, i) {
            return '<div class="dbg-item">' +
              '<span class="dbg-item-n">' + (i+1) + '.</span>' +
              '<span class="dbg-item-topic">' + (typeof esc === 'function' ? esc(s.topic) : s.topic) + '</span>' +
              '<span class="dbg-item-votes">' + (s.votes||1) + '×</span>' +
              '<span class="dbg-item-cat">' + s.category + '</span>' +
              '<span class="dbg-item-date">' + (s.date || '') + '</span>' +
            '</div>';
          }).join('') : '<div class="sug-empty">No suggestions</div>') +
        '</div>' +
        '<div style="display:flex;gap:8px;margin-top:12px;">' +
          '<button class="dyn-gen-btn" onclick="copyDebugJSON()">📋 Copy as JSON</button>' +
          '<button class="dyn-gen-btn" style="border-color:rgba(239,68,68,0.4);color:#ef4444;" onclick="clearAllSuggestions()">🗑 Clear All</button>' +
          '<button class="dyn-gen-btn" style="border-color:rgba(96,165,250,0.4);color:#60a5fa;" onclick="clearDynCache()">🧹 Clear AI Cache</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function copyDebugJSON() {
  var suggestions = getSuggestions();
  var json = JSON.stringify(suggestions, null, 2);
  navigator.clipboard?.writeText(json).then(function() {
    alert('Copied ' + suggestions.length + ' suggestions to clipboard');
  });
}

function clearAllSuggestions() {
  if (!confirm('Clear all ' + getSuggestions().length + ' suggestions?')) return;
  localStorage.removeItem(SUGGEST_KEY);
  document.getElementById('debugPanel')?.remove();
  openDebugPanel();
}

function clearDynCache() {
  var keys = [];
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).startsWith('miq_dyntopic_')) keys.push(localStorage.key(i));
  }
  if (!confirm('Clear ' + keys.length + ' cached AI topics?')) return;
  keys.forEach(function(k) { localStorage.removeItem(k); });
  document.getElementById('debugPanel')?.remove();
  openDebugPanel();
}

/* ══════════════════════════════════════════════════════════
   5. CSS — suggest modal + debug panel
   ══════════════════════════════════════════════════════════ */
(function injectSugCSS() {
  var s = document.createElement('style');
  s.id = 'sug-css';
  s.textContent = '\
/* ── Suggest overlay ── */\
.sug-overlay, .dbg-overlay {\
  position:fixed;inset:0;z-index:550;\
  background:rgba(0,0,0,0.88);\
  display:flex;align-items:center;justify-content:center;\
  padding:16px;\
}\
.sug-modal {\
  max-width:420px;width:100%;\
  background:var(--bg1);border-radius:16px;\
  border:1px solid var(--b1);overflow:hidden;\
}\
.sug-header, .dbg-header {\
  display:flex;justify-content:space-between;align-items:center;\
  padding:12px 16px;\
  background:linear-gradient(135deg,#0d2038,#091629);\
  border-bottom:1px solid var(--b0);\
  font-family:"JetBrains Mono",monospace;font-size:0.75rem;\
  color:var(--tx);font-weight:600;\
}\
.sug-close {\
  background:none;border:none;color:var(--tx3);\
  cursor:pointer;font-size:1.1rem;\
}\
.sug-body, .dbg-body { padding:16px; }\
.sug-label {\
  font-family:"JetBrains Mono",monospace;font-size:0.62rem;\
  color:var(--tx3);text-transform:uppercase;letter-spacing:0.06em;\
  display:block;margin-bottom:6px;margin-top:12px;\
}\
.sug-label:first-child { margin-top:0; }\
.sug-input {\
  width:100%;padding:10px 12px;border-radius:8px;\
  border:1px solid var(--b1);background:var(--bg2);\
  color:var(--tx);font-size:0.82rem;\
  font-family:"JetBrains Mono",monospace;\
}\
.sug-input:focus { border-color:var(--ac);outline:none; }\
.sug-submit {\
  width:100%;padding:12px;border-radius:10px;margin-top:16px;\
  border:none;background:linear-gradient(135deg,#d4a017,#a07810);\
  color:#020810;cursor:pointer;\
  font-family:"JetBrains Mono",monospace;font-size:0.75rem;\
  font-weight:700;letter-spacing:0.04em;\
  transition:all 0.12s;\
}\
.sug-submit:hover { transform:translateY(-1px);box-shadow:0 4px 12px rgba(212,160,23,0.3); }\
.sug-status {\
  text-align:center;font-size:0.72rem;color:var(--tx2);\
  margin-top:8px;min-height:20px;\
}\
.sug-existing {\
  padding:12px 16px;border-top:1px solid var(--b0);\
  max-height:200px;overflow-y:auto;\
}\
.sug-list-title {\
  font-family:"JetBrains Mono",monospace;font-size:0.58rem;\
  color:var(--tx3);text-transform:uppercase;letter-spacing:0.08em;\
  margin-bottom:8px;\
}\
.sug-item {\
  display:flex;align-items:center;gap:8px;\
  padding:6px 0;border-bottom:1px solid var(--b0);\
  font-size:0.72rem;\
}\
.sug-item:last-child { border-bottom:none; }\
.sug-item-votes {\
  font-family:"JetBrains Mono",monospace;\
  color:#d4a017;font-weight:700;min-width:28px;\
}\
.sug-item-topic { flex:1;color:var(--tx); }\
.sug-item-cat {\
  font-size:0.55rem;color:var(--tx3);\
  background:var(--bg3);padding:2px 6px;border-radius:4px;\
}\
.sug-empty {\
  text-align:center;color:var(--tx3);font-size:0.72rem;padding:12px;\
}\
/* ── Debug panel ── */\
.dbg-panel {\
  max-width:520px;width:100%;\
  background:var(--bg1);border-radius:16px;\
  border:1px solid var(--b1);overflow:hidden;\
  max-height:85vh;overflow-y:auto;\
}\
.dbg-stat {\
  display:inline-flex;flex-direction:column;align-items:center;\
  padding:8px 16px;margin:4px;\
  background:var(--bg2);border-radius:8px;\
  border:1px solid var(--b0);\
}\
.dbg-stat-n {\
  font-family:"JetBrains Mono",monospace;\
  font-size:1.2rem;font-weight:700;color:var(--ac);\
}\
.dbg-stat-l { font-size:0.55rem;color:var(--tx3);text-transform:uppercase; }\
.dbg-section {\
  font-family:"JetBrains Mono",monospace;font-size:0.6rem;\
  color:var(--tx3);text-transform:uppercase;letter-spacing:0.08em;\
  margin-top:16px;margin-bottom:8px;\
  padding-bottom:4px;border-bottom:1px solid var(--b0);\
}\
.dbg-cat-row {\
  display:flex;justify-content:space-between;\
  font-size:0.72rem;color:var(--tx2);padding:3px 0;\
}\
.dbg-list { max-height:250px;overflow-y:auto; }\
.dbg-item {\
  display:flex;align-items:center;gap:6px;\
  font-size:0.68rem;padding:4px 0;\
  border-bottom:1px solid var(--b0);\
}\
.dbg-item-n { color:var(--tx3);min-width:20px; }\
.dbg-item-topic { flex:1;color:var(--tx); }\
.dbg-item-votes { color:#d4a017;font-weight:600; }\
.dbg-item-cat { font-size:0.5rem;color:var(--tx3);background:var(--bg3);padding:1px 5px;border-radius:3px; }\
.dbg-item-date { font-size:0.5rem;color:var(--tx3); }\
  ';
  document.head.appendChild(s);
})();

console.log('%cMarineIQ — Topic Suggestions: active (debug: type "marine-debug")', 'color:#a78bfa;font-weight:bold');
