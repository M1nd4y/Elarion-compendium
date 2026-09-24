const CACHE_NAME = 'elarion-v1';
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.json',
  './styles/style.css',
  './audio/musica.mp3',
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
// Manejador de fetch requerido por Chrome en Android para ofrecer "Instalar app"
self.addEventListener('fetch', (event) => {
  // Dejar que el navegador maneje la petición normalmente
  // (El service worker ya sirve desde caché por la lógica de arriba)
});
