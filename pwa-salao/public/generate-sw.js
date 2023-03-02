

const OFFLINE_VERSION = 1;
const CACHE_NAME = 'offline';
const OFFLINE_URL = 'offlinePage';

self.addEventListener('install', (event) => {      //instalcao//
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
    })());
});

self.addEventListener('activate', (event) => {   //ativacao//
    event.waitUntil((async () => {
        if ('navigationPreload' in self.registration) {
            await self.registration.navigatioPreload.enable();
        }
        })());
        self.clients.claim();
});

self.addEventListener('fetch', (event) => {          //faz requisicao//
        if (event.request.mode === 'navigate') {
            event.respondWith((async () => {
                try {
                    const preloadResponse = await event.preloadResponse;         //faz a requisicao do aplicativo//
                    if (preloadResponse){
                        return preloadResponse;
                    }
                    
                    const networkResponse = await fetch(event.request);
                    return networkResponse;
 
              } catch (error){                                 //caso nao consiga acima, chama a pagina offline//
                console.log('Fetch failed; returning offline page instead', error);        

                const cache = await caches.open(CACHE_NAME);
                const cacheResponse = await cache.match(OFFLINE_URL);
                return cacheResponse;
              }
            })());
        }
    });

