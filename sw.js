const CACHE='la-cavoute-v1-4-0-20261025-1640';
const CORE=['./','./index.html'];
const OPTIONAL=['./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];

// Installation : seuls index.html et ./ sont indispensables.
// Manifeste et icônes sont mis en cache s'ils existent ; leur absence n'empêche pas l'installation.
self.addEventListener('install',e=>{
  e.waitUntil((async()=>{
    const c=await caches.open(CACHE);
    await c.addAll(CORE.map(u=>new Request(u,{cache:'reload'})));
    await Promise.allSettled(OPTIONAL.map(u=>c.add(new Request(u,{cache:'reload'}))));
    await self.skipWaiting();
  })());
});

// Activation : supprime uniquement les anciens caches de La Cavoute
// (le domaine github.io peut héberger d'autres applications).
self.addEventListener('activate',e=>{
  e.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k.startsWith('la-cavoute-')&&k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==location.origin)return;

  // Page principale : réseau d'abord (version à jour), cache en secours hors connexion.
  if(req.mode==='navigate'){
    e.respondWith((async()=>{
      try{
        const net=await fetch(req.url,{cache:'no-cache'});
        if(net.ok){const c=await caches.open(CACHE);await c.put('./index.html',net.clone())}
        return net;
      }catch(_){
        return (await caches.match('./index.html'))||(await caches.match('./'))||Response.error();
      }
    })());
    return;
  }

  // Autres fichiers (manifeste, icônes) : cache d'abord, puis réseau.
  e.respondWith((async()=>{
    const cached=await caches.match(req);
    if(cached)return cached;
    try{
      const net=await fetch(req);
      if(net.ok){const c=await caches.open(CACHE);c.put(req,net.clone()).catch(()=>{})}
      return net;
    }catch(_){return Response.error()}
  })());
});
