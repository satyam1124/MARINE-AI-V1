/* MarineIQ — Video & Diagram Zoom: inline play, SVG zoom lightbox
   Deps: config.js */

/* ══ DIAGRAM & VIDEO FIX ══ */
/* ═══════════════════════════════════════════════════════════════════════
   DIAGRAM & VIDEO FIX
   Problems fixed:
   1. 121 topics showing wrong 2-stroke fallback diagram
   2. No click-to-zoom on static diagrams
   3. YouTube thumbnails failing silently
   4. No inline video playback
   ═══════════════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════
   1. EXPANDED TOPIC_DIAGRAMS MAPPING
   Every topic now gets the right diagram (or "none" — no wrong fallback)
   ══════════════════════════════════════════════════════════ */
(function expandDiagramMap() {
  if (typeof TOPIC_DIAGRAMS === 'undefined') return;

  // Extend with all class 4 topics
  const extra = {
    // Class 4
    cl4_4stroke:   ['two_stroke_engine'],  // closest available static
    cl4_fuelsys:   [],
    cl4_lubesys:   [],
    cl4_aircomp:   [],
    cl4_heatex:    [],
    cl4_fwg:       [],
    cl4_ows:       [],
    cl4_purifier:  [],
    cl4_watch:     [],
    cl4_thermo:    ['indicator_diagram'],
    cl4_bernoulli: ['pump_curve'],
    cl4_generators:['indicator_diagram'],
    cl4_motors:    [],
    cl4_protection:[],
    cl4_seakeeping:[],
    // Class 3
    cl3_transverse: ['gz_curve'],
    cl3_damage:     ['gz_curve'],
    cl3_trim:       ['gz_curve'],
    cl3_freesurface:['gz_curve'],
    cl3_resistance: ['pump_curve'],
    cl3_boilers:    [],
    cl3_boilerwater:[],
    cl3_steamplant: ['indicator_diagram'],
    cl3_perf:       ['indicator_diagram'],
    cl3_governor:   [],
    cl3_propeller:  ['pump_curve'],
    cl3_vibration:  ['indicator_diagram'],
    cl3_altfuels:   [],
    cl3_pms:        [],
    cl3_ndt:        [],
    cl3_materials:  [],
    cl3_bearings:   [],
    cl3_solas:      [],
    cl3_marpol:     ['two_stroke_engine'],
    cl3_annex6:     [],
    cl3_ism:        [],
    cl3_stcw:       [],
    cl3_bwm:        [],
    // Chief
    ce_cii:         [],
    ce_seemp:       [],
    ce_sfoc:        ['indicator_diagram'],
    ce_futurefuels: [],
    ce_diagnosis:   [],
    ce_failures:    ['two_stroke_engine'],
    ce_overhaul:    ['two_stroke_engine'],
    ce_casualty:    [],
    ce_psc:         [],
    ce_oral_prep:   [],
  };

  Object.assign(TOPIC_DIAGRAMS, extra);
})();

/* ── Patch getDiagramsForTopic: no fallback to wrong diagram ── */
getDiagramsForTopic = function(topicId) {
  const keys = TOPIC_DIAGRAMS[topicId];
  // If undefined → topic not mapped → return empty (AI diagram button will show)
  // If [] → explicitly "no static diagram" → return empty
  // If has keys → return those diagrams
  if (!keys || keys.length === 0) return [];
  return keys.map(k => DIAGRAMS[k]).filter(Boolean);
};

/* ══════════════════════════════════════════════════════════
   2. STATIC DIAGRAM ZOOM — click to expand
   ══════════════════════════════════════════════════════════ */
function zoomStaticDiagram(svgContent, title) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed; inset:0; z-index:600;
    background:rgba(0,0,0,0.93);
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    padding:16px; cursor:zoom-out;
    animation: fadeIn 0.18s ease;
  `;

  overlay.innerHTML = `
    <div style="
      max-width:900px; width:100%;
      background:var(--bg1); border-radius:16px;
      overflow:hidden; border:1px solid var(--b1);
      box-shadow:0 24px 80px rgba(0,0,0,0.6);
      cursor:default;
      max-height:90vh; display:flex; flex-direction:column;
    " onclick="event.stopPropagation()">
      <div style="
        padding:10px 16px;
        display:flex; justify-content:space-between; align-items:center;
        border-bottom:1px solid var(--b0);
        background:var(--bg2); flex-shrink:0;
      ">
        <span style="font-size:0.72rem;color:var(--tx3);font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:0.06em;">
          📊 ${title || 'Technical Diagram'}
        </span>
        <button onclick="this.closest('[style*=position:fixed]').remove()"
          style="background:none;border:1px solid var(--b1);color:var(--tx3);cursor:pointer;
                 padding:4px 10px;border-radius:6px;font-size:0.8rem;min-height:32px;">
          ✕ Close
        </button>
      </div>
      <div style="padding:16px;overflow:auto;-webkit-overflow-scrolling:touch;">
        ${svgContent}
      </div>
    </div>
  `;

  overlay.addEventListener('click', () => overlay.remove());
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
  });
  document.body.appendChild(overlay);
}

/* ── Patch loadDiagrams to add click-to-zoom on static diagrams ── */
(function patchStaticDiagramZoom() {
  const _origLD = loadDiagrams;
  loadDiagrams = function(topicId) {
    // Call original (which may itself be patched by ai_diagram_gen)
    _origLD(topicId);

    // Add click-to-zoom to all static diag-cards (not AI ones)
    const grid = document.getElementById('diagGrid');
    if (!grid) return;

    grid.querySelectorAll('.diag-card').forEach((card, i) => {
      if (card.dataset.zoomPatched) return;
      card.dataset.zoomPatched = '1';
      card.style.cursor = 'zoom-in';

      const svgEl = card.querySelector('svg');
      const labelEl = card.querySelector('.diag-label');
      if (labelEl) {
        labelEl.innerHTML = '🔍 Click to zoom · Animated Technical Diagram';
        labelEl.style.cursor = 'zoom-in';
      }

      card.addEventListener('click', () => {
        const svgContent = svgEl ? svgEl.outerHTML : card.querySelector('div')?.innerHTML || '';
        const topicTitle = document.querySelector('.tz-intro-title')?.textContent || topicId;
        zoomStaticDiagram(svgContent, topicTitle);
      });
    });
  };
})();

/* ══════════════════════════════════════════════════════════
   3. VIDEO SYSTEM — robust thumbnails + inline embed
   ══════════════════════════════════════════════════════════ */

/* Override loadVideos with better rendering */
loadVideos = function(videos) {
  const grid = document.getElementById('videoGrid');
  if (!grid) return;

  if (!videos || !videos.length) {
    grid.innerHTML = `
      <div class="vid-empty">
        <div style="font-size:1.6rem;margin-bottom:8px;">📺</div>
        <div style="font-size:0.84rem;font-weight:600;color:var(--tx);margin-bottom:4px;">No curated videos for this topic</div>
        <div style="font-size:0.76rem;color:var(--tx3);">Ask the AI below for recommended videos and explanations</div>
      </div>`;
    return;
  }

  grid.innerHTML = videos.map((v, i) => {
    const ytUrl   = `https://www.youtube.com/watch?v=${v.id}`;
    const embedUrl = `https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`;
    // Try multiple thumbnail qualities
    const thumbHQ = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`;
    const thumbMQ = `https://img.youtube.com/vi/${v.id}/mqdefault.jpg`;

    return `
    <div class="yt-card-v2" data-vid="${v.id}" data-embed="${embedUrl}" data-url="${ytUrl}">
      <div class="yt-thumb-v2" onclick="playVideoInline('${v.id}','${embedUrl}',this)">
        <img
          src="${thumbHQ}"
          data-fallback="${thumbMQ}"
          alt="${esc(v.title)}"
          loading="lazy"
          onerror="
            if(this.dataset.tried){
              this.style.display='none';
              this.parentElement.querySelector('.yt-thumb-fallback').style.display='flex';
            } else {
              this.dataset.tried='1';
              this.src=this.dataset.fallback;
            }
          "
          style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.3s;"
        />
        <div class="yt-thumb-fallback" style="display:none;background:#0a0e1a;width:100%;height:100%;align-items:center;justify-content:center;flex-direction:column;gap:6px;">
          <span style="font-size:2rem;">🎬</span>
          <span style="font-size:0.68rem;color:var(--tx3);text-align:center;padding:0 8px;">${esc(v.title.slice(0,40))}</span>
        </div>
        <div class="yt-play-btn">▶</div>
        <div class="yt-duration-badge">YouTube</div>
      </div>
      <div class="yt-info-v2">
        <div class="yt-title-v2">${esc(v.title)}</div>
        <div class="yt-channel-v2">📺 ${esc(v.ch)}</div>
        <div class="yt-actions">
          <button class="yt-act-btn yt-act-play" onclick="playVideoInline('${v.id}','${embedUrl}',this.closest('.yt-card-v2').querySelector('.yt-thumb-v2'))">
            ▶ Play
          </button>
          <a class="yt-act-btn yt-act-open" href="${ytUrl}" target="_blank" rel="noopener noreferrer">
            ↗ YouTube
          </a>
        </div>
      </div>
    </div>`;
  }).join('');
};

function playVideoInline(vidId, embedUrl, thumbEl) {
  if (!thumbEl) return;
  const card = thumbEl.closest('.yt-card-v2') || thumbEl.parentElement;

  // Replace thumb with iframe embed
  thumbEl.style.height = thumbEl.offsetHeight + 'px';
  thumbEl.innerHTML = `
    <iframe
      src="${embedUrl}"
      width="100%" height="100%"
      style="border:none;display:block;border-radius:8px 8px 0 0;"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      title="Video player"
    ></iframe>`;

  // Update play button
  const playBtn = card.querySelector('.yt-act-play');
  if (playBtn) playBtn.textContent = '■ Stop';
}

/* ══════════════════════════════════════════════════════════
   4. CSS — better video cards, diagram zoom, fallbacks
   ══════════════════════════════════════════════════════════ */
(function injectFixCSS() {
  const s = document.createElement('style');
  s.id = 'diagvid-fix-css';
  s.textContent = `

/* ── Video grid ── */
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px,1fr));
  gap: 12px;
}
.vid-empty {
  grid-column: 1/-1; text-align:center;
  padding: 32px 20px;
  border: 1px dashed var(--b1); border-radius: 14px;
  background: var(--bg2);
  color: var(--tx3);
}

/* ── New video cards ── */
.yt-card-v2 {
  border-radius: 14px; overflow: hidden;
  background: var(--bg1); border: 1px solid var(--b0);
  transition: border-color 0.14s, box-shadow 0.14s, transform 0.14s;
  display: flex; flex-direction: column;
}
.yt-card-v2:hover {
  border-color: var(--b2);
  box-shadow: 0 6px 24px rgba(0,0,0,0.25);
  transform: translateY(-2px);
}

.yt-thumb-v2 {
  position: relative; height: 160px; overflow: hidden;
  background: #050a12; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.yt-thumb-v2 img { transition: transform 0.3s; }
.yt-card-v2:hover .yt-thumb-v2 img { transform: scale(1.04); }

.yt-play-btn {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.2);
  transition: background 0.18s;
}
.yt-play-btn::after {
  content: '';
  width: 48px; height: 48px; border-radius: 50%;
  background: rgba(220,38,38,0.9);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  background: rgba(220,38,38,0.9) url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 5v14l11-7z'/%3E%3C/svg%3E") center/22px no-repeat;
}
.yt-thumb-v2:hover .yt-play-btn { background: rgba(0,0,0,0.35); }
.yt-thumb-v2:hover .yt-play-btn::after { transform: scale(1.1); }
.yt-play-btn::after { transition: transform 0.15s; }

.yt-duration-badge {
  position: absolute; bottom: 8px; right: 8px;
  background: rgba(220,38,38,0.9); color: white;
  font-size: 0.6rem; font-weight: 700;
  padding: 2px 6px; border-radius: 4px;
  font-family: 'JetBrains Mono', monospace; letter-spacing: 0.04em;
}

.yt-info-v2 {
  padding: 12px 14px;
  display: flex; flex-direction: column; gap: 6px; flex: 1;
}
.yt-title-v2 {
  font-size: 0.82rem; font-weight: 600; color: var(--tx);
  line-height: 1.45; display: -webkit-box;
  -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.yt-channel-v2 { font-size: 0.72rem; color: var(--tx3); }
.yt-actions {
  display: flex; gap: 6px; margin-top: 4px;
}
.yt-act-btn {
  padding: 6px 14px; border-radius: 7px; font-size: 0.72rem;
  font-weight: 600; cursor: pointer; border: 1px solid var(--b1);
  background: var(--bg2); color: var(--tx2);
  transition: all 0.12s; text-decoration: none; display: inline-flex;
  align-items: center; min-height: 32px; white-space: nowrap;
}
.yt-act-play {
  background: linear-gradient(135deg, #dc2626, #991b1b);
  border-color: #dc2626; color: white;
}
.yt-act-play:hover  { background: linear-gradient(135deg, #ef4444, #dc2626); box-shadow: 0 3px 12px rgba(220,38,38,0.35); }
.yt-act-open:hover  { border-color: var(--ac); color: var(--ac); }

/* ── Static diagram improvements ── */
.diag-card {
  cursor: zoom-in !important;
  transition: border-color 0.14s, box-shadow 0.14s, transform 0.14s !important;
}
.diag-card:hover {
  border-color: rgba(212,160,23,0.4) !important;
  box-shadow: 0 6px 24px rgba(212,160,23,0.1) !important;
  transform: translateY(-2px) !important;
}
.diag-label {
  font-size: 0.6rem !important;
  padding: 8px 12px !important;
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
}
.diag-label::before {
  content: '🔍';
  font-size: 0.7rem;
}

/* ── AI diagram generate button ── */
.adp-btn { min-height: 44px !important; }

/* ── Diagram zoom overlay animation ── */
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

/* ── Light mode video cards ── */
body.light-mode .yt-card-v2 { background: white !important; border-color: var(--b0) !important; }
body.light-mode .yt-card-v2:hover { box-shadow: 0 6px 24px rgba(13,30,53,0.1) !important; }
body.light-mode .yt-thumb-v2 { background: #0a0e1a !important; }
body.light-mode .yt-title-v2 { color: var(--tx) !important; }
body.light-mode .yt-channel-v2 { color: var(--tx3) !important; }
body.light-mode .yt-act-open { background: white !important; border-color: var(--b1) !important; color: var(--tx2) !important; }
body.light-mode .vid-empty { border-color: var(--b1) !important; background: var(--bg2) !important; }

/* ── Mobile video cards ── */
@media (max-width: 768px) {
  .video-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
  .yt-thumb-v2 { height: 200px !important; }
  .yt-act-btn { min-height: 40px !important; padding: 8px 14px !important; }
}
@media (max-width: 480px) {
  .yt-thumb-v2 { height: 180px !important; }
}
  `;
  document.head.appendChild(s);
})();

console.log('%cMarineIQ — Diagram & Video fix applied. Zoom + inline play + no wrong fallbacks.', 'color:#60a5fa;font-weight:bold');




/* ═══════════════════════════════════════════════════════════════════════
   MARINEIQ FINAL PATCH — Formula Visualizer v3 + Quiz Anti-Repeat v3
   ═══════════════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════
   ██████╗  █████╗ ██████╗ ████████╗  1. FORMULA VISUALIZER
   ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝
   ██████╔╝███████║██████╔╝   ██║
   ██╔═══╝ ██╔══██║██╔══██╗   ██║
   ██║     ██║  ██║██║  ██║   ██║
   ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
   ══════════════════════════════════════════════════════════ */

