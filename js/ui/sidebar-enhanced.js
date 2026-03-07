/* MarineIQ — Enhanced Sidebar: Bookmarks, Recents, Progress, Quick Access
   Deps: config.js, navigation.js (buildSidebar), career-levels.js */

/* ══════════════════════════════════════════════════════════════════
   8. ENHANCED SIDEBAR — bookmarks, recents, difficulty, time
   ══════════════════════════════════════════════════════════════════ */
const _buildSidebar0 = buildSidebar;
buildSidebar = function(lvl) {
  _buildSidebar0(lvl);
  // Inject quick-access sections above topic list
  const sbContent = document.getElementById('sidebarContent');
  if (!sbContent) return;

  // Inject bookmarks & recents section
  const quickDiv = document.createElement('div');
  quickDiv.id = 'sbQuickAccess';
  rebuildQuickAccess(lvl);

  // Enhance each topic button with metadata
  sbContent.querySelectorAll('.sb-topic').forEach(btn => {
    const topicId = btn.id.replace('sbt_', '');
    const meta    = TOPIC_META[topicId] || {};
    if (!meta.diff) return;

    // Add diff dot + time + paper
    const metaRow = document.createElement('div');
    metaRow.className = 'sb-topic-meta';
    metaRow.innerHTML = `
      <div class="sb-diff-dot" style="background:${DIFF_COLOR[meta.diff] || '#888'}"></div>
      <span class="sb-diff-label" style="font-size:0.58rem;color:${DIFF_COLOR[meta.diff] || '#888'}">${meta.diff}</span>
      ${meta.time ? `<span class="sb-time-est">· ${meta.time}m</span>` : ''}
      ${meta.paper ? `<span class="sb-paper-tag">· ${meta.paper}</span>` : ''}`;

    // Bookmark button
    const bkBtn = document.createElement('button');
    bkBtn.className = `sb-bk-btn${APP.bookmarks.includes(topicId) ? ' bookmarked' : ''}`;
    bkBtn.title     = 'Bookmark';
    bkBtn.innerHTML = '🔖';
    bkBtn.onclick   = (e) => { e.stopPropagation(); toggleBookmark(topicId, bkBtn); };

    const titleRow = btn.querySelector('.sb-topic-title') || btn;
    // Insert meta row after title
    const existing = btn.querySelector('.sb-topic-meta');
    if (!existing) {
      btn.style.position = 'relative';
      btn.style.paddingRight = '32px';
      btn.appendChild(metaRow);
      btn.appendChild(bkBtn);
    }
  });

  // Enhance section labels with topic count
  sbContent.querySelectorAll('.sb-section').forEach(sec => {
    const label = sec.querySelector('.sb-section-label');
    if (!label) return;
    const count = sec.querySelectorAll('.sb-topic').length;
    const done  = [...sec.querySelectorAll('.sb-topic')].filter(b => APP.studied[b.id.replace('sbt_','')]).length;
    const countBadge = document.createElement('span');
    countBadge.className = 'sb-section-count';
    countBadge.textContent = `${done}/${count}`;
    if (!label.querySelector('.sb-section-count')) label.appendChild(countBadge);
  });
};

function rebuildQuickAccess(lvl) {
  const sbContent = document.getElementById('sidebarContent');
  const existing  = document.getElementById('sbQuickAccess');
  if (existing) existing.remove();

  // Bookmarks for this level
  const lvlTopicIds = Object.values(lvl.sections).flat().map(t => t.id);
  const bksForLevel = APP.bookmarks.filter(id => lvlTopicIds.includes(id));
  const recentsForLevel = APP.recentTopics.filter(id => lvlTopicIds.includes(id)).slice(0, 4);

  if (!bksForLevel.length && !recentsForLevel.length) return;

  const div = document.createElement('div');
  div.id = 'sbQuickAccess';

  if (recentsForLevel.length) {
    div.innerHTML += `<div class="sb-quick-section">
      <div class="sb-quick-title">🕐 Recent</div>
      ${recentsForLevel.map(id => {
        const t = GS_INDEX.find(x => x.id === id);
        if (!t) return '';
        return `<div class="sb-recent-item" onclick="selectTopic('${id}','${esc(t.title)}','${esc(t.desc)}','${t.icon}','${esc(t.sectionName)}')">
          <span class="sb-recent-icon">${t.icon}</span>${esc(t.title)}
        </div>`;
      }).join('')}
    </div>`;
  }

  if (bksForLevel.length) {
    div.innerHTML += `<div class="sb-quick-section">
      <div class="sb-quick-title">🔖 Bookmarks</div>
      ${bksForLevel.map(id => {
        const t = GS_INDEX.find(x => x.id === id);
        if (!t) return '';
        return `<div class="sb-recent-item" onclick="selectTopic('${id}','${esc(t.title)}','${esc(t.desc)}','${t.icon}','${esc(t.sectionName)}')">
          <span class="sb-recent-icon">${t.icon}</span>${esc(t.title)}
        </div>`;
      }).join('')}
    </div>`;
  }

  sbContent.insertBefore(div, sbContent.firstChild);
}

function toggleBookmark(topicId, btn) {
  const idx = APP.bookmarks.indexOf(topicId);
  if (idx === -1) APP.bookmarks.push(topicId);
  else APP.bookmarks.splice(idx, 1);
  saveState('miq_bookmarks', APP.bookmarks);
  if (btn) btn.classList.toggle('bookmarked', APP.bookmarks.includes(topicId));
  if (APP.currentLevel) rebuildQuickAccess(APP.currentLevel);
}

