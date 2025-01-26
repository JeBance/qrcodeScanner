const cacheName = 'qrcodeScanner-v1';

const addResourcesToCache = async (resources) => {
	const cache = await caches.open(cacheName);
	await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "/qrcodeScanner/",
      "/qrcodeScanner/index.html",
      "/qrcodeScanner/favicon.ico",
      "/qrcodeScanner/style.css",
      "/qrcodeScanner/img/icon-32.png",
      "/qrcodeScanner/img/icon-64.png",
      "/qrcodeScanner/img/icon-128.png",
      "/qrcodeScanner/img/icon-180.png",
      "/qrcodeScanner/img/icon-192.png",
      "/qrcodeScanner/img/icon-196.png",
      "/qrcodeScanner/img/icon-256.png",
      "/qrcodeScanner/img/icon-512.png",
      "/qrcodeScanner/app.js",
      "/qrcodeScanner/pwa.js",
      "/qrcodeScanner/html5-qrcode.min.js"
    ])
  );
});

self.addEventListener('fetch', (e) => {
	e.respondWith((async () => {
		const r = await caches.match(e.request);
		console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
		if (r) return r;
		const response = await fetch(e.request);
		const cache = await caches.open(cacheName);
		console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
		cache.put(e.request, response.clone());
		return response;
	})());
});

