/* MarineIQ — Navigation: Rank Grid, Level Pages, Exam Papers, Sidebar Builder
   Deps: config.js, career-levels.js (CAREER_LEVELS), utils.js (esc) */

function buildRankGrid() {
  const grid = document.getElementById('rankGrid');
  grid.innerHTML = CAREER_LEVELS.map((lvl, i) => {
    const isEven = i % 2 === 0;
    const nodeStyle = `background:${lvl.rankColor}22;border-color:${lvl.rankColor};color:${lvl.rankColor};box-shadow:0 0 16px ${lvl.rankColor}33;`;
    return `
    <div class="rank-row" style="animation: fadeUp ${0.1 + i*0.1}s ease forwards; opacity:0;">
      <div class="rank-card" onclick="enterLevel('${lvl.id}')" style="--rank-col:${lvl.rankColor}">
        <div class="rc-number">${lvl.stageNum}</div>
        <div class="rc-icon">${lvl.icon}</div>
        <div class="rc-title" style="color:${lvl.rankColor}">${lvl.title}</div>
        <div class="rc-sub">${lvl.subtitle}</div>
        <div class="rc-tags">
          ${lvl.tags.map(t => `<span class="rc-tag" style="color:${lvl.rankColor};border-color:${lvl.rankColor}44;background:${lvl.rankColor}11">${t}</span>`).join('')}
        </div>
        <div class="rc-eligibility">${lvl.eligibility[0].text}</div>
        <span class="rc-enter">ENTER →</span>
      </div>
      <div class="rank-node" style="${nodeStyle}">${lvl.icon}</div>
    </div>`;
  }).join('');
  // Trigger animations
  setTimeout(() => {
    document.querySelectorAll('.rank-row').forEach((r, i) => {
      setTimeout(() => r.style.opacity = 1, i * 100);
    });
  }, 100);
}

/* ═══════════════════════════════════════════════════════════════════════
   ZONE 6B: LEVEL PAGE
   ═══════════════════════════════════════════════════════════════════════ */
function enterLevel(levelId) {
  const lvl = CAREER_LEVELS.find(l => l.id === levelId);
  if (!lvl) return;
  APP.currentLevel = lvl;
  APP.currentTopic = null;

  // Hide home, show level page
  document.getElementById('homeScreen').style.display = 'none';
  const lp = document.getElementById('levelPage');
  lp.classList.add('visible');

  // Open sidebar
  document.getElementById('sidebar').classList.add('visible');
  document.getElementById('mainEl').classList.add('sb-open');

  // Breadcrumb
  setBreadcrumb([
    { label: 'HOME', action: 'goHome()' },
    { label: lvl.title, active: true }
  ]);

  // Build level banner
  document.getElementById('lpBanner').innerHTML = buildLevelBanner(lvl);

  // Build eligibility block
  document.getElementById('lpEligibility').innerHTML = buildEligibilityBlock(lvl);

  // Build exam papers
  document.getElementById('lpExamPapers').innerHTML = buildExamPapers(lvl);

  // Build sidebar
  buildSidebar(lvl);

  // Hide topic zone until topic selected
  document.getElementById('topicZone').style.display = 'none';

  // Clear any previous answer
  clearAnswer();
  hideEl('errorEl');
}

function buildLevelBanner(lvl) {
  const gradMap = {
    cadet:  'linear-gradient(135deg, #052e16, #14532d)',
    class4: 'linear-gradient(135deg, #0c1a3a, #1e3a8a)',
    class3: 'linear-gradient(135deg, #2d1a00, #78350f)',
    class1: 'linear-gradient(135deg, #1e0a3a, #4c1d95)',
  };
  return `
  <div class="lp-banner" style="background:${gradMap[lvl.id]||gradMap.cadet};border-color:${lvl.rankColor}44">
    <div class="lp-stage">${lvl.stageNum} — MERCHANT NAVY ENGINEERING</div>
    <div class="lp-title" style="color:${lvl.rankColor}">${lvl.icon} ${lvl.fullTitle}</div>
    <div class="lp-desc">${lvl.subtitle}</div>
    <div class="lp-chips">${lvl.tags.map(t => `<span class="lp-chip">${t}</span>`).join('')}</div>
  </div>`;
}

function buildEligibilityBlock(lvl) {
  return '';
}

function buildExamPapers(lvl) {
  return '';
}

function selectExamPaper(el, title) {
  document.querySelectorAll('.ep-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  // Pre-fill search — user taps Ask AI when ready
  const inp2 = document.getElementById('searchInput');
  if (inp2) inp2.value = `What are the key topics and exam questions for ${title}?`;
  showTopicZone();
}

/* ── SIDEBAR BUILDER ── */
function buildSidebar(lvl) {
  const header = `
  <div class="sb-rank-header">
    <div class="sb-rank-label">${lvl.stageNum}</div>
    <div class="sb-rank-title">
      <span class="sb-rank-pip" style="background:${lvl.rankColor}"></span>
      ${lvl.title}
    </div>
    <div class="sb-rank-desc">${lvl.subtitle.slice(0, 90)}…</div>
  </div>`;

  const sections = Object.entries(lvl.sections).map(([sectionName, topics]) => `
  <div class="sb-section">
    <div class="sb-section-label">${sectionName}</div>
    ${topics.map(t => `
    <button class="sb-topic" id="sbt_${t.id}" onclick="selectTopic('${t.id}','${escJ(t.title)}','${escJ(t.desc)}','${escJ(t.icon)}','${escJ(sectionName)}')">
      <span class="sb-topic-icon">${t.icon}</span>
      <span>${t.title}</span>
      ${APP.studied[t.id] ? '<span class="sb-studied"></span>' : ''}
    </button>`).join('')}
  </div>`).join('');

  document.getElementById('sidebarContent').innerHTML = header + sections;
}

