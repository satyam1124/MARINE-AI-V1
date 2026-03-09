/* MarineIQ — Sidebar: toggle, open, close, overlay
   Deps: config.js */

function toggleSidebar() {
  const sidebar  = document.getElementById('sidebar');
  if (!sidebar) return;
  const isOpen = sidebar.classList.contains('visible');
  isOpen ? closeSidebar() : openSidebar();
}

function openSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sbOverlay');
  const ham      = document.getElementById('hamburger');
  const mainEl   = document.getElementById('mainEl');
  if (!sidebar) return;

  sidebar.classList.add('visible');

  if (window.innerWidth <= 768) {
    if (overlay) overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    if (ham) ham.classList.add('open');
    if (mainEl) mainEl.classList.remove('sb-open'); // never push on mobile
  } else {
    if (mainEl) mainEl.classList.add('sb-open');
  }
}

function closeSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sbOverlay');
  const ham      = document.getElementById('hamburger');
  const mainEl   = document.getElementById('mainEl');
  if (!sidebar) return;

  sidebar.classList.remove('visible');
  if (mainEl) mainEl.classList.remove('sb-open');
  if (window.innerWidth <= 768) {
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
    if (ham) ham.classList.remove('open');
  }
}

/* ── Override enterLevel to use new sidebar functions ── */
const _enterLevel0 = enterLevel;
enterLevel = function(levelId) {
  _enterLevel0(levelId);
  if (window.innerWidth <= 768) {
    // Mobile: sidebar was opened by enterLevel0 (adds 'visible' + sb-open)
    // We override to use overlay mode instead
    const overlay = document.getElementById('sbOverlay');
    const ham     = document.getElementById('hamburger');
    const mainEl  = document.getElementById('mainEl');
    if (overlay) overlay.classList.add('show');
    if (ham) ham.classList.add('open');
    if (mainEl) mainEl.classList.remove('sb-open'); // no push on mobile
    document.body.style.overflow = 'hidden';
  }
  updateProgressBar();
};

/* ── Override goHome to close sidebar cleanly ── */
const _goHome0 = goHome;
goHome = function() {
  _goHome0();
  const overlay = document.getElementById('sbOverlay');
  const ham     = document.getElementById('hamburger');
  if (overlay) overlay.classList.remove('show');
  if (ham) ham.classList.remove('open');
  document.body.style.overflow = '';
};

/* ── Override selectTopic: close sidebar on mobile, scroll to content ── */
const _selectTopic0 = selectTopic;
selectTopic = function(topicId, title, desc, icon, sectionName) {
  _selectTopic0(topicId, title, desc, icon, sectionName);
  if (window.innerWidth <= 768) {
    closeSidebar();
    setTimeout(() => {
      const tz = document.getElementById('topicZone');
      if (tz) tz.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 180);
  }
  updateProgressBar();
};

/* ═══════════════════════════════════════════════════════════════════════
   FIX 5: PROGRESS BAR — null-safe, uses data attribute not ID
   ═══════════════════════════════════════════════════════════════════════ */
function updateProgressBar() {
  if (!APP.currentLevel) return;
  const lvl       = APP.currentLevel;
  const allTopics = Object.values(lvl.sections).flat().map(t => t.id);
  const done      = allTopics.filter(id => APP.studied[id]).length;
  const total     = allTopics.length;
  const pct       = total ? Math.round((done / total) * 100) : 0;

  // Remove old bar
  const existing = document.querySelector('.sb-progress-bar');
  if (existing) existing.remove();

  const sbContent = document.getElementById('sidebarContent');
  if (!sbContent) return;

  const header = sbContent.querySelector('.sb-rank-header');
  if (!header) return;

  const bar = document.createElement('div');
  bar.className = 'sb-progress-bar';
  bar.innerHTML = `
    <div class="sb-progress-track">
      <div class="sb-progress-fill" style="width:${pct}%;background:${lvl.rankColor}"></div>
    </div>
    <span class="sb-progress-label">${done}/${total}</span>`;
  header.insertAdjacentElement('afterend', bar);
}

/* ── Override markStudied to refresh progress bar ── */
const _markStudied0 = markStudied;
markStudied = function(topicId) {
  _markStudied0(topicId);
  updateProgressBar();
};

/* ═══════════════════════════════════════════════════════════════════════
/* ═══════════════════════════════════════════════════════════════════════
   FIX 7: EXAM MODE ENHANCED FORMATTER
   ═══════════════════════════════════════════════════════════════════════ */
