const CACHE="ponceescalier-v2";
const ASSETS=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png",
 "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
 "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res;}).catch(()=>caches.match("index.html"))));});
