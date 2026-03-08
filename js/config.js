/* MarineIQ — App State & Model Config
   Single source of truth. All modules read from APP.* */

const APP = {
  apiKey:      localStorage.getItem('marineiq_apikey') || '',
  currentLevel: null,
  currentTopic: null,
  currentModel: 'bal',
  examMode:    false,
  lastQuery:   '',
  lastAnswer:  '',
  notes:       JSON.parse(localStorage.getItem('marineiq_notes') || '[]'),
  studied:     JSON.parse(localStorage.getItem('marineiq_studied') || '{}'),
  fcCards:     [],
  fcIndex:     0,
  quizData:    [],
  quizIndex:   0,
  quizScore:   { c: 0, t: 0 },
  timerIv:     null,
  activeRefBook: localStorage.getItem('marineiq_refbook') || null,
  refMode: localStorage.getItem('marineiq_refmode') || 'bookfirst',
  // Properties needed by sidebar-enhanced, topic-zone, topbar-init
  streak:       JSON.parse(localStorage.getItem('miq_streak') || '{"count":0,"last":""}'),
  bookmarks:    JSON.parse(localStorage.getItem('miq_bookmarks') || '[]'),
  recentTopics: JSON.parse(localStorage.getItem('miq_recent') || '[]'),
  stats:        JSON.parse(localStorage.getItem('miq_stats') || '{"fcFlipped":0,"quizTaken":0,"aiAsked":0}'),
  tabMemory:    JSON.parse(localStorage.getItem('miq_tabmemory') || '{}'),
  lightMode:    localStorage.getItem('miq_lightmode') === 'true',
  lastTopic:    localStorage.getItem('miq_lasttopic') || null,
  lastLevel:    localStorage.getItem('miq_lastlevel') || null,
  quizWrong:    [],
  chatHistory:  [],  // last N Q&A pairs for conversation memory
};

const MODELS = {
  fast: { id: 'claude-haiku-4-5-20251001',  label: 'HAIKU',  cls: 'abadge-fast' },
  bal:  { id: 'claude-sonnet-4-20250514',    label: 'SONNET', cls: 'abadge-bal'  },
  deep: { id: 'claude-opus-4-20250514',      label: 'OPUS',   cls: 'abadge-deep' },
  live: { id: 'claude-sonnet-4-20250514',    label: 'LIVE',   cls: 'abadge-live' },
};

/* ── Quiz State (single source of truth — used by quiz-v2, quiz-advanced) ── */
const QUIZ = {
  data:       [],      // array of question objects
  index:      0,       // current question index
  score:      0,       // correct answers
  total:      0,       // questions answered
  wrong:      [],      // wrong answer indices for review
  answered:   false,   // has current Q been answered?
  difficulty: 'mixed', // easy | medium | hard | mixed
  count:      10,      // questions per round: 5 | 10 | 15 | 20
  generating: false,   // lock to prevent double-generate
};

/* ── INIT ── */
