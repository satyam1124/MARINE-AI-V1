# MarineIQ Pro

**Merchant Navy Engineering Academy** — AI-powered study platform for MEO Class 1–4 and BTech Marine Engineering.

---

## Project Structure

```
marineiq/
│
├── index.html                  ← Shell only (~15KB). Open this in browser.
│
├── css/
│   ├── variables.css           ← CSS custom properties & theme tokens
│   ├── layout.css              ← Topbar, sidebar, main panel, grid
│   └── components.css          ← Cards, buttons, modals, answer blocks, panels
│
└── js/
    ├── config.js               ← APP state object, MODELS — edit defaults here
    ├── utils.js                ← Shared helpers (esc, showEl, renderAnswerBody)
    ├── init.js                 ← Bootstrap: wires everything on DOMContentLoaded
    │
    ├── data/                   ← PURE DATA — no functions, safe to edit
    │   ├── career-levels.js    ← All 8 career levels (Cadet → Class 1)
    │   ├── topic-knowledge.js  ← Per-topic formulas, flashcards, video URLs
    │   ├── topic-knowledge-patches.js  ← Extra KB entries (GZ curve etc.)
    │   ├── diagrams.js         ← Animated SVG diagrams + topic assignments
    │   ├── btec-chapters.js    ← All 49 BTech subjects (163KB of chapter data)
    │   └── ref-books/
    │       ├── diesel-handbook.js   ← Handbook of Diesel Engines (45 sections)
    │       ├── aranha.js            ← Marine Diesel Engines - Aranha (48 sections)
    │       ├── aux-machinery.js     ← Marine Auxiliary Machinery 7E (48 sections)
    │       └── index.js             ← Assembles REF_BOOKS from the 3 above
    │
    ├── modules/                ← FEATURE LOGIC — one concern per file
    │   ├── ai-engine.js        ← buildSystemPrompt, askStream, askLive, doAsk
    │   ├── ai-providers.js     ← Multi-provider (Gemini/Groq/OpenRouter/Anthropic)
    │   ├── ref-library.js      ← Book-first RAG, diagram detection, modal UI
    │   ├── quiz.js             ← Legacy quiz (simple MCQ)
    │   ├── quiz-v2.js          ← Quiz Engine v2 (difficulty, AI-generated)
    │   ├── quiz-advanced.js    ← Advanced quiz (multi-round, question history)
    │   ├── flashcards.js       ← Flip, navigate, shuffle
    │   ├── formulas.js         ← Formula panel loader
    │   ├── formulas-v3.js      ← Formula Visualizer v3 (color, filter, copy)
    │   ├── notes.js            ← Save, delete, render notes
    │   └── search.js           ← Global topic search (press / to open)
    │
    └── ui/                     ← UI RENDERING — DOM manipulation
        ├── navigation.js       ← buildRankGrid, enterLevel, buildSidebar
        ├── topic-panel.js      ← selectTopic, loadDiagrams, loadVideos, switchPanel
        ├── controls.js         ← selectModel, toggleExamMode, goHome, setBreadcrumb
        ├── sidebar.js          ← toggleSidebar, openSidebar, closeSidebar
        ├── sidebar-enhanced.js ← Bookmarks, recents, progress badges
        ├── mobile.js           ← Hamburger, touch gestures (DOMContentLoaded)
        ├── exam-renderer.js    ← renderExamAnswer, legacy quiz v1 render
        ├── topbar-init.js      ← Search/dark mode buttons injected into topbar
        ├── topic-zone.js       ← Topic header, progress, nav injection
        ├── ai-diagrams.js      ← AI SVG generator (generate, cache, zoom, download)
        ├── video-zoom.js       ← Inline video player, diagram lightbox
        ├── subtopic.js         ← Chapter/subtopic content loader with tabs
        ├── upgrade.js          ← Home screen stats, streaks, year syllabus
        ├── api-button.js       ← API key button upgrade
        └── btec-nav.js         ← BTech chapter system (IIFE, CSS injection, setChapters)
```

---

## Deploying to GitHub Pages

1. Push this entire folder to your GitHub repo
2. Enable GitHub Pages → Source: `main` branch, `/ (root)` folder
3. Your site: `https://yourusername.github.io/MARINE-AI/`

No build step. No npm. Works directly.

---

## Common Tasks

| Task | File to edit |
|------|-------------|
| Change AI model IDs | `js/config.js` → `MODELS` |
| Edit topic formulas/flashcards | `js/data/topic-knowledge.js` |
| Add a new BTech subject | `js/data/btec-chapters.js` → add `setChapters(...)` call |
| Add a new reference book | Add file to `js/data/ref-books/`, update `index.js` |
| Fix quiz bug | `js/modules/quiz-v2.js` |
| Fix AI answer rendering | `js/utils.js` → `renderAnswerBody()` |
| Change app colors/theme | `css/variables.css` |
| Fix layout issue | `css/layout.css` |
| Change card styles | `css/components.css` |
| Modify the AI system prompt | `js/modules/ai-engine.js` → `buildSystemPrompt()` |

---

## Sources

Reed's Vols 1–12 · Pounder's 9th Ed · MAN B&W · Wärtsilä · IMO STCW/MARPOL/SOLAS  
DG Shipping MMD · Alfa Laval · ABB · Eyres · Rogers & Mayhew · Lloyd's · IACS  
ISM/BWM/IGF Codes · Handbook of Diesel Engines · Aranha Marine Diesel · McGeorge Aux Machinery
