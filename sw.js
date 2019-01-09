const version = '1.3.8';
const staticCache = `static-${version}`;
const dynamicCache = 'dynamic'
let filesToCache = [
  'index.htm',
  'note.css',
  'note.js',
  'add.svg',
  'flurr.ttf',
  'list.svg',
  'manifest.json',
  'sw.js',
  'zero-state.svg',
  'menu-dots.svg',
  'logo.png',
  'logo144.png',
  'howler.js',
  'buttonpress.mp4',
  'buttonpress1.mp4',
  'edit.png'
]



addEventListener('install', (event) => {
  skipWaiting();
  event.waitUntil(async function () {
    const cache = await caches.open(staticCache);
    await cache.addAll(filesToCache);
  }());
});

addEventListener('activate', (event) => {
  event.waitUntil(async function () {
    // Remove old caches
    for (const cacheName of await caches.keys()) {
      if (!cacheName.startsWith('podcast-') && cacheName !== staticCache && cacheName !== dynamicCache) {
        await caches.delete(cacheName);
      }
    }

    // A pretty harsh way to handle updates, but it's just a demo.
    for (const client of await clients.matchAll()) {
      client.navigate(client.url);
    }
  }());
});

addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Skip the service worker for the feed. The page handles the caching.
  if (url.origin === location.origin && url.pathname === '/feed') return;
  event.respondWith(async function () {
    // Offline first:
    const cachedResponse = await caches.match(event.request);
    return cachedResponse || fetch(event.request);
  }());
});
