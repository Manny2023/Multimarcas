// Instalar el Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mi-pwa-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/styles.css',
        '/js/main.js',
        '/img/logo.png'
      ]);
    })
  );
});

// Activar el Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Eliminar las cachés antiguas si existen
          return cacheName.startsWith('mi-pwa-cache') && cacheName !== 'mi-pwa-cache';
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Interceptar las solicitudes de red y buscar en la caché
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
