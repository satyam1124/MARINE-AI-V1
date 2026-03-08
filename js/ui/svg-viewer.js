/* MarineIQ — Enhanced SVG Viewer with Touch Gestures
   Pinch-to-zoom, pan, double-tap, fullscreen lightbox
   Works on all SVGs: hardcoded, AI-generated, Mermaid */

(function initSVGViewer() {

  /* ══════════════════════════════════════════════════════════
     1. LIGHTBOX WITH PINCH-TO-ZOOM
     ══════════════════════════════════════════════════════════ */

  var _currentScale = 1;
  var _currentTranslateX = 0;
  var _currentTranslateY = 0;
  var _lastTouchDist = 0;
  var _lastTouchX = 0;
  var _lastTouchY = 0;
  var _isPanning = false;
  var _lastTapTime = 0;

  function openSVGLightbox(svgHTML, title) {
    _currentScale = 1;
    _currentTranslateX = 0;
    _currentTranslateY = 0;

    var overlay = document.createElement('div');
    overlay.id = 'svgLightbox';
    overlay.className = 'svg-lb';
    overlay.innerHTML =
      '<div class="svg-lb-chrome">' +
        '<div class="svg-lb-topbar">' +
          '<span class="svg-lb-title">' + (title || 'Diagram') + '</span>' +
          '<div class="svg-lb-controls">' +
            '<button class="svg-lb-btn" onclick="svgLbRotate()" title="Rotate hint">↻</button>' +
            '<button class="svg-lb-btn" onclick="svgLbResetZoom()" title="Reset zoom">⟲</button>' +
            '<button class="svg-lb-btn svg-lb-close" onclick="closeSVGLightbox()">✕</button>' +
          '</div>' +
        '</div>' +
        '<div class="svg-lb-body" id="svgLbBody">' +
          '<div class="svg-lb-content" id="svgLbContent">' + svgHTML + '</div>' +
        '</div>' +
        '<div class="svg-lb-hint" id="svgLbHint">Pinch to zoom · Double-tap to reset</div>' +
      '</div>';

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Attach touch handlers
    var body = document.getElementById('svgLbBody');
    if (body) {
      body.addEventListener('touchstart', onLbTouchStart, { passive: false });
      body.addEventListener('touchmove', onLbTouchMove, { passive: false });
      body.addEventListener('touchend', onLbTouchEnd, { passive: false });
    }

    // Close on background click
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay || e.target.classList.contains('svg-lb-chrome')) {
        closeSVGLightbox();
      }
    });

    // Dismiss hint after 3s
    setTimeout(function() {
      var h = document.getElementById('svgLbHint');
      if (h) { h.style.opacity = '0'; setTimeout(function() { if (h.parentNode) h.remove(); }, 300); }
    }, 3000);
  }

  function closeSVGLightbox() {
    var el = document.getElementById('svgLightbox');
    if (el) {
      el.style.opacity = '0';
      setTimeout(function() { el.remove(); }, 200);
    }
    document.body.style.overflow = '';
  }

  function applyLbTransform() {
    var c = document.getElementById('svgLbContent');
    if (c) {
      c.style.transform = 'translate(' + _currentTranslateX + 'px,' + _currentTranslateY + 'px) scale(' + _currentScale + ')';
    }
  }

  function onLbTouchStart(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      var dx = e.touches[0].clientX - e.touches[1].clientX;
      var dy = e.touches[0].clientY - e.touches[1].clientY;
      _lastTouchDist = Math.sqrt(dx * dx + dy * dy);
      _lastTouchX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      _lastTouchY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    } else if (e.touches.length === 1 && _currentScale > 1) {
      _isPanning = true;
      _lastTouchX = e.touches[0].clientX;
      _lastTouchY = e.touches[0].clientY;
    }
  }

  function onLbTouchMove(e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      var dx = e.touches[0].clientX - e.touches[1].clientX;
      var dy = e.touches[0].clientY - e.touches[1].clientY;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (_lastTouchDist > 0) {
        var delta = dist / _lastTouchDist;
        _currentScale = Math.min(5, Math.max(0.5, _currentScale * delta));
        applyLbTransform();
      }
      _lastTouchDist = dist;
    } else if (e.touches.length === 1 && _isPanning) {
      e.preventDefault();
      var dxp = e.touches[0].clientX - _lastTouchX;
      var dyp = e.touches[0].clientY - _lastTouchY;
      _currentTranslateX += dxp;
      _currentTranslateY += dyp;
      applyLbTransform();
      _lastTouchX = e.touches[0].clientX;
      _lastTouchY = e.touches[0].clientY;
    }
  }

  function onLbTouchEnd(e) {
    _isPanning = false;
    _lastTouchDist = 0;

    // Double-tap detection
    if (e.changedTouches.length === 1) {
      var now = Date.now();
      if (now - _lastTapTime < 300) {
        // Double tap — toggle zoom
        if (_currentScale > 1.2) {
          _currentScale = 1;
          _currentTranslateX = 0;
          _currentTranslateY = 0;
        } else {
          _currentScale = 2.5;
        }
        applyLbTransform();
      }
      _lastTapTime = now;
    }
  }

  // Global functions for onclick handlers
  window.openSVGLightbox = openSVGLightbox;
  window.closeSVGLightbox = closeSVGLightbox;
  window.svgLbResetZoom = function() {
    _currentScale = 1;
    _currentTranslateX = 0;
    _currentTranslateY = 0;
    applyLbTransform();
  };
  window.svgLbRotate = function() {
    var c = document.getElementById('svgLbContent');
    if (!c) return;
    var isRotated = c.dataset.rotated === '1';
    if (isRotated) {
      c.style.transform = 'scale(1)';
      c.dataset.rotated = '0';
      _currentScale = 1;
    } else {
      c.style.transform = 'rotate(90deg) scale(1.4)';
      c.dataset.rotated = '1';
    }
    _currentTranslateX = 0;
    _currentTranslateY = 0;
  };

  /* ══════════════════════════════════════════════════════════
     2. REPLACE EXISTING ZOOM FUNCTIONS — wire to lightbox
     ══════════════════════════════════════════════════════════ */

  // Override zoomAIDiagram
  window.zoomAIDiagram = function(topicId) {
    var svgEl = document.querySelector('#aisvg_' + topicId + ' svg');
    if (!svgEl) return;
    var title = document.querySelector('.tz-intro-title')?.textContent || topicId;
    openSVGLightbox(svgEl.outerHTML, 'AI Diagram · ' + title);
  };

  // Override zoomMermaid
  var _origZoomMermaid = window.zoomMermaid;
  window.zoomMermaid = function(btn) {
    var wrap = btn.closest('.mmd-result');
    if (!wrap) return;
    var svgWrap = wrap.querySelector('.mmd-svg-wrap');
    var title = (wrap.querySelector('.mmd-title-text')?.textContent || 'System Flow');
    if (svgWrap) {
      openSVGLightbox(svgWrap.innerHTML, title);
    }
  };

  /* ══════════════════════════════════════════════════════════
     3. TAP-TO-EXPAND on all diagram cards
     ══════════════════════════════════════════════════════════ */
  document.addEventListener('click', function(e) {
    // Hardcoded diagrams in .diag-card
    var card = e.target.closest('.diag-card');
    if (card) {
      var svg = card.querySelector('svg');
      if (svg) {
        openSVGLightbox(svg.outerHTML, 'Technical Diagram');
        return;
      }
    }
  });

  /* ══════════════════════════════════════════════════════════
     4. LANDSCAPE ROTATION HINT
     ══════════════════════════════════════════════════════════ */
  var _landscapeHintShown = false;
  function checkLandscapeHint() {
    if (_landscapeHintShown) return;
    if (window.innerWidth <= 768 && window.innerHeight > window.innerWidth) {
      // Portrait on mobile — show hint on first diagram view
      var diagGrid = document.getElementById('diagGrid');
      if (diagGrid && diagGrid.children.length > 0) {
        var hint = document.createElement('div');
        hint.className = 'diag-rotate-hint';
        hint.innerHTML = '📱 Rotate your phone for a better diagram view';
        hint.style.cssText = 'text-align:center;padding:8px;font-size:0.68rem;color:var(--tx3);background:rgba(96,165,250,0.06);border-radius:8px;margin-top:6px;grid-column:1/-1;';
        diagGrid.insertBefore(hint, diagGrid.firstChild);
        _landscapeHintShown = true;
        setTimeout(function() { hint.style.opacity = '0'; hint.style.transition = 'opacity 0.5s'; setTimeout(function() { hint.remove(); }, 500); }, 6000);
      }
    }
  }

  // Trigger on tab switch to Diagrams
  var _origSelectTab = window.selectTab;
  if (_origSelectTab) {
    window.selectTab = function(tab) {
      _origSelectTab(tab);
      if (tab === 'diagrams') {
        setTimeout(checkLandscapeHint, 500);
      }
    };
  }

  /* ══════════════════════════════════════════════════════════
     5. CSS — Lightbox + mobile UX
     ══════════════════════════════════════════════════════════ */
  var s = document.createElement('style');
  s.id = 'svg-viewer-css';
  s.textContent = '\
/* ── SVG Lightbox ── */\
.svg-lb {\
  position: fixed; inset: 0; z-index: 600;\
  background: rgba(0,0,0,0.95);\
  display: flex; align-items: center; justify-content: center;\
  transition: opacity 0.2s;\
}\
.svg-lb-chrome {\
  width: 95vw; max-width: 1200px; height: 95vh;\
  display: flex; flex-direction: column;\
}\
.svg-lb-topbar {\
  display: flex; justify-content: space-between; align-items: center;\
  padding: 10px 16px;\
  background: rgba(10,14,23,0.95);\
  border-bottom: 1px solid rgba(45,90,143,0.3);\
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);\
  flex-shrink: 0;\
}\
.svg-lb-title {\
  font-family: "JetBrains Mono", monospace; font-size: 0.7rem;\
  color: #e8f4ff; font-weight: 600;\
  text-transform: uppercase; letter-spacing: 0.05em;\
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;\
  max-width: 60vw;\
}\
.svg-lb-controls { display: flex; gap: 6px; flex-shrink: 0; }\
.svg-lb-btn {\
  width: 34px; height: 34px; border-radius: 8px;\
  border: 1px solid rgba(45,90,143,0.3);\
  background: rgba(9,22,41,0.8); color: var(--tx3);\
  cursor: pointer; font-size: 1rem;\
  display: flex; align-items: center; justify-content: center;\
  transition: all 0.12s;\
}\
.svg-lb-btn:hover { border-color: var(--ac); color: var(--acL); }\
.svg-lb-close:hover { border-color: #ef4444; color: #ef4444; }\
.svg-lb-body {\
  flex: 1; overflow: auto;\
  display: flex; align-items: center; justify-content: center;\
  touch-action: none;\
  -webkit-user-select: none; user-select: none;\
  padding: 8px;\
}\
.svg-lb-content {\
  transition: transform 0.1s ease-out;\
  transform-origin: center center;\
  width: 100%; height: 100%;\
  display: flex; align-items: center; justify-content: center;\
}\
.svg-lb-content svg {\
  width: 90vw !important; height: auto !important;\
  max-width: 1100px; max-height: 85vh;\
  display: block !important;\
  object-fit: contain;\
}\
.svg-lb-hint {\
  position: absolute; bottom: 24px; left: 50%;\
  transform: translateX(-50%);\
  padding: 6px 16px; border-radius: 20px;\
  background: rgba(9,22,41,0.9); border: 1px solid rgba(45,90,143,0.3);\
  font-family: "JetBrains Mono", monospace;\
  font-size: 0.6rem; color: var(--tx3);\
  transition: opacity 0.3s; pointer-events: none;\
}\
/* ── Mobile-specific lightbox — fill screen ── */\
@media (max-width: 768px) {\
  .svg-lb-chrome { width: 100vw; height: 100vh; max-width: 100vw; }\
  .svg-lb-content svg {\
    width: 100vw !important; max-width: 100vw;\
    max-height: 80vh;\
  }\
  .svg-lb-topbar { padding: 8px 12px; }\
  .svg-lb-btn { width: 40px; height: 40px; min-height: 44px; min-width: 44px; }\
  .svg-lb-title { font-size: 0.6rem; max-width: 50vw; }\
  .svg-lb-body { padding: 4px; }\
}\
/* ── Landscape on mobile — maximize diagram ── */\
@media (max-width: 900px) and (orientation: landscape) {\
  .svg-lb-chrome { width: 100vw; height: 100vh; }\
  .svg-lb-content svg { width: 95vw !important; max-height: 80vh; }\
  .svg-lb-topbar { padding: 4px 12px; }\
}\
/* ── Diagram cards: tap hint on mobile ── */\
@media (max-width: 768px) {\
  .diag-card { cursor: pointer; position: relative; }\
  .diag-card::after {\
    content: "⤢";\
    position: absolute; top: 6px; right: 6px;\
    width: 24px; height: 24px; border-radius: 6px;\
    background: rgba(0,0,0,0.6); color: #60a5fa;\
    display: flex; align-items: center; justify-content: center;\
    font-size: 0.7rem; pointer-events: none;\
  }\
}\
/* ── Scrollable tab bar on mobile ── */\
@media (max-width: 768px) {\
  .tab-row {\
    display: flex !important; flex-wrap: nowrap !important;\
    overflow-x: auto !important;\
    -webkit-overflow-scrolling: touch;\
    scrollbar-width: none;\
    gap: 0 !important;\
    padding-bottom: 2px;\
  }\
  .tab-row::-webkit-scrollbar { display: none; }\
  .tab-row .tab-btn, .mm-tab {\
    flex-shrink: 0 !important;\
    white-space: nowrap !important;\
    min-height: 44px !important;\
    padding: 8px 12px !important;\
    font-size: 0.68rem !important;\
  }\
}\
/* ── Sticky tab bar on scroll ── */\
.tab-row {\
  position: sticky; top: 0; z-index: 20;\
  background: var(--bg0);\
}\
/* ── Topic header fix: prevent one-word-per-line on mobile ── */\
@media (max-width: 768px) {\
  .tz-intro { padding: 12px !important; }\
  .tz-intro-title {\
    font-size: 1rem !important;\
    word-break: keep-all !important;\
    overflow-wrap: break-word !important;\
    display: flex !important; flex-wrap: wrap !important;\
    align-items: center !important; gap: 6px !important;\
  }\
  .tz-intro-desc {\
    font-size: 0.72rem !important;\
    line-height: 1.4 !important;\
    word-break: normal !important;\
    overflow-wrap: break-word !important;\
  }\
  /* Tags row compact */\
  .topic-tags { flex-wrap: wrap !important; gap: 4px !important; }\
  .topic-tags span { font-size: 0.6rem !important; padding: 3px 8px !important; }\
}\
/* ── Larger touch targets globally ── */\
@media (max-width: 768px) {\
  button, .btn, [role="button"] {\
    min-height: 44px;\
  }\
  .modal-cancel, .modal-save {\
    min-height: 48px;\
    font-size: 0.82rem !important;\
  }\
}\
/* ── Safe area for iPhone notch ── */\
@supports (padding-bottom: env(safe-area-inset-bottom)) {\
  body { padding-bottom: env(safe-area-inset-bottom); }\
  #fabAsk { bottom: calc(72px + env(safe-area-inset-bottom)); }\
}\
/* ── Single column diagrams on mobile ── */\
@media (max-width: 768px) {\
  #diagGrid {\
    grid-template-columns: 1fr !important;\
    gap: 8px !important;\
  }\
  .ai-diag-svg-wrap svg {\
    max-height: 50vh;\
    width: 100% !important;\
  }\
  .mmd-svg-wrap svg {\
    max-height: 50vh;\
    width: 100% !important;\
  }\
}\
/* ── Card grid responsive ── */\
@media (max-width: 480px) {\
  .rank-grid { grid-template-columns: 1fr !important; gap: 10px !important; }\
  .stat-card { padding: 10px 8px !important; }\
  .stat-num { font-size: 1.1rem !important; }\
  .home-hero h1 { font-size: 1.2rem !important; }\
}\
/* ── Mermaid diagram mobile ── */\
@media (max-width: 768px) {\
  .mmd-result { margin: 8px 0 !important; }\
  .mmd-svg-wrap { padding: 8px !important; overflow-x: auto; }\
}\
/* ── AI search generate button styling ── */\
.gs-ai-gen { border: 1px solid rgba(212,160,23,0.2) !important; margin-top: 8px; }\
.gs-ai-gen:hover { background: rgba(212,160,23,0.08) !important; }\
  ';
  document.head.appendChild(s);

})();

console.log('%cMarineIQ — SVG Viewer: pinch-zoom, pan, lightbox active', 'color:#22c55e;font-weight:bold');
