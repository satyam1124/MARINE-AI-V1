/* MarineIQ — Global Topic Search (keyboard shortcut: /)
   GS_INDEX built from CAREER_LEVELS at init
   Deps: config.js, career-levels.js (CAREER_LEVELS), navigation.js (enterLevel, selectTopic) */

/* ══════════════════════════════════════════════════════════════════
   7. GLOBAL TOPIC SEARCH
   ══════════════════════════════════════════════════════════════════ */
let GS_INDEX = []; // [{id, title, desc, icon, levelId, levelTitle, section}]
let GS_SEL   = 0;

function buildTopicsIndex() {
  GS_INDEX = [];
  CAREER_LEVELS.forEach(lvl => {
    Object.entries(lvl.sections).forEach(([sectionName, topics]) => {
      topics.forEach(t => {
        GS_INDEX.push({
          id: t.id, title: t.title, desc: t.desc, icon: t.icon,
          levelId: lvl.id, levelTitle: lvl.title, sectionName,
          color: lvl.rankColor
        });
      });
    });
  });
}

function openGlobalSearch() {
  const ov = document.getElementById('globalSearch');
  if (!ov) return;
  ov.classList.add('open');
  GS_SEL = 0;
  renderGSResults();
  setTimeout(() => document.getElementById('gsInput')?.focus(), 80);
}

function closeGlobalSearch() {
  document.getElementById('globalSearch')?.classList.remove('open');
}

function renderGSResults() {
  const q   = (document.getElementById('gsInput')?.value || '').trim().toLowerCase();
  const res = document.getElementById('gsResults');
  if (!res) return;

  const matches = q.length < 1
    ? GS_INDEX.slice(0, 12)
    : GS_INDEX.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q)  ||
        t.sectionName.toLowerCase().includes(q)
      ).slice(0, 15);

  if (!matches.length) {
    res.innerHTML = `<div class="gs-empty">No topics found for "<strong>${esc(q)}</strong>"</div>`;
    return;
  }

  res.innerHTML = matches.map((t, i) => {
    const meta = TOPIC_META[t.id] || {};
    return `<div class="gs-result${i === GS_SEL ? ' selected' : ''}" onclick="goToTopic('${t.levelId}','${t.id}')">
      <div class="gs-r-icon">${t.icon}</div>
      <div style="flex:1;min-width:0">
        <div class="gs-r-title">${esc(t.title)}</div>
        <div class="gs-r-sub">${t.levelTitle} · ${t.sectionName}</div>
      </div>
      ${meta.diff ? `<div class="gs-r-badge" style="background:${DIFF_COLOR[meta.diff]}22;border:1px solid ${DIFF_COLOR[meta.diff]}44;color:${DIFF_COLOR[meta.diff]}">${meta.diff}</div>` : ''}
    </div>`;
  }).join('');
}

function handleGSKeys(e) {
  const q = (document.getElementById('gsInput')?.value || '').trim().toLowerCase();
  const matches = q.length < 1
    ? GS_INDEX.slice(0, 12)
    : GS_INDEX.filter(t => t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)).slice(0, 15);

  if (e.key === 'ArrowDown') { e.preventDefault(); GS_SEL = Math.min(GS_SEL + 1, matches.length - 1); renderGSResults(); }
  if (e.key === 'ArrowUp')   { e.preventDefault(); GS_SEL = Math.max(GS_SEL - 1, 0); renderGSResults(); }
  if (e.key === 'Enter' && matches[GS_SEL]) goToTopic(matches[GS_SEL].levelId, matches[GS_SEL].id);
  if (e.key === 'Escape') closeGlobalSearch();
}

function goToTopic(levelId, topicId) {
  closeGlobalSearch();
  const lvl   = CAREER_LEVELS.find(l => l.id === levelId);
  const topic = GS_INDEX.find(t => t.id === topicId);
  if (!lvl || !topic) return;
  enterLevel(levelId);
  setTimeout(() => selectTopic(topicId, topic.title, topic.desc, topic.icon, topic.sectionName), 350);
}

/* keyboard shortcut: / to open global search */
document.addEventListener('keydown', e => {
  if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    e.preventDefault();
    openGlobalSearch();
  }
});

