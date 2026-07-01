// Waiter Helper - Service Worker
const CACHE_NAME = 'waiter-helper-v117';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
  './images/beef_burger.png',
  './images/grilled_chicken.png',
  './images/pasta_alfredo.png',
  './images/chicken_pizza.png',
  './images/chicken_wings.png',
  './images/french_fries.png'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Network-First, fallback to cache
self.addEventListener('fetch', (event) => {
  // Only handle GET requests to prevent issues with POST/PUT/etc.
  if (event.request.method !== 'GET') return;

  // Ignore cross-origin and non-http/https requests (like chrome-extension)
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful local GET requests dynamically
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Network failed (offline), check cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Document offline fallback
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
