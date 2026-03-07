/* MarineIQ — Mobile UI (hamburger, touch gestures, responsive init)
   Deps: config.js, utils.js */

/* ═══════════════════════════════════════════════════════════════════════
   FIX 3: MOBILE UI — fully deferred to DOMContentLoaded
   All querySelector/getElementById wrapped safely
   ═══════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function initMobileUI() {

  /* ── Inject hamburger ── */
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    const ham = document.createElement('button');
    ham.id        = 'hamburger';
    ham.className = 'hamburger';
    ham.setAttribute('aria-label', 'Toggle menu');
    ham.innerHTML = '<span></span><span></span><span></span>';
    ham.addEventListener('click', toggleSidebar);
    topbar.insertBefore(ham, topbar.firstChild);
  }

  /* ── Inject sidebar overlay ── */
  const overlay = document.createElement('div');
  overlay.id        = 'sbOverlay';
  overlay.className = 'sb-overlay';
  overlay.addEventListener('click', closeSidebar);
  document.body.appendChild(overlay);

  /* ── Inject sidebar close button ── */
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'sb-close-btn';
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', closeSidebar);
    sidebar.insertBefore(closeBtn, sidebar.firstChild);
  }

  /* ── Inject scroll-to-top button ── */
  const stb = document.createElement('button');
  stb.id        = 'scrollTopBtn';
  stb.className = 'scroll-top-btn';
  stb.innerHTML = '↑';
  stb.title     = 'Back to top';
  stb.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(stb);

  window.addEventListener('scroll', () => {
    stb.classList.toggle('visible', window.scrollY > 350);
  }, { passive: true });

  /* ── Swipe to close sidebar ── */
  if (sidebar) {
    let touchStartX = 0;
    sidebar.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    sidebar.addEventListener('touchend', e => {
      if (window.innerWidth > 768) return;
      if (e.changedTouches[0].clientX - touchStartX < -55) closeSidebar();
    }, { passive: true });
  }

  /* ── Resize: switch between overlay and push mode ── */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      const ol = document.getElementById('sbOverlay');
      if (ol) ol.classList.remove('show');
      document.body.style.overflow = '';
      const ham = document.getElementById('hamburger');
      if (ham) ham.classList.remove('open');
      // restore desktop push if level is open
      if (APP.currentLevel) {
        document.getElementById('mainEl').classList.add('sb-open');
      }
    } else {
      document.getElementById('mainEl').classList.remove('sb-open');
    }
  }, { passive: true });

  /* ── Scroll-reveal for rank cards ── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.rank-card, .info-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  /* ── Diagram tap-to-zoom ── */
  document.addEventListener('click', e => {
    const card = e.target.closest('.diag-card');
    if (!card) return;
    const wasZoomed = card.classList.contains('zoomed');
    document.querySelectorAll('.diag-card.zoomed').forEach(c => c.classList.remove('zoomed'));
    if (!wasZoomed) card.classList.add('zoomed');
  });

  /* ── Keyboard shortcuts ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const apiOv = document.getElementById('apiOverlay');
      const notDr = document.getElementById('notesDrawer');
      if (apiOv && apiOv.classList.contains('open')) { closeApiModal(); return; }
      if (notDr && notDr.classList.contains('open')) { toggleNotes(); return; }
      if (window.innerWidth <= 768) closeSidebar();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const inp = document.getElementById('searchInput');
      if (inp) { inp.focus(); inp.select(); }
    }
    // Arrow keys / space for flashcards
    if (APP.fcCards && APP.fcCards.length) {
      const fcPanel = document.getElementById('panel-flashcards');
      if (fcPanel && fcPanel.classList.contains('active')) {
        if (e.key === 'ArrowLeft')  { e.preventDefault(); fcNav(-1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); fcNav(1); }
        if (e.key === ' ')          { e.preventDefault(); fcFlip(); }
      }
    }
  });

  /* ── API key input placeholder ── */
  const apiInp = document.getElementById('apiKeyInput');
  if (apiInp && APP.apiKey) apiInp.placeholder = 'Key saved ✓ — enter new key to change';

  updateNotesPip();
  console.log('%cMarineIQ v3 — all fixes applied', 'color:#38bdf8;font-weight:bold');
});

/* ═══════════════════════════════════════════════════════════════════════
   FIX 4: SIDEBAR TOGGLE — clean, null-safe, desktop + mobile
   ═══════════════════════════════════════════════════════════════════════ */
