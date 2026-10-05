const CACHE='anatomia-3d-v2';
const FILES=[
  './','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png',
  './assets/1000041297.png','./assets/1000041298.png','./assets/1000041299.png','./assets/1000041300.png',
  './assets/1000041301.png','./assets/1000041302.png','./assets/1000041312.png','./assets/1000041313.png'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp;}).catch(()=>caches.match('./index.html')))));
