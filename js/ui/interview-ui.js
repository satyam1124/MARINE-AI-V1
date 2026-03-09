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
  
  var container = document.getElementById('interviewContent');
  var html = '<button class="interview-back-btn" onclick="showInterviewHome()">← Back to Interview Prep</button>';
  
  // Banner
  html += '<div class="company-detail-banner" style="--company-color:' + c.color + '">';
  html += '<div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;">';
  html += '<span style="font-size:2.5rem">' + c.icon + '</span>';
  html += '<div>';
  html += '<div class="company-detail-title">' + c.name + '</div>';
  html += '<div class="company-detail-sub">📍 ' + c.hq + ' | 🚢 ' + c.fleetSize + ' | 🌐 ' + c.vesselTypes.join(', ') + '</div>';
  html += '</div></div>';
  html += '<p style="color:var(--tx2);font-size:0.9rem;margin-bottom:1rem;">' + c.reputation + '</p>';
  
  // Selection Process Timeline
  html += '<h3 style="color:var(--tx1);font-size:1rem;margin-bottom:0.8rem;">📋 Selection Process</h3>';
  html += '<div class="selection-timeline">';
  c.selectionProcess.forEach(function(step, i) {
    html += '<div class="timeline-step">';
    html += '<div class="timeline-dot" style="background:' + c.color + '">' + (i + 1) + '</div>';
    html += '<div class="timeline-info">';
    html += '<div class="step-name">' + step.stage + '</div>';
    html += '<div class="step-desc">' + step.desc + '</div>';
    html += '</div></div>';
  });
  html += '</div>';
  html += '</div>';
  
  // CBT Format Card
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">';
  html += '<div class="result-card">';
  html += '<div class="result-card-value">' + c.cbtFormat.duration + ' min</div>';
  html += '<div class="result-card-label">Exam Duration</div>';
  html += '</div>';
  html += '<div class="result-card">';
  html += '<div class="result-card-value">' + c.cbtFormat.totalQuestions + '</div>';
  html += '<div class="result-card-label">Total Questions</div>';
  html += '</div>';
  html += '<div class="result-card">';
  html += '<div class="result-card-value">' + c.cbtFormat.passingScore + '%</div>';
  html += '<div class="result-card-label">Passing Score</div>';
  html += '</div>';
  html += '<div class="result-card">';
  html += '<div class="result-card-value">' + (c.cbtFormat.negativeMarking ? '-' + (c.cbtFormat.negativeMarkValue || 0.25) : 'No') + '</div>';
  html += '<div class="result-card-label">Negative Marking</div>';
  html += '</div>';
  html += '</div>';
  
  // Interview Tips
  html += '<h3 style="color:var(--tx1);font-size:1rem;margin-bottom:0.8rem;">💡 Interview Tips</h3>';
  html += '<div class="tips-grid">';
  c.interviewStyle.tips.forEach(function(tip) {
    html += '<div class="tip-card">';
    html += '<div class="tip-card-icon">💡</div>';
    html += '<div class="tip-card-text">' + tip + '</div>';
    html += '</div>';
  });
  html += '</div>';
  
  // Action Buttons
  html += '<div class="company-actions">';
  html += '<button class="company-action-btn primary" onclick="launchCBTExam(\'' + companyId + '\')">📝 Start CBT Exam</button>';
  html += '<button class="company-action-btn secondary" onclick="startAIInterview(\'' + companyId + '\')">🎤 Mock Interview</button>';
  html += '</div>';
  
  // Past History
  var hist = InterviewPrep.getCompanyHistory(companyId);
  if (hist.length) {
    html += '<div style="margin-top:1.5rem"><h3 style="color:var(--tx1);font-size:1rem;margin-bottom:0.8rem;">📊 Your Past Attempts</h3>';
    hist.slice(-5).reverse().forEach(function(h) {
      html += '<div class="history-card">';
      html += '<div class="history-score-badge ' + (h.passed ? 'passed' : 'failed') + '">' + h.score + '%</div>';
      html += '<div class="history-info">';
      html += '<div class="history-company">' + (h.passed ? '✅ Passed' : '❌ Failed') + ' — ' + h.correct + '/' + h.total + '</div>';
      html += '<div class="history-date">' + new Date(h.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + '</div>';
      html += '</div></div>';
    });
    html += '</div>';
  }
  
  container.innerHTML = html;
}

/* ═══════════════════════════════════════
   CBT EXAM
   ═══════════════════════════════════════ */
function launchCBTExam(companyId) {
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
  html += '<div class="cbt-exam-title">' + (c ? c.icon + ' ' + c.shortName + ' CBT' : '🔬 CES Practice') + '</div>';
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
