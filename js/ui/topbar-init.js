/* MarineIQ — Topbar Upgrades: Search button, Dark mode toggle, Rank cards, API button
   Deps: config.js, navigation.js (buildRankGrid) */

document.addEventListener('DOMContentLoaded', function initUpgradeUI() {

  /* ── Search button in topbar ── */
  const tbActions = document.querySelector('.topbar-actions');
  if (tbActions) {
    // Global search btn
    const srchBtn = document.createElement('button');
    srchBtn.className = 'tbtn';
    srchBtn.id        = 'globalSearchBtn';
    srchBtn.title     = 'Search all topics (/)';
    srchBtn.innerHTML = '🔍';
    srchBtn.addEventListener('click', openGlobalSearch);
    tbActions.insertBefore(srchBtn, tbActions.firstChild);

    // Dark/light toggle
    const toggleWrap = document.createElement('button');
    toggleWrap.className = 'mode-toggle';
    toggleWrap.title     = 'Toggle light/dark mode';
    toggleWrap.innerHTML = '<div class="mode-toggle-knob"></div>';
    toggleWrap.addEventListener('click', toggleLightMode);
    tbActions.insertBefore(toggleWrap, tbActions.firstChild);

    // Streak badge
    const sb = document.createElement('div');
    sb.className = 'streak-badge';
    sb.id        = 'streakBadge';
    sb.innerHTML = `🔥 <span id="streakCount">${APP.streak.count}</span>d`;
    tbActions.insertBefore(sb, tbActions.firstChild);
  }

  /* ── Inject global search overlay ── */
  const gsOverlay = document.createElement('div');
  gsOverlay.id        = 'globalSearch';
  gsOverlay.className = 'global-search-overlay';
  gsOverlay.innerHTML = `
    <div class="gs-box">
      <div class="gs-input-wrap">
        <span style="font-size:1rem;flex-shrink:0">🔍</span>
        <input class="gs-input" id="gsInput" placeholder="Search all 86 topics…" autocomplete="off" spellcheck="false"/>
        <kbd style="font-size:0.65rem;color:var(--tx3);border:1px solid var(--b1);padding:2px 6px;border-radius:5px;flex-shrink:0">ESC</kbd>
      </div>
      <div class="gs-results" id="gsResults"></div>
      <div class="gs-shortcut">
        <span><span class="gs-key">/</span> open</span>
        <span><span class="gs-key">↑↓</span> navigate</span>
        <span><span class="gs-key">↵</span> go to topic</span>
      </div>
    </div>`;
  gsOverlay.addEventListener('click', e => { if (e.target === gsOverlay) closeGlobalSearch(); });
  document.body.appendChild(gsOverlay);

  const gsInput = document.getElementById('gsInput');
  if (gsInput) {
    gsInput.addEventListener('input', renderGSResults);
    gsInput.addEventListener('keydown', handleGSKeys);
  }

  /* ── Restore light mode ── */
  if (APP.lightMode) document.body.classList.add('light-mode');

  /* ── Upgrade home screen ── */
  upgradeHomeScreen();

  /* ── Update streak ── */
  checkStreak();
});

/* ── Streak logic ── */
function checkStreak() {
  const today = new Date().toDateString();
  const s     = APP.streak;
  if (s.last !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    s.count = s.last === yesterday ? s.count + 1 : 1;
    s.last  = today;
    APP.streak = s;
    saveState('miq_streak', s);
  }
  const el = document.getElementById('streakCount');
  if (el) el.textContent = s.count;
}

/* ── Dark/Light mode ── */
function toggleLightMode() {
  APP.lightMode = !APP.lightMode;
  document.body.classList.toggle('light-mode', APP.lightMode);
  localStorage.setItem('miq_lightmode', APP.lightMode);
}

/* ══════════════════════════════════════════════════════════════════
   6. UPGRADED HOME SCREEN
   ══════════════════════════════════════════════════════════════════ */
function upgradeHomeScreen() {
  const home = document.getElementById('homeScreen');
  if (!home) return;

  // Build all topics index for search
  buildTopicsIndex();

  // Count totals
  const allTopics = CAREER_LEVELS.flatMap(l => Object.values(l.sections).flat());
  const doneCount = Object.keys(APP.studied).length;
  const total     = allTopics.length;
  const fcCount   = APP.stats.fcFlipped  || 0;
  const qzCount   = APP.stats.quizTaken  || 0;
  const aiCount   = APP.stats.aiAsked    || 0;

  // Find last topic info for "continue" card
  const lastTopicId = APP.lastTopic;
  const lastTopicInfo = lastTopicId ? allTopics.find(t => t.id === lastTopicId) : null;
  const lastLevelInfo = APP.lastLevel ? CAREER_LEVELS.find(l => l.id === APP.lastLevel) : null;

  // Inject before hero
  const hero = home.querySelector('.home-hero');
  if (!hero) return;

  // Stats row
  const statsDiv = document.createElement('div');
  statsDiv.className = 'stats-row';
  statsDiv.innerHTML = `
    <div class="stat-card">
      <div class="stat-icon">📖</div>
      <div class="stat-num">${doneCount}</div>
      <div class="stat-lbl">Topics Studied</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">🃏</div>
      <div class="stat-num">${fcCount}</div>
      <div class="stat-lbl">Cards Flipped</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">🎯</div>
      <div class="stat-num">${qzCount}</div>
      <div class="stat-lbl">Quizzes Done</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">🤖</div>
      <div class="stat-num">${aiCount}</div>
      <div class="stat-lbl">AI Questions</div>
    </div>`;
  home.insertBefore(statsDiv, hero);

  // Continue card
  if (lastTopicInfo && lastLevelInfo) {
    const contDiv = document.createElement('div');
    contDiv.className = 'continue-card';
    contDiv.onclick   = () => { enterLevel(lastLevelInfo.id); setTimeout(() => { const t = lastTopicInfo; selectTopic(t.id, t.title, t.desc, t.icon, ''); }, 300); };
    contDiv.innerHTML = `
      <div class="continue-play">▶</div>
      <div class="continue-info">
        <div class="continue-label">Continue where you left off</div>
        <div class="continue-title">${lastTopicInfo.icon} ${lastTopicInfo.title}</div>
        <div class="continue-sub">${lastLevelInfo.title} · ${TOPIC_META[lastTopicId]?.paper || ''}</div>
      </div>
      <div style="font-size:1.4rem">→</div>`;
    home.insertBefore(contDiv, hero);
  }

  // Upgrade rank cards to show progress
  upgradeRankCards();
}



/* Upgrade rank cards to show topic completion % */
function upgradeRankCards() {
  CAREER_LEVELS.forEach(lvl => {
    const allTopics = Object.values(lvl.sections).flat();
    const done = allTopics.filter(t => APP.studied[t.id]).length;
    const pct  = allTopics.length ? Math.round(done / allTopics.length * 100) : 0;
    // Find the card (they're built by buildRankGrid)
    setTimeout(() => {
      const card = document.querySelector(`.rank-card[onclick*="${lvl.id}"]`);
      if (!card || card.querySelector('.rc-progress')) return;
      const prog = document.createElement('div');
      prog.className = 'rc-progress';
      prog.innerHTML = `
        <div class="rc-prog-bar"><div class="rc-prog-fill" style="width:${pct}%;background:${lvl.rankColor}"></div></div>
        <div class="rc-prog-label">${done}/${allTopics.length} topics · ${pct}% complete</div>`;
      card.appendChild(prog);
    }, 200);
  });
}
