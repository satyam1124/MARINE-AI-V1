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
};

const MODELS = {
  fast: { id: 'claude-haiku-4-5-20251001',  label: 'HAIKU',  cls: 'abadge-fast' },
  bal:  { id: 'claude-sonnet-4-20250514',    label: 'SONNET', cls: 'abadge-bal'  },
  deep: { id: 'claude-opus-4-20250514',      label: 'OPUS',   cls: 'abadge-deep' },
  live: { id: 'claude-sonnet-4-20250514',    label: 'LIVE',   cls: 'abadge-live' },
};

/* ── INIT ── */
