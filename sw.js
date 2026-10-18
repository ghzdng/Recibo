// Service worker do Recibo: guarda a app no telemóvel para abrir mesmo sem rede.
const CACHE = 'recibo-v1';
const CORE = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const RUNTIME_HOSTS = ['cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];
self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  if(!sameOrigin && RUNTIME_HOSTS.indexOf(url.hostname) === -1) return; // Google API / login: sempre à rede
  // stale-while-revalidate: abre depressa a partir da cache e atualiza em segundo plano
  e.respondWith(caches.open(CACHE).then(cache => cache.match(req, { ignoreSearch: true }).then(hit => {
    const net = fetch(req).then(res => { if(res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  })));
});
