const CACHE_NAME = 'japan2026-v3';
const ASSETS = [
    './',
    './itinerar.html',
    './japan-travel-guide.html',
    './manifest.json',
    './icon.svg',
    './icon-180.png',
    './icon-192.png',
    './icon-512.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap',
    'https://fonts.googleapis.com/css2?family=Electrolize&display=swap',
    'https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600&display=swap',
    'https://cdn.jsdelivr.net/npm/dseg@0.46.0/fonts/DSEG7-Classic/DSEG7Classic-Bold.woff2'
];

// Install - cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            // Cache each asset on its own: addAll() rejects the whole install
            // if a single request fails, leaving nothing cached for offline use.
            return Promise.all(ASSETS.map(url =>
                cache.add(url).catch(err => console.warn('SW: could not cache', url, err))
            ));
        })
    );
    self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Fetch - network first, cache fallback (always fresh when online)
// Live data that must never be served stale from the cache. If these are
// cached, an offline fetch succeeds and the page mistakes old data for fresh.
const LIVE_APIS = ['api.open-meteo.com', 'api.rss2json.com'];

self.addEventListener('fetch', event => {
    // Skip Google Maps links
    if (event.request.url.includes('google.com/maps')) {
        return;
    }

    // Live APIs: network only, and let the caller handle the offline failure
    if (LIVE_APIS.some(host => event.request.url.includes(host))) {
        return;
    }

    event.respondWith(
        fetch(event.request).then(response => {
            // Only cache successful GETs - never store an error page
            if (event.request.method === 'GET' && response && response.ok) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });
            }
            return response;
        }).catch(() => {
            // Offline - serve from cache
            return caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                // Fallback for navigation
                if (event.request.mode === 'navigate') {
                    return caches.match('./itinerar.html');
                }
            });
        })
    );
});
