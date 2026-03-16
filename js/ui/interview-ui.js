/* MarineIQ — Interview Prep UI
   Renders company explorer, CBT exam, results, AI interview
   Deps: interview-prep.js, interview-companies.js, ces-questions.js */

/* ═══════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════ */
function showInterviewPrep() {
  // Hide other pages
  document.getElementById('homeScreen').style.display = 'none';
  var lp = document.getElementById('levelPage');
  if (lp) lp.style.display = 'none';
  
  var page = document.getElementById('interviewPrepPage');
  page.classList.add('active');
  page.style.display = 'block';
  
  showInterviewHome();
}

function hideInterviewPrep() {
  var page = document.getElementById('interviewPrepPage');
  page.classList.remove('active');
  page.style.display = 'none';
  document.getElementById('homeScreen').style.display = '';
}

/* ═══════════════════════════════════════
   HOME / MODE SELECTOR
   ═══════════════════════════════════════ */
function showInterviewHome() {
  var container = document.getElementById('interviewContent');
  
  var html = '';
  html += '<div class="interview-header">';
  html += '<h2>🎯 Interview & CBT Preparation</h2>';
  html += '<p>Practice company-specific CBT exams, mock interviews, and CES tests</p>';
  html += '</div>';
  
  // Mode cards
  html += '<div class="interview-modes">';
  html += '<div class="interview-mode-card" onclick="showCompanyExplorer(\'cbt\')">';
  html += '<span class="mode-icon">📝</span>';
  html += '<div class="mode-title">CBT Exam Simulator</div>';
  html += '<div class="mode-desc">Company-specific timed exams</div>';
  html += '</div>';
  
  html += '<div class="interview-mode-card" onclick="showCESPractice()">';
  html += '<span class="mode-icon">🔬</span>';
  html += '<div class="mode-title">CES Practice</div>';
  html += '<div class="mode-desc">Seagull/CES test modules</div>';
  html += '</div>';
  
  html += '<div class="interview-mode-card" onclick="showCompanyExplorer(\'interview\')">';
  html += '<span class="mode-icon">🎤</span>';
  html += '<div class="mode-title">AI Mock Interview</div>';
  html += '<div class="mode-desc">AI-powered company interviews</div>';
  html += '</div>';
  
  html += '<div class="interview-mode-card" onclick="showInterviewHistory()">';
  html += '<span class="mode-icon">📊</span>';
  html += '<div class="mode-title">Progress & History</div>';
  html += '<div class="mode-desc">Track your improvement</div>';
  html += '</div>';
  html += '</div>';
  
  // Company grid preview
  html += '<div style="margin-top:1rem"><h3 style="color:var(--tx2);font-size:1rem;margin-bottom:1rem;">🏢 Featured Companies</h3></div>';
  html += renderCompanyGrid();
  
  container.innerHTML = html;
}

/* ═══════════════════════════════════════
   COMPANY GRID
   ═══════════════════════════════════════ */
function renderCompanyGrid() {
  var html = '<div class="company-grid">';
  var keys = Object.keys(INTERVIEW_COMPANIES);
  
  keys.forEach(function(key) {
    var c = INTERVIEW_COMPANIES[key];
    html += '<div class="company-card" style="--company-color:' + c.color + '" onclick="showCompanyDetail(\'' + c.id + '\')">';
    html += '<div class="company-card-header">';
    html += '<div class="company-card-icon">' + c.icon + '</div>';
    html += '<div>';
    html += '<div class="company-card-name">' + c.shortName + '</div>';
    html += '<div class="company-card-hq">📍 ' + c.hq + '</div>';
    html += '</div>';
    html += '</div>';
    
    html += '<div class="company-card-meta">';
    html += '<span class="company-card-tag">🚢 ' + c.fleetSize + '</span>';
    html += '</div>';
    
    // Difficulty bar
    html += '<div class="company-card-difficulty">';
    html += '<span>Difficulty:</span>';
    html += '<div class="difficulty-bar">';
    for (var d = 1; d <= 10; d++) {
      html += '<span class="' + (d <= c.difficulty ? 'filled' : '') + '"></span>';
    }
    html += '</div>';
    html += '</div>';
    
    // CBT info
    html += '<div class="company-card-cbt">';
    html += '⏱ ' + c.cbtFormat.duration + ' min | 📋 ' + c.cbtFormat.totalQuestions + ' Qs';
    if (c.cbtFormat.negativeMarking) html += ' | ⚠️ -' + (c.cbtFormat.negativeMarkValue || 0.25);
    html += '</div>';
    
    html += '</div>';
  });
  
  html += '</div>';
  return html;
}

/* ═══════════════════════════════════════
   COMPANY EXPLORER
   ═══════════════════════════════════════ */
function showCompanyExplorer(mode) {
  var container = document.getElementById('interviewContent');
  var html = '<button class="interview-back-btn" onclick="showInterviewHome()">← Back to Interview Prep</button>';
  html += '<div class="interview-header">';
  html += '<h2>' + (mode === 'cbt' ? '📝 Select Company for CBT Exam' : '🎤 Select Company for Mock Interview') + '</h2>';
  html += '<p>Choose a shipping company to practice their specific ' + (mode === 'cbt' ? 'CBT exam format' : 'interview style') + '</p>';
  html += '</div>';
  
  html += '<div class="company-grid">';
  Object.keys(INTERVIEW_COMPANIES).forEach(function(key) {
    var c = INTERVIEW_COMPANIES[key];
    var action = mode === 'cbt' ? 'showCompanyDetail(\'' + c.id + '\')' : 'startAIInterview(\'' + c.id + '\')';
    html += '<div class="company-card" style="--company-color:' + c.color + '" onclick="' + action + '">';
    html += '<div class="company-card-header">';
    html += '<div class="company-card-icon">' + c.icon + '</div>';
    html += '<div>';
    html += '<div class="company-card-name">' + c.shortName + '</div>';
    html += '<div class="company-card-hq">📍 ' + c.hq + '</div>';
    html += '</div></div>';
    html += '<div class="company-card-meta"><span class="company-card-tag">🚢 ' + c.fleetSize + '</span></div>';
    html += '<div class="company-card-difficulty"><span>Difficulty:</span><div class="difficulty-bar">';
    for (var d = 1; d <= 10; d++) {
      html += '<span class="' + (d <= c.difficulty ? 'filled' : '') + '"></span>';
    }
    html += '</div></div>';
    html += '<div class="company-card-cbt">⏱ ' + c.cbtFormat.duration + ' min | 📋 ' + c.cbtFormat.totalQuestions + ' Qs</div>';
    html += '</div>';
  });
  html += '</div>';
  container.innerHTML = html;
}

/* ═══════════════════════════════════════
   COMPANY DETAIL
   ═══════════════════════════════════════ */
function showCompanyDetail(companyId) {
  var c = INTERVIEW_COMPANIES[companyId];
  if (!c) return;
  var ck = c.companyKnowledge || {};
  var cadetYear = (typeof CadetProfile !== 'undefined' && CadetProfile.getYear()) || 2;
  
  var container = document.getElementById('interviewContent');
  var html = '<button class="interview-back-btn" onclick="showInterviewHome()">← Back to Interview Prep</button>';
  
  // ── Helper: Collapsible section wrapper ──
  function collapsible(id, emoji, title, content, defaultOpen, badge) {
    var openClass = defaultOpen ? ' open' : '';
    var s = '<div class="collapsible-section">';
    s += '<div class="collapsible-header' + openClass + '" onclick="toggleCollapsible(\'' + id + '\')">';
    s += '<div class="collapsible-title">' + emoji + ' ' + title;
    if (badge) s += ' <span class="collapsible-badge">' + badge + '</span>';
    s += '</div>';
    s += '<span class="collapsible-toggle">▼</span>';
    s += '</div>';
    s += '<div class="collapsible-body' + openClass + '" id="collapse-' + id + '">' + content + '</div>';
    s += '</div>';
    return s;
  }
  
  // ══ BANNER (always open, not collapsible) ══
  html += '<div class="company-detail-banner" style="--company-color:' + c.color + '">';
  html += '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;">';
  html += '<span style="font-size:2.5rem">' + c.icon + '</span>';
  html += '<div>';
  html += '<div class="company-detail-title">' + c.name + '</div>';
  html += '<div class="company-detail-sub">📍 ' + c.hq + ' | 🚢 ' + c.fleetSize + '</div>';
  if (ck.motto) html += '<div style="color:var(--tx3);font-size:0.85rem;margin-top:0.3rem;font-style:italic">"' + ck.motto + '"</div>';
  html += '</div></div>';
  if (c.website) {
    html += '<div style="margin-top:0.8rem;display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center">';
    html += '<a href="' + c.website + '" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.4rem 1rem;background:' + c.color + ';color:#fff;border-radius:8px;font-size:0.82rem;font-weight:600;text-decoration:none">🌐 Official Website ↗</a>';
    if (ck.officialLinks) {
      Object.keys(ck.officialLinks).forEach(function(lk) {
        if (lk !== 'main') {
          html += '<a href="' + ck.officialLinks[lk] + '" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.3rem;padding:0.35rem 0.8rem;background:var(--bg3);color:var(--tx2);border:1px solid var(--br);border-radius:8px;font-size:0.78rem;text-decoration:none">' + lk.charAt(0).toUpperCase() + lk.slice(1) + ' ↗</a>';
        }
      });
    }
    html += '</div>';
  }
  if (ck.founded) html += '<div style="color:var(--tx2);font-size:0.9rem;margin-top:0.5rem">🏛 Founded: ' + ck.founded + ' — ' + (new Date().getFullYear() - ck.founded) + '+ years of maritime heritage</div>';
  // Campus Recruitment Season Badge (in banner)
  if (c.campusRecruitmentSeason) {
    html += '<div style="margin-top:0.8rem"><span style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.5rem 1rem;background:linear-gradient(135deg,' + c.color + '22,' + c.color + '11);border:1px solid ' + c.color + '44;border-radius:10px;font-size:0.85rem;color:' + c.color + ';font-weight:600">📅 Campus Season: ' + c.campusRecruitmentSeason + '</span></div>';
  }
  html += '</div>';
  
  // ── Cadet Year Info Bar ──
  html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:0.7rem 1rem;background:linear-gradient(135deg,rgba(56,189,248,0.08),rgba(129,140,248,0.08));border:1px solid rgba(56,189,248,0.2);border-radius:12px;margin-bottom:1rem">';
  html += '<div style="display:flex;align-items:center;gap:0.5rem;font-size:0.88rem;color:var(--tx1)">🎓 Showing content for: <strong>Year ' + cadetYear + ' Cadet</strong></div>';
  html += '<button onclick="CadetProfile.showYearSelector()" style="background:none;border:1px solid rgba(56,189,248,0.3);color:#38bdf8;padding:0.3rem 0.8rem;border-radius:8px;font-size:0.78rem;cursor:pointer">Change Year</button>';
  html += '</div>';

  // ══ ACTION BUTTONS (always visible, prominent) ══  
  html += '<div class="company-actions" style="margin-bottom:1.5rem">';
  html += '<button class="company-action-btn primary" onclick="launchCBTExam(\'' + companyId + '\')">📝 Start CBT Exam (Year ' + cadetYear + ')</button>';
  html += '<button class="company-action-btn secondary" onclick="startAIInterview(\'' + companyId + '\')">🎤 Mock Interview</button>';
  html += '</div>';

  // ══ SELECTION PROCESS (open) ══
  var selHtml = '<div class="selection-timeline">';
  c.selectionProcess.forEach(function(step, i) {
    selHtml += '<div class="timeline-step"><div class="timeline-dot" style="background:' + c.color + '">' + (i + 1) + '</div>';
    selHtml += '<div class="timeline-info"><div class="step-name">' + step.stage + '</div><div class="step-desc">' + step.desc + '</div></div></div>';
  });
  selHtml += '</div>';
  html += collapsible('sel-' + companyId, '📋', 'Selection Process', selHtml, true, c.selectionProcess.length + ' steps');

  // ══ CBT FORMAT (open) ══
  var cbtHtml = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">';
  cbtHtml += '<div class="result-card"><div class="result-card-value">' + c.cbtFormat.duration + ' min</div><div class="result-card-label">Duration</div></div>';
  cbtHtml += '<div class="result-card"><div class="result-card-value">' + c.cbtFormat.totalQuestions + '</div><div class="result-card-label">Questions</div></div>';
  cbtHtml += '<div class="result-card"><div class="result-card-value">' + c.cbtFormat.passingScore + '%</div><div class="result-card-label">Passing Score</div></div>';
  cbtHtml += '<div class="result-card"><div class="result-card-value">' + (c.cbtFormat.negativeMarking ? '-' + (c.cbtFormat.negativeMarkValue || 0.25) : 'No') + '</div><div class="result-card-label">Negative Marking</div></div>';
  cbtHtml += '</div>';
  html += collapsible('cbt-' + companyId, '📝', 'CBT Exam Format', cbtHtml, true);

  // ══ YEAR-BY-YEAR GUIDE (open, auto-select user's year) ══
  if (c.yearByYearGuide) {
    var ybHtml = '<div class="year-tabs" id="yearTabs">';
    for (var yi = 1; yi <= 4; yi++) {
      ybHtml += '<button class="year-tab' + (yi === cadetYear || (cadetYear >= 5 && yi === 4) ? ' active' : '') + '" onclick="switchYearTab(' + yi + ',\'' + companyId + '\')">';
      ybHtml += 'Year ' + yi + (yi === cadetYear ? ' ★' : '') + '</button>';
    }
    ybHtml += '</div>';
    var yg = c.yearByYearGuide;
    ['year1','year2','year3','year4'].forEach(function(yr, idx) {
      var y = yg[yr];
      if (!y) return;
      var activeYear = (cadetYear >= 5) ? 4 : cadetYear;
      var isVisible = (idx + 1) === activeYear;
      ybHtml += '<div class="year-content" id="yearContent' + (idx+1) + '" style="' + (!isVisible ? 'display:none' : '') + '">';
      ybHtml += '<div style="background:var(--bg3);border-radius:12px;padding:1rem;border-left:4px solid ' + c.color + '">';
      ybHtml += '<div style="font-weight:700;color:' + c.color + ';font-size:0.95rem;margin-bottom:0.6rem">🎯 Focus: ' + y.focus + '</div>';
      ybHtml += '<div style="font-weight:600;color:var(--tx1);font-size:0.85rem;margin-bottom:0.4rem">📚 Subjects to Cover:</div>';
      ybHtml += '<ul style="color:var(--tx2);font-size:0.83rem;padding-left:1.2rem;line-height:1.7;margin:0 0 0.8rem 0">';
      y.subjects.forEach(function(s) { ybHtml += '<li>' + s + '</li>'; });
      ybHtml += '</ul>';
      ybHtml += '<div style="font-weight:600;color:var(--tx1);font-size:0.85rem;margin-bottom:0.4rem">💡 Tips:</div>';
      ybHtml += '<div class="tips-grid" style="gap:0.5rem">';
      y.tips.forEach(function(t) {
        ybHtml += '<div class="tip-card" style="padding:0.6rem 0.8rem"><div class="tip-card-icon" style="font-size:0.8rem">💡</div><div class="tip-card-text" style="font-size:0.8rem">' + t + '</div></div>';
      });
      ybHtml += '</div></div></div>';
    });
    html += collapsible('yb-' + companyId, '📅', 'Year-by-Year Preparation Guide', ybHtml, true, 'Year ' + cadetYear);
  }

  // ══ CBT DEEP-DIVE (open) ══
  if (c.cbtDetails) {
    var cd = c.cbtDetails;
    var cdHtml = '';
    if (cd.sampleTopics && cd.sampleTopics.length) {
      cdHtml += '<div style="font-weight:600;color:var(--tx1);font-size:0.85rem;margin-bottom:0.4rem">🔥 Hot Topics Frequently Asked:</div>';
      cdHtml += '<div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:1rem">';
      cd.sampleTopics.forEach(function(t) {
        cdHtml += '<span style="display:inline-block;padding:0.3rem 0.7rem;background:var(--bg4);color:var(--tx1);border-radius:20px;font-size:0.78rem;border:1px solid var(--br)">' + t + '</span>';
      });
      cdHtml += '</div>';
    }
    if (cd.yearWiseTopics) {
      cdHtml += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;margin-bottom:1rem">';
      var yearLabels = {year1:'Year 1',year2:'Year 2',year3:'Year 3',year4:'Year 4'};
      var yearEmojis = {year1:'🟢',year2:'🔵',year3:'🟠',year4:'🔴'};
      Object.keys(cd.yearWiseTopics).forEach(function(yr) {
        var isUserYear = yr === ('year' + cadetYear);
        cdHtml += '<div style="background:var(--bg2);border-radius:8px;padding:0.7rem;border-left:3px solid ' + (isUserYear ? '#38bdf8' : c.color) + (isUserYear ? ';box-shadow:0 0 8px rgba(56,189,248,0.2)' : '') + '">';
        cdHtml += '<div style="font-weight:600;color:var(--tx1);font-size:0.82rem;margin-bottom:0.3rem">' + (yearEmojis[yr]||'') + ' ' + (yearLabels[yr]||yr) + (isUserYear ? ' ← You' : '') + '</div>';
        cdHtml += '<ul style="color:var(--tx2);font-size:0.78rem;padding-left:1rem;margin:0;line-height:1.6">';
        cd.yearWiseTopics[yr].forEach(function(t) { cdHtml += '<li>' + t + '</li>'; });
        cdHtml += '</ul></div>';
      });
      cdHtml += '</div>';
    }
    if (cd.commonMistakes && cd.commonMistakes.length) {
      cdHtml += '<div style="font-weight:600;color:var(--tx1);font-size:0.85rem;margin-bottom:0.4rem">⚠️ Common Mistakes to Avoid:</div>';
      cdHtml += '<ul style="color:var(--tx2);font-size:0.83rem;padding-left:1.2rem;line-height:1.7;margin:0">';
      cd.commonMistakes.forEach(function(m) { cdHtml += '<li style="margin-bottom:0.3rem">' + m + '</li>'; });
      cdHtml += '</ul>';
    }
    html += collapsible('cbd-' + companyId, '📝', 'CBT Deep-Dive: Year-Wise Topics', cdHtml, true);
  }

  // ══ PSYCHOMETRIC DETAILS (collapsed) ══
  if (c.psychometricDetails) {
    var ps = c.psychometricDetails;
    var psHtml = '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.8rem;margin-bottom:1rem">';
    psHtml += '<div class="result-card" style="text-align:center"><div class="result-card-value">' + ps.testName.split(' ')[0] + '</div><div class="result-card-label">' + ps.testName + '</div></div>';
    psHtml += '<div class="result-card" style="text-align:center"><div class="result-card-value">' + ps.duration + ' min</div><div class="result-card-label">Duration</div></div>';
    psHtml += '<div class="result-card" style="text-align:center"><div class="result-card-value">' + ps.totalQuestions + '</div><div class="result-card-label">Questions</div></div>';
    psHtml += '</div>';
    psHtml += '<div style="color:var(--tx2);font-size:0.85rem;margin-bottom:0.8rem"><strong>Format:</strong> ' + ps.format + '</div>';
    psHtml += '<div style="font-weight:600;color:var(--tx1);font-size:0.85rem;margin-bottom:0.4rem">Traits Assessed:</div>';
    psHtml += '<div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.8rem">';
    ps.traits.forEach(function(tr) {
      psHtml += '<span style="display:inline-block;padding:0.3rem 0.7rem;background:' + c.color + '18;color:' + c.color + ';border-radius:20px;font-size:0.78rem;font-weight:500">' + tr + '</span>';
    });
    psHtml += '</div>';
    psHtml += '<div style="font-weight:600;color:var(--tx1);font-size:0.85rem;margin-bottom:0.4rem">Preparation Tips:</div>';
    psHtml += '<div class="tips-grid" style="gap:0.5rem">';
    ps.tips.forEach(function(t) {
      psHtml += '<div class="tip-card" style="padding:0.5rem 0.7rem"><div class="tip-card-icon" style="font-size:0.8rem">🧠</div><div class="tip-card-text" style="font-size:0.8rem">' + t + '</div></div>';
    });
    psHtml += '</div>';
    html += collapsible('psy-' + companyId, '🧠', 'Psychometric Test Details', psHtml, false, ps.duration + ' min');
  }

  // ══ INTERVIEW TIPS (open) ══
  var tipHtml = '<div class="tips-grid">';
  c.interviewStyle.tips.forEach(function(tip) {
    tipHtml += '<div class="tip-card"><div class="tip-card-icon">💡</div><div class="tip-card-text">' + tip + '</div></div>';
  });
  tipHtml += '</div>';
  html += collapsible('tips-' + companyId, '💡', 'Interview Tips', tipHtml, true);

  // ══ IMPRESS INTERVIEWER (collapsed) ══
  if (ck.impressInterviewer && ck.impressInterviewer.length) {
    var impHtml = '<div class="tips-grid">';
    ck.impressInterviewer.forEach(function(tip) {
      impHtml += '<div class="tip-card"><div class="tip-card-icon">🎯</div><div class="tip-card-text">' + tip + '</div></div>';
    });
    impHtml += '</div>';
    html += collapsible('imp-' + companyId, '🎯', 'How to Impress the Interviewer', impHtml, false, ck.impressInterviewer.length + ' tips');
  }
  
  // ══ COMPANY HISTORY (collapsed) ══
  if (ck.history) {
    var histHtml = '<p style="color:var(--tx2);font-size:0.9rem;line-height:1.6">' + ck.history + '</p>';
    html += collapsible('hist-' + companyId, '📖', 'Company History', histHtml, false);
  }
  
  // ══ KEY FACTS (collapsed) ══
  if (ck.keyFacts && ck.keyFacts.length) {
    var kfHtml = '<ul style="color:var(--tx2);font-size:0.9rem;padding-left:1.2rem;line-height:1.8;margin:0">';
    ck.keyFacts.forEach(function(f) { kfHtml += '<li>' + f + '</li>'; });
    kfHtml += '</ul>';
    html += collapsible('kf-' + companyId, '⭐', 'Key Facts to Know', kfHtml, false, ck.keyFacts.length + ' facts');
  }
  
  // ══ INNOVATION & SUSTAINABILITY (collapsed) ══
  if (ck.innovation || ck.sustainability) {
    var isHtml = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">';
    if (ck.innovation) {
      isHtml += '<div class="result-card" style="text-align:left;padding:1rem"><div style="font-weight:700;color:var(--tx1);margin-bottom:0.5rem">🔧 Innovation</div>';
      isHtml += '<div style="color:var(--tx2);font-size:0.85rem;line-height:1.6">' + ck.innovation + '</div></div>';
    }
    if (ck.sustainability) {
      isHtml += '<div class="result-card" style="text-align:left;padding:1rem"><div style="font-weight:700;color:var(--tx1);margin-bottom:0.5rem">🌱 Sustainability</div>';
      isHtml += '<div style="color:var(--tx2);font-size:0.85rem;line-height:1.6">' + ck.sustainability + '</div></div>';
    }
    isHtml += '</div>';
    html += collapsible('is-' + companyId, '🔧', 'Innovation & Sustainability', isHtml, false);
  }
  
  // ══ SUBSIDIARIES (collapsed) ══
  if (ck.subsidiaries && ck.subsidiaries.length) {
    var subHtml = '<div style="display:grid;gap:0.6rem">';
    ck.subsidiaries.forEach(function(sub) {
      subHtml += '<div style="background:var(--bg3);border-radius:10px;padding:0.8rem 1rem;border-left:3px solid ' + c.color + '">';
      subHtml += '<div style="font-weight:600;color:var(--tx1);font-size:0.88rem">' + sub.name + '</div>';
      subHtml += '<div style="color:var(--tx3);font-size:0.78rem;margin-top:0.15rem">📍 ' + sub.location + '</div>';
      subHtml += '<div style="color:var(--tx2);font-size:0.82rem;margin-top:0.3rem">' + sub.role + '</div>';
      subHtml += '</div>';
    });
    subHtml += '</div>';
    html += collapsible('sub-' + companyId, '🏢', 'Offices & Subsidiaries', subHtml, false, ck.subsidiaries.length + ' locations');
  }

  // ══ NOTABLE VESSELS (collapsed) ══
  if (ck.namedVessels && ck.namedVessels.length) {
    var vesHtml = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:0.8rem">';
    ck.namedVessels.forEach(function(v) {
      vesHtml += '<div class="result-card" style="text-align:left;padding:0.8rem 1rem;border-top:3px solid ' + c.color + '">';
      vesHtml += '<div style="font-weight:700;color:var(--tx1);font-size:0.9rem">' + v.name + '</div>';
      vesHtml += '<div style="color:var(--tx3);font-size:0.78rem;margin:0.2rem 0">' + v.type + '</div>';
      vesHtml += '<div style="color:var(--tx2);font-size:0.82rem;line-height:1.5">' + v.highlight + '</div>';
      vesHtml += '</div>';
    });
    vesHtml += '</div>';
    html += collapsible('ves-' + companyId, '🚢', 'Notable Vessels', vesHtml, false, ck.namedVessels.length + ' vessels');
  }
  
  // ══ PAST HISTORY (if exists) ══
  var hist = InterviewPrep.getCompanyHistory(companyId);
  if (hist.length) {
    var pastHtml = '';
    hist.slice(-5).reverse().forEach(function(h) {
      pastHtml += '<div class="history-card">';
      pastHtml += '<div class="history-score-badge ' + (h.passed ? 'passed' : 'failed') + '">' + h.score + '%</div>';
      pastHtml += '<div class="history-info">';
      pastHtml += '<div class="history-company">' + (h.passed ? '✅ Passed' : '❌ Failed') + ' — ' + h.correct + '/' + h.total + '</div>';
      pastHtml += '<div class="history-date">' + new Date(h.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + '</div>';
      pastHtml += '</div></div>';
    });
    html += collapsible('past-' + companyId, '📊', 'Your Past Attempts', pastHtml, true, hist.length + ' attempts');
  }
  
  container.innerHTML = html;
}

/* ═══════════════════════════════════════
   COLLAPSIBLE TOGGLE
   ═══════════════════════════════════════ */
function toggleCollapsible(id) {
  var body = document.getElementById('collapse-' + id);
  if (!body) return;
  var header = body.previousElementSibling;
  var isOpen = body.classList.contains('open');
  
  if (isOpen) {
    body.classList.remove('open');
    if (header) header.classList.remove('open');
  } else {
    body.classList.add('open');
    if (header) header.classList.add('open');
  }
}

/* ═══════════════════════════════════════
   CBT EXAM
   ═══════════════════════════════════════ */
// Year-by-Year tab switcher
function switchYearTab(year, companyId) {
  // Hide all year content panels
  for (var i = 1; i <= 4; i++) {
    var el = document.getElementById('yearContent' + i);
    if (el) el.style.display = 'none';
  }
  // Show selected year
  var sel = document.getElementById('yearContent' + year);
  if (sel) sel.style.display = 'block';
  // Update tab active states
  var tabs = document.querySelectorAll('.year-tab');
  tabs.forEach(function(tab, idx) {
    tab.classList.toggle('active', idx === year - 1);
  });
}

function launchCBTExam(companyId) {
  var c = INTERVIEW_COMPANIES[companyId];
  if (!c) return;
  var cadetYear = (typeof CadetProfile !== 'undefined' && CadetProfile.getYear()) || 2;
  
  // Year confirmation step
  var yearDescriptions = {
    1: 'Class 11 Maths, Physics, General Aptitude & English',
    2: 'Class 12 PCM, Engineering Basics, Aptitude & English',
    3: 'Marine Engine Fundamentals, Auxiliary Machinery, Safety Regs',
    4: 'Advanced Marine Systems, Troubleshooting, MEP Procedures',
    5: 'Situational Questions, Company-Specific, All Marine Topics'
  };
  var yearEmojis = { 1: '🟢', 2: '🔵', 3: '🟠', 4: '🔴', 5: '⚓' };
  var yearLabels = { 1: '1st Year', 2: '2nd Year', 3: '3rd Year', 4: '4th Year', 5: 'Post-Training' };
  
  var container = document.getElementById('interviewContent');
  var html = '<button class="interview-back-btn" onclick="showCompanyDetail(\'' + companyId + '\')">← Back to ' + c.shortName + '</button>';
  html += '<div style="max-width:500px;margin:2rem auto;text-align:center">';
  html += '<div style="font-size:3rem;margin-bottom:1rem">' + c.icon + '</div>';
  html += '<h2 style="color:var(--tx1);font-size:1.3rem;margin-bottom:0.5rem">' + c.shortName + ' CBT Exam</h2>';
  html += '<div style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.4rem 1rem;background:linear-gradient(135deg,rgba(56,189,248,0.12),rgba(129,140,248,0.12));border:1px solid rgba(56,189,248,0.3);border-radius:20px;font-size:0.88rem;color:#38bdf8;font-weight:600;margin-bottom:1.5rem">' + yearEmojis[cadetYear] + ' ' + yearLabels[cadetYear] + ' Level</div>';
  
  html += '<div style="background:var(--bg3,rgba(15,23,42,0.5));border:1px solid var(--br,rgba(148,163,184,0.1));border-radius:14px;padding:1.2rem;text-align:left;margin-bottom:1.5rem">';
  html += '<div style="font-weight:600;color:var(--tx1);font-size:0.9rem;margin-bottom:0.5rem">📋 Exam Details</div>';
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-bottom:1rem">';
  html += '<div style="color:var(--tx3);font-size:0.82rem">Duration: <strong style="color:var(--tx1)">' + c.cbtFormat.duration + ' min</strong></div>';
  html += '<div style="color:var(--tx3);font-size:0.82rem">Questions: <strong style="color:var(--tx1)">' + c.cbtFormat.totalQuestions + '</strong></div>';
  html += '<div style="color:var(--tx3);font-size:0.82rem">Passing: <strong style="color:var(--tx1)">' + c.cbtFormat.passingScore + '%</strong></div>';
  html += '<div style="color:var(--tx3);font-size:0.82rem">Negative: <strong style="color:var(--tx1)">' + (c.cbtFormat.negativeMarking ? 'Yes (-' + (c.cbtFormat.negativeMarkValue || 0.25) + ')' : 'No') + '</strong></div>';
  html += '</div>';
  html += '<div style="font-weight:600;color:var(--tx1);font-size:0.9rem;margin-bottom:0.4rem">📚 Topics for Your Year</div>';
  html += '<div style="color:var(--tx2);font-size:0.85rem;line-height:1.6">' + yearDescriptions[cadetYear] + '</div>';
  html += '</div>';
  
  html += '<button class="company-action-btn primary" onclick="startCBTNow(\'' + companyId + '\')" style="width:100%;padding:0.9rem;font-size:1rem">🚀 Start Exam Now</button>';
  html += '<button onclick="CadetProfile.showYearSelector()" style="background:none;border:none;color:var(--tx3);font-size:0.82rem;margin-top:0.8rem;cursor:pointer;text-decoration:underline">Wrong year? Change it here</button>';
  html += '</div>';
  
  container.innerHTML = html;
}

function startCBTNow(companyId) {
  var examState = InterviewPrep.startCBTExam(companyId);
  if (!examState) return;
  renderCBTExam();
}

function renderCBTExam() {
  var s = InterviewPrep.state;
  var q = s.questions[s.currentIndex];
  var c = s.currentCompany;
  
  var container = document.getElementById('interviewContent');
  var html = '';
  
  // Topbar
  html += '<div class="cbt-topbar">';
  var cadetYearLabel = (typeof CadetProfile !== 'undefined' && CadetProfile.getYear()) ? ' — Year ' + CadetProfile.getYear() : '';
  html += '<div class="cbt-exam-title">' + (c ? c.icon + ' ' + c.shortName + ' CBT' + cadetYearLabel : '🔬 CES Practice') + '</div>';
  html += '<div id="cbtTimer" class="cbt-timer">--:--</div>';
  html += '<div class="cbt-progress-text">Q' + (s.currentIndex + 1) + ' of ' + s.questions.length + '</div>';
  html += '</div>';
  
  // Progress Bar
  var pct = ((s.currentIndex + 1) / s.questions.length * 100).toFixed(0);
  html += '<div class="cbt-progress-bar"><div class="cbt-progress-fill" style="width:' + pct + '%"></div></div>';
  
  // Question Navigator
  html += '<div class="cbt-question-nav">';
  html += '<div class="cbt-question-nav-title">Question Navigator</div>';
  html += '<div class="cbt-question-nav-grid">';
  for (var i = 0; i < s.questions.length; i++) {
    var cls = 'cbt-q-dot';
    if (i === s.currentIndex) cls += ' current';
    if (s.answers[i] !== undefined) cls += ' answered';
    if (s.flagged[i]) cls += ' flagged';
    html += '<div class="' + cls + '" onclick="navigateCBTQuestion(' + i + ')">' + (i + 1) + '</div>';
  }
  html += '</div>';
  html += '<div class="cbt-nav-legend">';
  html += '<div class="cbt-legend-item"><div class="cbt-legend-dot current"></div> Current</div>';
  html += '<div class="cbt-legend-item"><div class="cbt-legend-dot answered"></div> Answered</div>';
  html += '<div class="cbt-legend-item"><div class="cbt-legend-dot flagged"></div> Flagged</div>';
  html += '<div class="cbt-legend-item"><div class="cbt-legend-dot unanswered"></div> Unanswered</div>';
  html += '</div></div>';
  
  // Question Card
  if (q) {
    html += '<div class="cbt-question-card">';
    html += '<div class="cbt-question-number">Question ' + (s.currentIndex + 1) + '</div>';
    html += '<div class="cbt-question-category">' + (q.category || 'General') + '</div>';
    html += '<div class="cbt-question-text">' + q.question + '</div>';
    
    html += '<div class="cbt-options">';
    var letters = ['A', 'B', 'C', 'D'];
    q.options.forEach(function(opt, oi) {
      var cls = 'cbt-option';
      if (s.answers[s.currentIndex] === oi) cls += ' selected';
      html += '<div class="' + cls + '" onclick="selectCBTOption(' + oi + ')">';
      html += '<div class="cbt-option-letter">' + letters[oi] + '</div>';
      html += '<div class="cbt-option-text">' + opt + '</div>';
      html += '</div>';
    });
    html += '</div></div>';
  }
  
  // Nav Buttons
  html += '<div class="cbt-nav-buttons">';
  html += '<button class="cbt-nav-btn" onclick="navigateCBTQuestion(' + Math.max(0, s.currentIndex - 1) + ')" ' + (s.currentIndex === 0 ? 'disabled' : '') + '>← Previous</button>';
  html += '<button class="cbt-nav-btn flag ' + (s.flagged[s.currentIndex] ? 'flagged' : '') + '" onclick="toggleCBTFlag()">🚩 Flag</button>';
  if (s.currentIndex < s.questions.length - 1) {
    html += '<button class="cbt-nav-btn" onclick="navigateCBTQuestion(' + (s.currentIndex + 1) + ')">Next →</button>';
  } else {
    html += '<button class="cbt-nav-btn finish" onclick="finishCBTExam()">✅ Finish Exam</button>';
  }
  html += '</div>';
  
  container.innerHTML = html;
  
  // Start timer display
  updateTimerDisplay();
}

function updateTimerDisplay() {
  var timerEl = document.getElementById('cbtTimer');
  if (timerEl && InterviewPrep.state.timeRemaining >= 0) {
    var min = Math.floor(InterviewPrep.state.timeRemaining / 60);
    var sec = InterviewPrep.state.timeRemaining % 60;
    timerEl.textContent = String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
  }
}

function selectCBTOption(optIndex) {
  InterviewPrep.answerQuestion(InterviewPrep.state.currentIndex, optIndex);
  renderCBTExam();
}

function navigateCBTQuestion(index) {
  InterviewPrep.goToQuestion(index);
  renderCBTExam();
}

function toggleCBTFlag() {
  InterviewPrep.toggleFlag(InterviewPrep.state.currentIndex);
  renderCBTExam();
}

function finishCBTExam() {
  var s = InterviewPrep.state;
  var unanswered = s.questions.length - Object.keys(s.answers).length;
  
  if (unanswered > 0) {
    if (!confirm('You have ' + unanswered + ' unanswered question(s). Are you sure you want to finish?')) {
      return;
    }
  }
  
  var score = InterviewPrep.finishExam();
  renderCBTResults(score);
}

/* ═══════════════════════════════════════
   RESULTS DASHBOARD
   ═══════════════════════════════════════ */
function renderCBTResults(score) {
  var s = InterviewPrep.state;
  var container = document.getElementById('interviewContent');
  var html = '<button class="interview-back-btn" onclick="showInterviewHome()">← Back to Interview Prep</button>';
  
  // Score Banner
  html += '<div class="results-banner">';
  html += '<div class="results-status">' + (score.passed ? '🎉' : '📚') + '</div>';
  html += '<div class="results-score ' + (score.passed ? 'passed' : 'failed') + '">' + score.percentage + '%</div>';
  html += '<div class="results-label">' + (score.passed ? 'Congratulations! You Passed!' : 'Keep Practicing — You\'ll Get There!') + '</div>';
  html += '<div class="results-label" style="margin-top:0.3rem">' + (s.currentCompany ? s.currentCompany.shortName : 'CES') + ' CBT | Pass: ' + score.passingScore + '%</div>';
  html += '</div>';
  
  // Score Cards
  html += '<div class="results-cards">';
  html += '<div class="result-card"><div class="result-card-value green">' + score.correct + '</div><div class="result-card-label">Correct</div></div>';
  html += '<div class="result-card"><div class="result-card-value red">' + score.wrong + '</div><div class="result-card-label">Wrong</div></div>';
  html += '<div class="result-card"><div class="result-card-value yellow">' + score.unanswered + '</div><div class="result-card-label">Unanswered</div></div>';
  html += '<div class="result-card"><div class="result-card-value">' + formatTime(score.timeTaken) + '</div><div class="result-card-label">Time Taken</div></div>';
  if (score.negativeMarking) {
    html += '<div class="result-card"><div class="result-card-value">' + score.rawScore.toFixed(1) + '</div><div class="result-card-label">Net Score (after -ve)</div></div>';
  }
  html += '<div class="result-card"><div class="result-card-value">' + score.avgTimePerQuestion + 's</div><div class="result-card-label">Avg Time/Question</div></div>';
  html += '</div>';
  
  // Category Breakdown
  html += '<div class="category-breakdown"><h3>📊 Category-wise Performance</h3>';
  var cats = score.categoryScores;
  Object.keys(cats).sort().forEach(function(cat) {
    var cs = cats[cat];
    var catPct = Math.round((cs.correct / cs.total) * 100);
    var barClass = catPct < 40 ? 'low' : (catPct < 70 ? 'medium' : 'high');
    
    html += '<div class="category-row">';
    html += '<div class="category-name">' + cat + '</div>';
    html += '<div class="category-bar-wrap"><div class="category-bar-fill ' + barClass + '" style="width:' + catPct + '%"></div></div>';
    html += '<div class="category-score">' + cs.correct + '/' + cs.total + '</div>';
    html += '</div>';
  });
  html += '</div>';
  
  // Question Review
  html += '<h3 style="color:var(--tx1);font-size:1rem;margin-bottom:1rem;">📖 Question Review</h3>';
  s.questions.forEach(function(q, i) {
    var userAns = s.answers[i];
    var isCorrect = userAns === q.correct;
    var letters = ['A', 'B', 'C', 'D'];
    
    html += '<div class="question-review">';
    html += '<div class="cbt-question-number" style="color:' + (isCorrect ? '#22c55e' : (userAns !== undefined ? '#ef4444' : '#f59e0b')) + '">';
    html += (isCorrect ? '✅' : (userAns !== undefined ? '❌' : '⏭')) + ' Question ' + (i + 1) + ' — ' + q.category;
    html += '</div>';
    html += '<div class="cbt-question-text" style="font-size:0.95rem">' + q.question + '</div>';
    
    html += '<div class="cbt-options">';
    q.options.forEach(function(opt, oi) {
      var cls = 'cbt-option';
      if (oi === q.correct) cls += ' correct';
      if (oi === userAns && oi !== q.correct) cls += ' wrong';
      html += '<div class="' + cls + '" style="cursor:default">';
      html += '<div class="cbt-option-letter">' + letters[oi] + '</div>';
      html += '<div class="cbt-option-text">' + opt + '</div>';
      html += '</div>';
    });
    html += '</div>';
    
    html += '<div class="review-explanation">💡 ' + q.explanation + '</div>';
    html += '</div>';
  });
  
  // Retry button
  html += '<div class="company-actions" style="margin-top:1.5rem">';
  if (s.currentCompany) {
    html += '<button class="company-action-btn primary" onclick="launchCBTExam(\'' + s.currentCompany.id + '\')">🔄 Retry Exam</button>';
  }
  html += '<button class="company-action-btn secondary" onclick="showInterviewHome()">🏠 Back to Home</button>';
  html += '</div>';
  
  container.innerHTML = html;
}

function formatTime(seconds) {
  var m = Math.floor(seconds / 60);
  var s = seconds % 60;
  return m + 'm ' + s + 's';
}

/* ═══════════════════════════════════════
   CES PRACTICE
   ═══════════════════════════════════════ */
function showCESPractice() {
  var container = document.getElementById('interviewContent');
  var cats = getCESQuestionsByCategory();
  var catNames = Object.keys(cats).sort();
  
  var html = '<button class="interview-back-btn" onclick="showInterviewHome()">← Back to Interview Prep</button>';
  html += '<div class="interview-header">';
  html += '<h2>🔬 CES / Seagull Practice Test</h2>';
  html += '<p>Select categories and start practicing — 60 minutes, 65 questions</p>';
  html += '</div>';
  
  html += '<h3 style="color:var(--tx1);font-size:1rem;margin-bottom:0.8rem;">Select Categories (or leave all for full test)</h3>';
  html += '<div class="ces-categories" id="cesCatPicker">';
  catNames.forEach(function(cat) {
    html += '<div class="ces-cat-chip" onclick="toggleCESCategory(this, \'' + cat + '\')" data-cat="' + cat + '">';
    html += cat + ' (' + cats[cat].length + ')';
    html += '</div>';
  });
  html += '</div>';
  
  html += '<div class="company-actions">';
  html += '<button class="company-action-btn primary" onclick="startCESExam()">🚀 Start CES Test</button>';
  html += '</div>';
  
  // Stats
  html += '<div style="margin-top:1.5rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1rem;">';
  html += '<div class="result-card"><div class="result-card-value">' + CES_QUESTIONS.length + '</div><div class="result-card-label">Total Questions</div></div>';
  html += '<div class="result-card"><div class="result-card-value">' + catNames.length + '</div><div class="result-card-label">Categories</div></div>';
  html += '<div class="result-card"><div class="result-card-value">60 min</div><div class="result-card-label">Time Limit</div></div>';
  html += '</div>';
  
  container.innerHTML = html;
}

var selectedCESCategories = [];

function toggleCESCategory(el, cat) {
  var idx = selectedCESCategories.indexOf(cat);
  if (idx === -1) {
    selectedCESCategories.push(cat);
    el.classList.add('selected');
  } else {
    selectedCESCategories.splice(idx, 1);
    el.classList.remove('selected');
  }
}

function startCESExam() {
  InterviewPrep.startCESExam(selectedCESCategories.length ? selectedCESCategories : null, 65);
  selectedCESCategories = [];
  renderCBTExam();
}

/* ═══════════════════════════════════════
   AI MOCK INTERVIEW
   ═══════════════════════════════════════ */
function startAIInterview(companyId) {
  var c = INTERVIEW_COMPANIES[companyId];
  if (!c) return;
  if (!APP.apiKey) { openApiModal(); return; }
  
  var container = document.getElementById('interviewContent');
  var html = '<button class="interview-back-btn" onclick="showInterviewHome()">← Back to Interview Prep</button>';
  
  // Chat Header
  html += '<div class="interview-chat-header" style="--company-color:' + c.color + '">';
  html += '<div class="interviewer-avatar">' + c.icon + '</div>';
  html += '<div class="interviewer-info">';
  html += '<div class="interviewer-name">' + c.shortName + ' Interviewer</div>';
  html += '<div class="interviewer-role">Technical Interview Panel</div>';
  html += '</div>';
  html += '<button class="cbt-nav-btn" onclick="showInterviewHome()" style="margin-left:auto">End Interview</button>';
  html += '</div>';
  
  // Messages area
  html += '<div class="interview-messages" id="interviewMessages">';
  html += '<div class="interview-msg interviewer">Welcome to ' + c.shortName + '! I\'m your interviewer today. Let\'s begin with your introduction — please tell me about yourself and why you want to join ' + c.shortName + '.</div>';
  html += '</div>';
  
  // Input
  html += '<div class="interview-input-wrap">';
  html += '<input type="text" class="interview-input" id="interviewInput" placeholder="Type your answer..." onkeydown="if(event.key===\'Enter\')sendInterviewAnswer(\'' + companyId + '\')">';
  html += '<button class="interview-send-btn" onclick="sendInterviewAnswer(\'' + companyId + '\')">Send ➤</button>';
  html += '</div>';
  
  container.innerHTML = html;
  
  // Store interview context
  window._interviewContext = {
    companyId: companyId,
    messages: [
      { role: 'system', content: InterviewPrep.buildInterviewPrompt(companyId, 'technical') },
      { role: 'assistant', content: 'Welcome to ' + c.shortName + '! I\'m your interviewer today. Let\'s begin with your introduction — please tell me about yourself and why you want to join ' + c.shortName + '.' }
    ]
  };
}

async function sendInterviewAnswer(companyId) {
  var input = document.getElementById('interviewInput');
  var answer = input.value.trim();
  if (!answer) return;
  
  input.value = '';
  var msgs = document.getElementById('interviewMessages');
  
  // Show user message
  msgs.innerHTML += '<div class="interview-msg candidate">' + answer + '</div>';
  msgs.innerHTML += '<div class="interview-msg interviewer" id="interviewTyping" style="opacity:0.5">Evaluating your answer...</div>';
  msgs.scrollTop = msgs.scrollHeight;
  
  // Add to context
  window._interviewContext.messages.push({ role: 'user', content: answer });
  
  // Call AI
  try {
    var response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APP.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: APP.model || 'claude-sonnet-4-20250514',
        max_tokens: 500,
        messages: window._interviewContext.messages.filter(function(m) { return m.role !== 'system'; }),
        system: window._interviewContext.messages[0].content
      })
    });
    
    var data = await response.json();
    var reply = data.content && data.content[0] ? data.content[0].text : 'I appreciate your answer. Let me ask you another question...';
    
    // Replace typing indicator
    var typing = document.getElementById('interviewTyping');
    if (typing) {
      typing.innerHTML = reply;
      typing.style.opacity = '1';
      typing.removeAttribute('id');
    }
    
    window._interviewContext.messages.push({ role: 'assistant', content: reply });
    msgs.scrollTop = msgs.scrollHeight;
  } catch(e) {
    var typing2 = document.getElementById('interviewTyping');
    if (typing2) {
      typing2.innerHTML = '⚠️ Could not connect to AI. Please check your API key.';
      typing2.style.opacity = '1';
    }
  }
}

/* ═══════════════════════════════════════
   HISTORY DASHBOARD
   ═══════════════════════════════════════ */
function showInterviewHistory() {
  var container = document.getElementById('interviewContent');
  var history = InterviewPrep.getHistory();
  
  var html = '<button class="interview-back-btn" onclick="showInterviewHome()">← Back to Interview Prep</button>';
  html += '<div class="interview-header">';
  html += '<h2>📊 Progress & History</h2>';
  html += '<p>Track your CBT exam performance over time</p>';
  html += '</div>';
  
  if (!history.length) {
    html += '<div style="text-align:center;padding:3rem;color:var(--tx3);">';
    html += '<div style="font-size:3rem;margin-bottom:1rem;">📋</div>';
    html += '<p>No exam history yet. Take a CBT exam to see your progress!</p>';
    html += '</div>';
    container.innerHTML = html;
    return;
  }
  
  // Stats overview
  var totalExams = history.length;
  var passedExams = history.filter(function(h) { return h.passed; }).length;
  var avgScore = Math.round(history.reduce(function(sum, h) { return sum + h.score; }, 0) / totalExams);
  var bestScore = Math.max.apply(null, history.map(function(h) { return h.score; }));
  
  html += '<div class="results-cards">';
  html += '<div class="result-card"><div class="result-card-value">' + totalExams + '</div><div class="result-card-label">Total Exams</div></div>';
  html += '<div class="result-card"><div class="result-card-value green">' + passedExams + '</div><div class="result-card-label">Passed</div></div>';
  html += '<div class="result-card"><div class="result-card-value">' + avgScore + '%</div><div class="result-card-label">Average Score</div></div>';
  html += '<div class="result-card"><div class="result-card-value green">' + bestScore + '%</div><div class="result-card-label">Best Score</div></div>';
  html += '</div>';
  
  // History list
  html += '<h3 style="color:var(--tx1);font-size:1rem;margin-bottom:0.8rem;">Recent Exams</h3>';
  history.slice().reverse().forEach(function(h) {
    html += '<div class="history-card">';
    html += '<div class="history-score-badge ' + (h.passed ? 'passed' : 'failed') + '">' + h.score + '%</div>';
    html += '<div class="history-info">';
    html += '<div class="history-company">' + h.companyName + ' — ' + h.correct + '/' + h.total + ' correct</div>';
    html += '<div class="history-date">' + new Date(h.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' | ' + formatTime(h.timeTaken) + '</div>';
    html += '</div></div>';
  });
  
  container.innerHTML = html;
}
