/* MarineIQ — Cadet Profile Module
   Stores and retrieves the cadet's B.Tech year.
   Used by CBT engine, Interview sections, and UI to personalize content.
   Persists in localStorage. */

var CadetProfile = (function() {
  'use strict';

  var STORAGE_KEY = 'marineiq_cadet_profile';

  var defaults = {
    year: null,         // 1, 2, 3, 4, or 5 (post-training)
    college: '',
    targetCompanies: [],
    setupDone: false,
    lastUpdated: null
  };

  var profile = loadProfile();

  function loadProfile() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && saved.year) return Object.assign({}, defaults, saved);
    } catch(e) {}
    return Object.assign({}, defaults);
  }

  function saveProfile() {
    profile.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }

  function setYear(y) {
    profile.year = y;
    profile.setupDone = true;
    saveProfile();
    updateYearBadge();
    // Dispatch event for other modules
    document.dispatchEvent(new CustomEvent('cadetYearChanged', { detail: { year: y } }));
  }

  function getYear() {
    return profile.year;
  }

  function getYearLabel() {
    if (!profile.year) return 'Not Set';
    if (profile.year === 5) return 'Post-Training';
    return 'Year ' + profile.year;
  }

  function getYearShort() {
    if (!profile.year) return '?';
    if (profile.year === 5) return 'PT';
    return 'Y' + profile.year;
  }

  function isSetup() {
    return profile.setupDone && profile.year !== null;
  }

  /* ─── Year Selector Modal ─── */
  function showYearSelector(options) {
    options = options || {};
    var isFirstTime = !isSetup();
    var existingModal = document.getElementById('yearSelectorModal');
    if (existingModal) existingModal.remove();

    var overlay = document.createElement('div');
    overlay.id = 'yearSelectorModal';
    overlay.className = 'year-selector-overlay';
    if (!isFirstTime) {
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeYearSelector();
      });
    }

    var yearOptions = [
      { value: 1, label: '1st Year', emoji: '🟢', desc: 'Class 11/12 basics, Physics, Chemistry, Maths' },
      { value: 2, label: '2nd Year', emoji: '🔵', desc: 'Applied Thermodynamics, Fluid Mechanics, Aptitude' },
      { value: 3, label: '3rd Year', emoji: '🟠', desc: 'Marine Engines, Aux Machinery, Safety Regs' },
      { value: 4, label: '4th Year', emoji: '🔴', desc: 'Advanced systems, Company-specific, MEP' },
      { value: 5, label: 'Post-Training', emoji: '⚓', desc: 'Completed 6-month training, interview-ready' }
    ];

    var html = '<div class="year-selector-box">';
    html += '<div class="year-selector-header">';
    if (isFirstTime) {
      html += '<div class="year-selector-emoji">🎓</div>';
      html += '<h2 class="year-selector-title">Welcome to Marine IQ!</h2>';
      html += '<p class="year-selector-subtitle">Select your current B.Tech year so we can personalize your CBT exams, interview prep, and study material.</p>';
    } else {
      html += '<h2 class="year-selector-title">Change Your Year</h2>';
      html += '<p class="year-selector-subtitle">Currently: <strong>' + getYearLabel() + '</strong></p>';
    }
    html += '</div>';

    html += '<div class="year-selector-options">';
    yearOptions.forEach(function(opt) {
      var isActive = profile.year === opt.value;
      html += '<div class="year-option' + (isActive ? ' active' : '') + '" onclick="CadetProfile.selectYearFromModal(' + opt.value + ')">';
      html += '<div class="year-option-left">';
      html += '<span class="year-option-emoji">' + opt.emoji + '</span>';
      html += '<div>';
      html += '<div class="year-option-label">' + opt.label + '</div>';
      html += '<div class="year-option-desc">' + opt.desc + '</div>';
      html += '</div>';
      html += '</div>';
      if (isActive) html += '<span class="year-option-check">✓</span>';
      html += '</div>';
    });
    html += '</div>';

    if (!isFirstTime) {
      html += '<button class="year-selector-close" onclick="CadetProfile.closeYearSelector()">Cancel</button>';
    }
    html += '</div>';

    overlay.innerHTML = html;
    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(function() {
      overlay.classList.add('visible');
    });
  }

  function selectYearFromModal(year) {
    setYear(year);
    closeYearSelector();
  }

  function closeYearSelector() {
    var modal = document.getElementById('yearSelectorModal');
    if (modal) {
      modal.classList.remove('visible');
      setTimeout(function() { modal.remove(); }, 300);
    }
  }

  /* ─── Topbar Year Badge ─── */
  function updateYearBadge() {
    var existing = document.getElementById('cadetYearBadge');
    if (existing) {
      existing.querySelector('.year-badge-text').textContent = getYearShort();
      return;
    }
    injectYearBadge();
  }

  function injectYearBadge() {
    var tbActions = document.querySelector('.topbar-actions');
    if (!tbActions) return;

    var badge = document.createElement('button');
    badge.id = 'cadetYearBadge';
    badge.className = 'cadet-year-badge';
    badge.title = 'Your year: ' + getYearLabel() + ' (click to change)';
    badge.innerHTML = '🎓 <span class="year-badge-text">' + getYearShort() + '</span>';
    badge.addEventListener('click', function() { showYearSelector(); });
    tbActions.insertBefore(badge, tbActions.firstChild);
  }

  /* ─── Init ─── */
  function init() {
    if (!isSetup()) {
      // First time — show year selector immediately
      showYearSelector();
    } else {
      injectYearBadge();
    }
  }

  // Auto-init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already ready, but wait a tick for topbar to be injected
    setTimeout(init, 100);
  }

  /* ─── Public API ─── */
  return {
    getYear: getYear,
    getYearLabel: getYearLabel,
    getYearShort: getYearShort,
    setYear: setYear,
    isSetup: isSetup,
    showYearSelector: showYearSelector,
    selectYearFromModal: selectYearFromModal,
    closeYearSelector: closeYearSelector,
    profile: profile
  };
})();
