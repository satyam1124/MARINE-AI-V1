/* MarineIQ — Service Worker: Offline-first caching for static shell
   Strategy: Cache-first for static assets, network-first for API calls
   ═══════════════════════════════════════════════════════════════════════ */

const CACHE_NAME = 'marineiq-v3-shell';
const CACHE_VERSION = 1;

/* Static assets to cache on install */
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/css/variables.css',
  '/css/layout.css',
  '/css/components.css',
  '/css/interview.css',
  '/css/learn-mode.css',
  '/js/config.js',
  '/js/utils.js',
  '/js/init.js',
  '/js/data/career-levels.js',
  '/js/data/topic-knowledge.js',
  '/js/data/diagrams.js',
  '/js/data/maritime-regulations.js',
  '/js/modules/ai-engine.js',
  '/js/modules/knowledge-engine.js',
  '/js/modules/source-integrator.js',
  '/js/modules/chat-history.js',
  '/js/modules/rag-engine.js',
  '/js/modules/quiz.js',
  '/js/modules/flashcards.js',
  '/js/modules/formulas.js',
  '/js/modules/notes.js',
  '/js/modules/search.js',
  '/js/ui/mobile.js',
  '/js/ui/sidebar.js',
  '/js/ui/navigation.js',
  '/js/ui/topic-zone.js',
  '/js/ui/controls.js',
  '/manifest.json'
];

/* ═══ INSTALL: Pre-cache shell ═══ */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('[SW] Caching shell assets');
      return cache.addAll(SHELL_ASSETS).catch(function (err) {
        console.warn('[SW] Some assets failed to cache (non-critical):', err);
        // Cache what we can, don't fail the whole install
        return Promise.allSettled(
          SHELL_ASSETS.map(function (url) {
            return cache.add(url).catch(function () {
              console.warn('[SW] Failed to cache:', url);
            });
          })
        );
      });
    })
  );
  // Activate immediately
  self.skipWaiting();
});

/* ═══ ACTIVATE: Clean old caches ═══ */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) {
          return key !== CACHE_NAME;
        }).map(function (key) {
          console.log('[SW] Deleting old cache:', key);
          return caches.delete(key);
        })
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});

/* ═══ FETCH: Strategy-based routing ═══ */
self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip external API calls (Anthropic, Google, Firebase, etc.) — always network
  if (url.hostname !== location.hostname) return;

  // For navigation requests (HTML pages) — network-first with cache fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then(function (response) {
        // Update cache with fresh version
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, clone);
        });
        return response;
      }).catch(function () {
        return caches.match(event.request).then(function (cached) {
          return cached || caches.match('/index.html');
        });
      })
    );
    return;
  }

  // For static assets (CSS, JS, images) — cache-first with network fallback
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;
      return fetch(event.request).then(function (response) {
        // Cache successful responses
        if (response.ok) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(function () {
        // If both cache and network fail, return a basic offline response for JS/CSS
        if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
          return new Response('/* offline — asset not cached */', {
            headers: { 'Content-Type': url.pathname.endsWith('.js') ? 'application/javascript' : 'text/css' }
          });
        }
      });
    })
  );
});
