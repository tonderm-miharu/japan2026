const CACHE_NAME = 'japan2026-v2';
const ASSETS = [
    './',
    './itinerar.html',
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
            return cache.addAll(ASSETS);
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
self.addEventListener('fetch', event => {
    // Skip Google Maps links
    if (event.request.url.includes('google.com/maps')) {
        return;
    }

    event.respondWith(
        fetch(event.request).then(response => {
            // Update cache with fresh response
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseClone);
            });
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
