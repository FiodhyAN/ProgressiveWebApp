const staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    '/contact.html',
    '/product.html',
    '/addproject.html',
    '/login.html',
    '/register.html',
    '/js/app.js',
    '/js/materialize.min.js',
    '/css/materialize.min.css',
    '/css/style.css',
    '/css/contact.css',
    '/css/product.css',
    '/css/add.css',
    '/css/login.css',
    '/img/clients/gojek.png',
    '/img/clients/tokopedia.png',
    '/img/clients/traveloka.png',
    '/img/portfolio/1.png',
    '/img/portfolio/2.png',
    '/img/portfolio/3.png',
    '/img/portfolio/4.png',
    '/img/portfolio/5.png',
    '/img/portfolio/6.png',
    '/img/project/background.png',
    '/img/project/cyberpunk.jpg',
    '/img/project/dota.jpg',
    '/img/project/linkedin.png',
    '/img/project/tokopedia.webp',
    '/img/project/valorant.jpg',
    '/img/Sidenav/background.webp',
    '/img/Sidenav/orang.jpg',
    '/img/slider/deku.jpg',
    '/img/slider/gaming.jpg',
    '/img/slider/mobil.jpg',
    '/img/slider/samurai.jpg',
    '/img/contact/form-background.jpg',
    '/img/Login/bg.jpg',
    '/img/Login/bgproject.jpg',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
];

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
});

self.addEventListener('fetch', evt => {
    console.log('fetch event',evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    )
})