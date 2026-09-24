const CACHE_NAME = 'elarion-v4';
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.json',
  './styles/style.css',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Instalar y guardar todo en caché
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARCHIVOS))
  );
  self.skipWaiting();
});

// Activar
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Servir desde caché (funciona offline)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
