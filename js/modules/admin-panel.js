/* MarineIQ — Admin Dashboard: password-protected management panel
   Deps: config.js, rag-engine.js, topic-suggestions.js, user-profile.js */

/* ══════════════════════════════════════════════════════════
   1. ADMIN CONFIG
   ══════════════════════════════════════════════════════════ */
const ADMIN_PASS_HASH = 'marineiq2026'; // simple password (change to hash later)
var _adminAuthed = false;

/* ══════════════════════════════════════════════════════════
   2. SECRET CODE ACTIVATION — type "marine-admin"
   ══════════════════════════════════════════════════════════ */
(function initAdminTrigger() {
  var buf = '';
  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    buf += e.key.toLowerCase();
    if (buf.length > 15) buf = buf.slice(-15);
    if (buf.includes('marine-admin')) {
      buf = '';
      if (_adminAuthed) {
        openAdminDashboard();
      } else {
        showAdminLogin();
      }
    }
  });
})();

/* ══════════════════════════════════════════════════════════
   3. ADMIN LOGIN
   ══════════════════════════════════════════════════════════ */
function showAdminLogin() {
  var overlay = document.createElement('div');
  overlay.id = 'adminLoginModal';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:900;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);';
  overlay.innerHTML =
    '<div style="background:var(--bg1);border:1px solid rgba(239,68,68,0.3);border-radius:14px;padding:24px;max-width:320px;width:90%;">' +
      '<div style="text-align:center;margin-bottom:16px;">' +
        '<div style="font-size:1.5rem;">🔐</div>' +
        '<h3 style="font-family:JetBrains Mono,monospace;font-size:0.82rem;color:var(--tx);margin:6px 0;">Admin Dashboard</h3>' +
        '<p style="font-size:0.62rem;color:var(--tx3);">Enter admin password to continue</p>' +
      '</div>' +
      '<input id="adminPassInput" type="password" placeholder="Password" style="width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--b1);background:var(--bg2);color:var(--tx);font-size:0.82rem;box-sizing:border-box;margin-bottom:10px;outline:none;" />' +
      '<div id="adminPassErr" style="font-size:0.62rem;color:#ef4444;margin-bottom:8px;display:none;">Incorrect password</div>' +
      '<div style="display:flex;gap:8px;">' +
        '<button id="adminPassCancel" style="flex:1;padding:10px;border-radius:8px;border:1px solid var(--b1);background:var(--bg2);color:var(--tx3);font-size:0.72rem;cursor:pointer;">Cancel</button>' +
        '<button id="adminPassSubmit" style="flex:1;padding:10px;border-radius:8px;border:none;background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;font-size:0.72rem;font-weight:600;cursor:pointer;">Login</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);
  setTimeout(function() { document.getElementById('adminPassInput').focus(); }, 100);

  document.getElementById('adminPassSubmit').addEventListener('click', function() {
    var pass = document.getElementById('adminPassInput').value;
    if (pass === ADMIN_PASS_HASH) {
      _adminAuthed = true;
      document.getElementById('adminLoginModal').remove();
      openAdminDashboard();
    } else {
      document.getElementById('adminPassErr').style.display = 'block';
      document.getElementById('adminPassInput').value = '';
    }
  });

  document.getElementById('adminPassInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') document.getElementById('adminPassSubmit').click();
  });

  document.getElementById('adminPassCancel').addEventListener('click', function() {
    document.getElementById('adminLoginModal').remove();
  });
}

/* ══════════════════════════════════════════════════════════
   4. ADMIN DASHBOARD — full management panel
   ══════════════════════════════════════════════════════════ */
function openAdminDashboard() {
  // Remove existing
  var old = document.getElementById('adminDash');
  if (old) { old.remove(); return; }

  var overlay = document.createElement('div');
  overlay.id = 'adminDash';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:850;background:rgba(0,0,0,0.85);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:20px;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);';

  // Gather stats
  var suggestions = JSON.parse(localStorage.getItem('miq_suggestions') || '[]');
  var dynCacheCount = 0;
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).startsWith('miq_dyntopic_')) dynCacheCount++;
  }
  var activity = JSON.parse(localStorage.getItem('miq_user_activity') || '[]');
  var profile = typeof getUserProfile === 'function' ? getUserProfile() : null;

  overlay.innerHTML =
    '<div style="background:var(--bg1);border:1px solid rgba(239,68,68,0.2);border-radius:14px;max-width:700px;width:100%;margin:20px auto;">' +
      // Header
      '<div style="display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid var(--b0);">' +
        '<div style="display:flex;align-items:center;gap:8px;">' +
          '<span style="font-size:1.2rem;">🔐</span>' +
          '<span style="font-family:JetBrains Mono,monospace;font-size:0.82rem;color:#ef4444;font-weight:700;">ADMIN DASHBOARD</span>' +
        '</div>' +
        '<button onclick="document.getElementById(\'adminDash\').remove()" style="width:32px;height:32px;border-radius:8px;border:1px solid var(--b1);background:var(--bg2);color:var(--tx3);cursor:pointer;font-size:0.9rem;">✕</button>' +
      '</div>' +

      // Tabs
      '<div id="adminTabs" style="display:flex;border-bottom:1px solid var(--b0);overflow-x:auto;">' +
        '<button class="adm-tab active" onclick="switchAdminTab(\'stats\',this)">📊 Stats</button>' +
        '<button class="adm-tab" onclick="switchAdminTab(\'pdfs\',this)">📄 PDFs</button>' +
        '<button class="adm-tab" onclick="switchAdminTab(\'suggestions\',this)">💡 Suggestions</button>' +
        '<button class="adm-tab" onclick="switchAdminTab(\'cache\',this)">⚡ AI Cache</button>' +
      '</div>' +

      // Panels
      '<div id="admPanel_stats" class="adm-panel" style="padding:16px 20px;">' +
        buildAdminStats(suggestions, dynCacheCount, activity) +
      '</div>' +
      '<div id="admPanel_pdfs" class="adm-panel" style="padding:16px 20px;display:none;">' +
        '<div id="admPdfList">Loading PDFs…</div>' +
      '</div>' +
      '<div id="admPanel_suggestions" class="adm-panel" style="padding:16px 20px;display:none;">' +
        buildAdminSuggestions(suggestions) +
      '</div>' +
      '<div id="admPanel_cache" class="adm-panel" style="padding:16px 20px;display:none;">' +
        buildAdminCache() +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });

  // Load PDFs asynchronously
  loadAdminPDFs();
}

/* ══════════════════════════════════════════════════════════
   5. ADMIN TAB SWITCHING
   ══════════════════════════════════════════════════════════ */
window.switchAdminTab = function(tab, btn) {
  document.querySelectorAll('.adm-tab').forEach(function(t) { t.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('.adm-panel').forEach(function(p) { p.style.display = 'none'; });
  var panel = document.getElementById('admPanel_' + tab);
  if (panel) panel.style.display = 'block';
};

/* ══════════════════════════════════════════════════════════
   6. STATS PANEL
   ══════════════════════════════════════════════════════════ */
function buildAdminStats(suggestions, dynCacheCount, activity) {
  var stats = typeof APP !== 'undefined' ? (APP.stats || {}) : {};
  var studied = typeof APP !== 'undefined' ? Object.keys(APP.studied || {}).length : 0;

  return '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:16px;">' +
    statCard('📖', studied, 'Topics Studied') +
    statCard('🤖', stats.aiAsked || 0, 'AI Queries') +
    statCard('🎯', stats.quizTaken || 0, 'Quizzes') +
    statCard('🃏', stats.fcFlipped || 0, 'Cards Flipped') +
    statCard('💡', suggestions.length, 'Suggestions') +
    statCard('⚡', dynCacheCount, 'AI-Cached Topics') +
  '</div>' +
  '<h4 style="font-family:JetBrains Mono,monospace;font-size:0.68rem;color:var(--tx3);margin:12px 0 8px;">Recent Activity (' + activity.length + ' entries)</h4>' +
  '<div style="max-height:200px;overflow-y:auto;font-size:0.62rem;color:var(--tx3);">' +
    (activity.length ? activity.slice(-20).reverse().map(function(a) {
      return '<div style="padding:4px 0;border-bottom:1px solid var(--b0);">' +
        '<span style="color:var(--ac);">' + a.action + '</span> · ' +
        new Date(a.ts).toLocaleString() +
        (a.data ? ' · <span style="color:var(--tx2);">' + (typeof a.data === 'string' ? a.data : JSON.stringify(a.data).slice(0,50)) + '</span>' : '') +
      '</div>';
    }).join('') : '<div style="color:var(--tx3);padding:10px;">No activity recorded yet</div>') +
  '</div>';
}

function statCard(icon, num, label) {
  return '<div style="background:var(--bg2);border:1px solid var(--b0);border-radius:10px;padding:12px;text-align:center;">' +
    '<div style="font-size:1.2rem;">' + icon + '</div>' +
    '<div style="font-size:1.1rem;font-weight:700;color:var(--tx);margin:2px 0;">' + num + '</div>' +
    '<div style="font-size:0.55rem;color:var(--tx3);text-transform:uppercase;letter-spacing:0.04em;">' + label + '</div>' +
  '</div>';
}

/* ══════════════════════════════════════════════════════════
   7. PDF MANAGEMENT
   ══════════════════════════════════════════════════════════ */
async function loadAdminPDFs() {
  var container = document.getElementById('admPdfList');
  if (!container) return;

  if (typeof ragLoadDocs !== 'function') {
    container.innerHTML = '<div style="color:var(--tx3);font-size:0.72rem;">RAG engine not available</div>';
    return;
  }

  try {
    var docs = await ragLoadDocs();
    if (!docs || docs.length === 0) {
      container.innerHTML =
        '<div style="text-align:center;padding:20px;color:var(--tx3);font-size:0.72rem;">' +
          '<div style="font-size:1.5rem;margin-bottom:8px;">📄</div>' +
          'No PDFs uploaded yet' +
        '</div>';
      return;
    }

    container.innerHTML = docs.map(function(doc) {
      var status = doc.status || 'approved';
      var statusBadge = status === 'pending'
        ? '<span style="background:rgba(245,158,11,0.15);color:#f59e0b;padding:2px 8px;border-radius:10px;font-size:0.55rem;">PENDING</span>'
        : '<span style="background:rgba(34,197,94,0.15);color:#22c55e;padding:2px 8px;border-radius:10px;font-size:0.55rem;">APPROVED</span>';

      return '<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--b0);">' +
        '<div style="font-size:1.2rem;">📄</div>' +
        '<div style="flex:1;min-width:0;">' +
          '<div style="font-size:0.72rem;color:var(--tx);font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (doc.name || doc.id) + '</div>' +
          '<div style="font-size:0.58rem;color:var(--tx3);">' +
            (doc.chunks || '?') + ' chunks · ' + new Date(doc.ingestedAt || Date.now()).toLocaleDateString() +
          '</div>' +
        '</div>' +
        statusBadge +
        (status === 'pending' ?
          '<button onclick="adminApprovePDF(\'' + doc.id + '\')" style="padding:4px 10px;border-radius:6px;border:1px solid rgba(34,197,94,0.3);background:rgba(34,197,94,0.08);color:#22c55e;font-size:0.58rem;cursor:pointer;">✓ Approve</button>' : '') +
        '<button onclick="adminDeletePDF(\'' + doc.id + '\')" style="padding:4px 10px;border-radius:6px;border:1px solid rgba(239,68,68,0.3);background:rgba(239,68,68,0.08);color:#ef4444;font-size:0.58rem;cursor:pointer;">🗑</button>' +
      '</div>';
    }).join('');
  } catch (e) {
    container.innerHTML = '<div style="color:#ef4444;font-size:0.72rem;">Error loading PDFs: ' + e.message + '</div>';
  }
}

window.adminApprovePDF = async function(docId) {
  if (typeof RAG === 'undefined' || !RAG.db) return;
  try {
    var tx = RAG.db.transaction(RAG.META, 'readwrite');
    var store = tx.objectStore(RAG.META);
    var req = store.get(docId);
    req.onsuccess = function() {
      var doc = req.result;
      if (doc) {
        doc.status = 'approved';
        store.put(doc);
        loadAdminPDFs();
      }
    };
  } catch (e) { console.warn('Approve PDF error:', e); }
};

window.adminDeletePDF = async function(docId) {
  if (!confirm('Delete this PDF and all its chunks?')) return;
  if (typeof ragDeleteDoc === 'function') {
    await ragDeleteDoc(docId);
    loadAdminPDFs();
  }
};

/* ══════════════════════════════════════════════════════════
   8. SUGGESTIONS MANAGEMENT
   ══════════════════════════════════════════════════════════ */
function buildAdminSuggestions(suggestions) {
  if (!suggestions.length) {
    return '<div style="text-align:center;padding:20px;color:var(--tx3);font-size:0.72rem;">' +
      '<div style="font-size:1.5rem;margin-bottom:8px;">💡</div>No suggestions yet</div>';
  }

  var sorted = suggestions.slice().sort(function(a, b) { return (b.votes || 1) - (a.votes || 1); });
  return '<div style="margin-bottom:12px;display:flex;gap:8px;">' +
    '<button onclick="adminExportSuggestions()" style="padding:6px 12px;border-radius:6px;border:1px solid var(--b1);background:var(--bg2);color:var(--tx);font-size:0.62rem;cursor:pointer;">📋 Export JSON</button>' +
    '<button onclick="adminClearSuggestions()" style="padding:6px 12px;border-radius:6px;border:1px solid rgba(239,68,68,0.3);background:rgba(239,68,68,0.05);color:#ef4444;font-size:0.62rem;cursor:pointer;">🗑 Clear All</button>' +
  '</div>' +
  sorted.map(function(s) {
    return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--b0);">' +
      '<div style="font-size:0.72rem;color:#d4a017;font-weight:700;min-width:30px;text-align:center;">' + (s.votes || 1) + '×</div>' +
      '<div style="flex:1;">' +
        '<div style="font-size:0.72rem;color:var(--tx);font-weight:600;">' + (s.name || s.topic || 'Unknown') + '</div>' +
        '<div style="font-size:0.55rem;color:var(--tx3);">' + (s.category || '') + ' · ' + new Date(s.ts || Date.now()).toLocaleDateString() + '</div>' +
      '</div>' +
      '<button onclick="adminDeleteSuggestion(' + suggestions.indexOf(s) + ')" style="padding:3px 8px;border-radius:5px;border:1px solid rgba(239,68,68,0.3);background:transparent;color:#ef4444;font-size:0.55rem;cursor:pointer;">✕</button>' +
    '</div>';
  }).join('');
}

window.adminExportSuggestions = function() {
  var suggestions = JSON.parse(localStorage.getItem('miq_suggestions') || '[]');
  navigator.clipboard.writeText(JSON.stringify(suggestions, null, 2));
  alert('Suggestions copied to clipboard!');
};

window.adminClearSuggestions = function() {
  if (!confirm('Delete ALL suggestions?')) return;
  localStorage.removeItem('miq_suggestions');
  openAdminDashboard(); // Refresh
};

window.adminDeleteSuggestion = function(idx) {
  var suggestions = JSON.parse(localStorage.getItem('miq_suggestions') || '[]');
  suggestions.splice(idx, 1);
  localStorage.setItem('miq_suggestions', JSON.stringify(suggestions));
  openAdminDashboard(); // Refresh
};

/* ══════════════════════════════════════════════════════════
   9. AI CACHE MANAGEMENT
   ══════════════════════════════════════════════════════════ */
function buildAdminCache() {
  var cacheItems = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.startsWith('miq_dyntopic_')) {
      try {
        var data = JSON.parse(localStorage.getItem(key));
        cacheItems.push({
          key: key,
          topicId: key.replace('miq_dyntopic_', ''),
          ts: data._ts || 0,
          formulas: (data.formulas || []).length,
          flashcards: (data.flashcards || []).length
        });
      } catch (e) {}
    }
  }

  if (!cacheItems.length) {
    return '<div style="text-align:center;padding:20px;color:var(--tx3);font-size:0.72rem;">' +
      '<div style="font-size:1.5rem;margin-bottom:8px;">⚡</div>No AI-cached topics</div>';
  }

  return '<div style="margin-bottom:12px;">' +
    '<button onclick="adminClearAllCache()" style="padding:6px 12px;border-radius:6px;border:1px solid rgba(239,68,68,0.3);background:rgba(239,68,68,0.05);color:#ef4444;font-size:0.62rem;cursor:pointer;">🗑 Clear All Cache</button>' +
  '</div>' +
  cacheItems.sort(function(a,b){ return b.ts - a.ts; }).map(function(c) {
    return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--b0);">' +
      '<div style="font-size:0.9rem;">⚡</div>' +
      '<div style="flex:1;">' +
        '<div style="font-size:0.72rem;color:var(--tx);font-weight:600;">' + c.topicId + '</div>' +
        '<div style="font-size:0.55rem;color:var(--tx3);">' + c.formulas + ' formulas · ' + c.flashcards + ' flashcards · ' + (c.ts ? new Date(c.ts).toLocaleDateString() : 'unknown') + '</div>' +
      '</div>' +
      '<button onclick="adminDeleteCache(\'' + c.key + '\')" style="padding:3px 8px;border-radius:5px;border:1px solid rgba(239,68,68,0.3);background:transparent;color:#ef4444;font-size:0.55rem;cursor:pointer;">✕</button>' +
    '</div>';
  }).join('');
}

window.adminClearAllCache = function() {
  if (!confirm('Clear ALL AI-cached topics?')) return;
  var keys = [];
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).startsWith('miq_dyntopic_')) keys.push(localStorage.key(i));
  }
  keys.forEach(function(k) { localStorage.removeItem(k); });
  openAdminDashboard();
};

window.adminDeleteCache = function(key) {
  localStorage.removeItem(key);
  openAdminDashboard();
};

/* ══════════════════════════════════════════════════════════
   10. CSS
   ══════════════════════════════════════════════════════════ */
(function injectAdminCSS() {
  var s = document.createElement('style');
  s.textContent = '\
.adm-tab {\
  padding: 10px 16px; border: none; background: transparent;\
  color: var(--tx3); font-family: "JetBrains Mono", monospace;\
  font-size: 0.65rem; cursor: pointer; white-space: nowrap;\
  border-bottom: 2px solid transparent; transition: all 0.12s;\
}\
.adm-tab:hover { color: var(--tx); }\
.adm-tab.active { color: #ef4444; border-bottom-color: #ef4444; }\
@media (max-width: 768px) {\
  .adm-tab { padding: 10px 10px; font-size: 0.6rem; }\
  #adminDash > div { margin: 10px !important; }\
}\
  ';
  document.head.appendChild(s);
})();

console.log('%cMarineIQ — Admin Panel: type "marine-admin" to access', 'color:#ef4444;font-weight:bold');
