/* MarineIQ — Micro-Interactions & Keyboard Shortcuts v2.0
   Adds polish animations, keyboard navigation, and performance enhancements.
   Deps: config.js (APP), navigation.js, controls.js */

(function initMicroInteractions() {
  'use strict';

  /* ── 1. CountUp Animation on Stat Cards ── */
  function animateCountUp(el, target) {
    const duration = 800;
    const start = performance.now();
    const from = 0;

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(from + (target - from) * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Observe stat cards for intersection
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target._counted) {
        entry.target._counted = true;
        const numEl = entry.target.querySelector('.stat-num');
        if (numEl) {
          const target = parseInt(numEl.textContent, 10) || 0;
          if (target > 0) animateCountUp(numEl, target);
        }
      }
    });
  }, { threshold: 0.3 });

  // Observe once DOM is ready
  function observeStatCards() {
    document.querySelectorAll('.stat-card').forEach(card => observer.observe(card));
  }

  /* ── 2. Button Spring Press Effect ── */
  function addSpringPress() {
    document.addEventListener('pointerdown', e => {
      const btn = e.target.closest('.tbtn, .action-btn, .ask-btn-outer, .modal-save, .modal-cancel, .fc-ctrl-btn, .company-action-btn, .cbt-nav-btn');
      if (btn) {
        btn.style.transition = 'transform 0.08s ease';
        btn.style.transform = 'scale(0.96)';
      }
    }, { passive: true });

    document.addEventListener('pointerup', e => {
      const btn = e.target.closest('.tbtn, .action-btn, .ask-btn-outer, .modal-save, .modal-cancel, .fc-ctrl-btn, .company-action-btn, .cbt-nav-btn');
      if (btn) {
        btn.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
        btn.style.transform = '';
        // Clean up after animation
        setTimeout(() => { btn.style.transition = ''; }, 300);
      }
    }, { passive: true });
  }

  /* ── 3. Keyboard Shortcuts ── */
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
      // Don't trigger shortcuts when typing in inputs
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) {
        // Only handle Escape in inputs
        if (e.key === 'Escape') {
          e.target.blur();
        }
        return;
      }

      const ctrl = e.ctrlKey || e.metaKey;

      // Ctrl/Cmd + K — Focus AI search
      if (ctrl && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.offsetParent !== null) {
          searchInput.focus();
          searchInput.select();
        }
      }

      // Ctrl/Cmd + B — Toggle sidebar
      if (ctrl && e.key === 'b') {
        e.preventDefault();
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
          sidebar.classList.toggle('visible');
          document.getElementById('mainEl').classList.toggle('sb-open');
        }
      }

      // Escape — Close modals/drawers
      if (e.key === 'Escape') {
        // Close API modal
        const apiOverlay = document.getElementById('apiOverlay');
        if (apiOverlay && apiOverlay.classList.contains('open')) {
          if (typeof closeApiModal === 'function') closeApiModal();
          return;
        }
        // Close notes drawer
        const notesDrawer = document.getElementById('notesDrawer');
        if (notesDrawer && notesDrawer.classList.contains('open')) {
          if (typeof toggleNotes === 'function') toggleNotes();
          return;
        }
        // Close global search
        const gs = document.getElementById('globalSearch');
        if (gs && gs.classList.contains('open')) {
          if (typeof closeGlobalSearch === 'function') closeGlobalSearch();
          return;
        }
        // Close PDF panel
        const pdfPanel = document.getElementById('pdfPanel');
        if (pdfPanel && pdfPanel.style.display !== 'none') {
          if (typeof closePdfPanel === 'function') closePdfPanel();
          return;
        }
      }

      // Arrow keys for flashcards (when flashcard panel is active)
      const fcPanel = document.getElementById('panel-flashcards');
      if (fcPanel && fcPanel.classList.contains('active')) {
        if (e.key === 'ArrowLeft' && typeof fcNav === 'function') {
          e.preventDefault();
          fcNav(-1);
        }
        if (e.key === 'ArrowRight' && typeof fcNav === 'function') {
          e.preventDefault();
          fcNav(1);
        }
        if (e.key === ' ') {
          e.preventDefault();
          if (typeof fcFlip === 'function') fcFlip();
        }
      }

      // Number keys 1-5 for quiz options
      const quizPanel = document.getElementById('panel-quiz');
      if (quizPanel && quizPanel.classList.contains('active')) {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= 5) {
          const opts = document.querySelectorAll('#quizOpts .quiz-opt');
          if (opts[num - 1]) {
            e.preventDefault();
            opts[num - 1].click();
          }
        }
      }
    });
  }

  /* ── 4. Smooth Scroll to Topic Zone ── */
  function patchSelectTopic() {
    const originalSelectTopic = window.selectTopic;
    if (typeof originalSelectTopic === 'function') {
      window.selectTopic = function() {
        originalSelectTopic.apply(this, arguments);
        // Smooth scroll to topic zone after a brief delay
        setTimeout(() => {
          const tz = document.getElementById('topicZone');
          if (tz) {
            tz.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      };
    }
  }

  /* ── 5. Card Hover Glow Effect ── */
  function addCardGlow() {
    document.addEventListener('mousemove', e => {
      const card = e.target.closest('.rank-card, .info-card');
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
        const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
        card.style.setProperty('--glow-x', x + '%');
        card.style.setProperty('--glow-y', y + '%');
      }
    }, { passive: true });
  }

  /* ── 6. Topbar Scroll Shadow ── */
  function addScrollShadow() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const topbar = document.querySelector('.topbar');
          if (topbar) {
            if (window.scrollY > 10) {
              topbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
            } else {
              topbar.style.boxShadow = '';
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── Bootstrap ── */
  document.addEventListener('DOMContentLoaded', () => {
    addSpringPress();
    initKeyboardShortcuts();
    addCardGlow();
    addScrollShadow();

    // Delay non-critical enhancements
    setTimeout(() => {
      observeStatCards();
      patchSelectTopic();
    }, 500);
  });

})();
