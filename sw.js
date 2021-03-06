const staticCacheName = 'site-static-v6';
const dynamicCacheName = 'site-dynamic-v6';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/materialize.min.js',
    '/js/db.js',
    '/js/ui.js',
    '/css/materialize.min.css',
    '/css/style.css',
    '/img/clients/gojek.png',
    '/img/clients/tokopedia.png',
    '/img/clients/traveloka.png',
    '/img/clients/valorant.png',
    'img/contact/form-background.jpg',
    '/img/portfolio/1.png',
    '/img/portfolio/2.png',
    '/img/portfolio/3.png',
    '/img/portfolio/4.png',
    '/img/portfolio/5.png',
    '/img/portfolio/6.png',
    '/img/project/background.jpg',
    '/img/project/background.png',
    '/img/project/cyberpunk.jpg',
    '/img/project/dota.jpg',
    '/img/project/linkedin.png',
    '/img/project/mobilelegend.jpg',
    '/img/project/mobilelegend.png',
    '/img/project/tokopedia.webp',
    '/img/project/valorant.jpg',
    '/img/Sidenav/background.webp',
    '/img/Sidenav/orang.jpg',
    '/img/slider/deku.jpg',
    '/img/slider/gaming.jpg',
    '/img/slider/mobil.jpg',
    '/img/slider/samurai.jpg',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://fonts.gstatic.com/s/materialicons/v70/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    '/fallback.html'
];

const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size)
            {
                cache.delete(keys[0]).then(limitCacheSize(name,size));
            }
        })
    })
};

self.addEventListener('install', evt => {
    // console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache =>{
            console.log('Caching success');
            cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', evt => {
    // console.log('Servic Worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

self.addEventListener('fetch', evt => {
    if(evt.request.url.indexOf('firestore.googleapis.com') === -1)
    {
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(fetchRes => {
                    return caches.open(dynamicCacheName).then(cache => {
                        cache.put(evt.request.url, fetchRes.clone());
                        limitCacheSize(dynamicCacheName, 15);
                        return fetchRes;
                    })
                });
            }).catch(() => {
                if(evt.request.url.indexOf('.html') > -1)
                {
                    return caches.match('/fallback.html');
                }
            })
        );
    }
});