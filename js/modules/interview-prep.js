/* MarineIQ — Interview Prep Core Module
   CBT Simulator Engine, Scoring, Timer, Progress Tracking
   Deps: interview-companies.js, ces-questions.js */

var InterviewPrep = (function() {
  'use strict';

  /* ─── State ─── */
  var state = {
    currentCompany: null,
    currentMode: null,       // 'cbt' | 'ces' | 'interview'
    questions: [],
    currentIndex: 0,
    answers: {},             // { questionIndex: selectedOption }
    flagged: {},             // { questionIndex: true }
    timeRemaining: 0,
    timerInterval: null,
    startTime: null,
    examFinished: false,
    score: null
  };

  /* ─── Shuffle array (Fisher-Yates) ─── */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  /* ─── Build CBT question set from company data + CES bank ─── */
  function buildCBTQuestions(companyId, maxQuestions) {
    var company = INTERVIEW_COMPANIES[companyId];
    if (!company) return [];
    maxQuestions = maxQuestions || company.cbtFormat.totalQuestions || 50;
    
    // Pull from CES bank, matching topics to company's CBT sections
    var allQ = shuffle(CES_QUESTIONS.slice());
    return allQ.slice(0, Math.min(maxQuestions, allQ.length));
  }

  /* ─── Build CES question set by category ─── */
  function buildCESQuestions(categories, count) {
    count = count || 65;
    var filtered = CES_QUESTIONS.filter(function(q) {
      return !categories || !categories.length || categories.indexOf(q.category) !== -1;
    });
    return shuffle(filtered).slice(0, Math.min(count, filtered.length));
  }

  /* ─── Start CBT Exam ─── */
  function startCBTExam(companyId) {
    var company = INTERVIEW_COMPANIES[companyId];
    if (!company) return;
    
    state.currentCompany = company;
    state.currentMode = 'cbt';
    state.questions = buildCBTQuestions(companyId);
    state.currentIndex = 0;
    state.answers = {};
    state.flagged = {};
    state.timeRemaining = company.cbtFormat.duration * 60; // seconds
    state.startTime = Date.now();
    state.examFinished = false;
    state.score = null;
    
    startTimer();
    return state;
  }

  /* ─── Start CES Practice ─── */
  function startCESExam(categories, questionCount) {
    state.currentCompany = null;
    state.currentMode = 'ces';
    state.questions = buildCESQuestions(categories, questionCount || 65);
    state.currentIndex = 0;
    state.answers = {};
    state.flagged = {};
    state.timeRemaining = 60 * 60; // 60 minutes standard
    state.startTime = Date.now();
    state.examFinished = false;
    state.score = null;
    
    startTimer();
    return state;
  }

  /* ─── Timer ─── */
  function startTimer() {
    clearInterval(state.timerInterval);
    state.timerInterval = setInterval(function() {
      state.timeRemaining--;
      
      // Update timer display
      var timerEl = document.getElementById('cbtTimer');
      if (timerEl) {
        var min = Math.floor(state.timeRemaining / 60);
        var sec = state.timeRemaining % 60;
        timerEl.textContent = String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
        
        // Warning at 5 minutes
        if (state.timeRemaining <= 300) {
          timerEl.classList.add('cbt-timer-warning');
        }
        // Critical at 1 minute
        if (state.timeRemaining <= 60) {
          timerEl.classList.add('cbt-timer-critical');
        }
      }
      
      if (state.timeRemaining <= 0) {
        finishExam();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(state.timerInterval);
  }

  /* ─── Answer a question ─── */
  function answerQuestion(questionIndex, optionIndex) {
    state.answers[questionIndex] = optionIndex;
  }

  /* ─── Toggle flag ─── */
  function toggleFlag(questionIndex) {
    if (state.flagged[questionIndex]) {
      delete state.flagged[questionIndex];
    } else {
      state.flagged[questionIndex] = true;
    }
  }

  /* ─── Navigate ─── */
  function goToQuestion(index) {
    if (index >= 0 && index < state.questions.length) {
      state.currentIndex = index;
    }
  }

  function nextQuestion() {
    if (state.currentIndex < state.questions.length - 1) {
      state.currentIndex++;
    }
  }

  function prevQuestion() {
    if (state.currentIndex > 0) {
      state.currentIndex--;
    }
  }
  
  /* ─── Calculate Score ─── */
  function calculateScore() {
    var correct = 0, wrong = 0, unanswered = 0;
    var categoryScores = {};
    
    state.questions.forEach(function(q, i) {
      var cat = q.category || 'General';
      if (!categoryScores[cat]) categoryScores[cat] = { correct: 0, total: 0 };
      categoryScores[cat].total++;
      
      if (state.answers[i] === undefined) {
        unanswered++;
      } else if (state.answers[i] === q.correct) {
        correct++;
        categoryScores[cat].correct++;
      } else {
        wrong++;
      }
    });

    var total = state.questions.length;
    var negativeMarking = state.currentCompany && state.currentCompany.cbtFormat.negativeMarking;
    var negValue = negativeMarking ? (state.currentCompany.cbtFormat.negativeMarkValue || 0.25) : 0;
    var rawScore = correct - (wrong * negValue);
    var percentage = Math.round((rawScore / total) * 100);
    var passingScore = state.currentCompany ? state.currentCompany.cbtFormat.passingScore : 60;
    var timeTaken = Math.round((Date.now() - state.startTime) / 1000);
    
    return {
      correct: correct,
      wrong: wrong,
      unanswered: unanswered,
      total: total,
      rawScore: rawScore,
      percentage: Math.max(0, percentage),
      passed: percentage >= passingScore,
      passingScore: passingScore,
      timeTaken: timeTaken,
      avgTimePerQuestion: Math.round(timeTaken / total),
      categoryScores: categoryScores,
      negativeMarking: negativeMarking
    };
  }

  /* ─── Finish Exam ─── */
  function finishExam() {
    stopTimer();
    state.examFinished = true;
    state.score = calculateScore();
    
    // Save to history
    saveResult(state.score);
    
    return state.score;
  }

  /* ─── Progress Tracking (localStorage) ─── */
  function saveResult(score) {
    try {
      var key = 'marineiq_interview_history';
      var history = JSON.parse(localStorage.getItem(key) || '[]');
      history.push({
        date: new Date().toISOString(),
        company: state.currentCompany ? state.currentCompany.id : 'ces',
        companyName: state.currentCompany ? state.currentCompany.shortName : 'CES Practice',
        mode: state.currentMode,
        score: score.percentage,
        passed: score.passed,
        correct: score.correct,
        total: score.total,
        timeTaken: score.timeTaken
      });
      // Keep last 50 results
      if (history.length > 50) history = history.slice(-50);
      localStorage.setItem(key, JSON.stringify(history));
    } catch(e) {
      console.warn('Could not save interview history:', e);
    }
  }

  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem('marineiq_interview_history') || '[]');
    } catch(e) {
      return [];
    }
  }

  function getCompanyHistory(companyId) {
    return getHistory().filter(function(h) { return h.company === companyId; });
  }

  /* ─── AI Interview Prompt Builder ─── */
  function buildInterviewPrompt(companyId, round) {
    var company = INTERVIEW_COMPANIES[companyId];
    if (!company) return '';
    
    var roundType = round || 'technical';
    var prompt = 'You are a senior interviewer from ' + company.name + ' (' + company.shortName + ').\n';
    prompt += 'You are conducting a ' + roundType + ' interview for a marine engineer candidate.\n';
    prompt += 'Company background: ' + company.reputation + '\n';
    prompt += 'Interview style: ' + company.interviewStyle.type + '\n';
    prompt += 'Interview difficulty: ' + company.interviewStyle.difficulty + '\n\n';
    prompt += 'INSTRUCTIONS:\n';
    prompt += '1. Ask ONE question at a time from relevant topics.\n';
    prompt += '2. After the candidate answers, evaluate it (score 1-10) and provide feedback.\n';
    prompt += '3. Ask follow-up questions based on their answer.\n';
    prompt += '4. Be professional but challenging, like a real ' + company.shortName + ' interviewer.\n';
    prompt += '5. Cover topics relevant to this company: ' + company.interviewStyle.rounds.join(', ') + '\n';
    prompt += '6. After 5-8 questions, provide an overall assessment.\n';
    
    return prompt;
  }

  /* ─── Public API ─── */
  return {
    state: state,
    startCBTExam: startCBTExam,
    startCESExam: startCESExam,
    answerQuestion: answerQuestion,
    toggleFlag: toggleFlag,
    goToQuestion: goToQuestion,
    nextQuestion: nextQuestion,
    prevQuestion: prevQuestion,
    finishExam: finishExam,
    calculateScore: calculateScore,
    stopTimer: stopTimer,
    getHistory: getHistory,
    getCompanyHistory: getCompanyHistory,
    buildInterviewPrompt: buildInterviewPrompt,
    shuffle: shuffle
  };
})();
