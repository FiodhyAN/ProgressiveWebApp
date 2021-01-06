const staticCacheName = 'site-static';
const assets = [
    '/',
    'index.html',
    'contact.html',
    'product.html',
    'js/app.js',
    'js/materialize.min.js',
    'css/materialize.min.css',
    'css/style.css',
    'css/contact.css',
    'css/product.css',
    'img/clients/gojek.png',
    'img/clients/tokopedia.png',
    'img/clients/traveloka.png',
    'img/portfolio/1.png',
    'img/portfolio/2.png',
    'img/portfolio/3.png',
    'img/portfolio/4.png',
    'img/portfolio/5.png',
    'img/portfolio/6.png',
    'img/project/background.png',
    'img/project/cyberpunk.jpg',
    'img/project/dota.jpg',
    'img/project/linkedin.png',
    'img/project/tokopedia.webp',
    'img/project/valorant.jpg',
    'img/Sidenav/background.webp',
    'img/Sidenav/orang.jpg',
    'img/slider/deku.jpg',
    'img/slider/gaming.jpg',
    'img/slider/mobil.jpg',
    'img/slider/samurai.jpg',
    'manifest.json',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15865.08982696462!2d106.8081952!3d-6.2277647!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfe3d872dbc2b760a!2sGoogle%20Indonesia!5e0!3m2!1sen!2sid!4v1609893066782!5m2!1sen!2sid'
]

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then(cache =>{
            console.log('Caching success');
            cache.addAll(assets);
        })
    )
})

self.addEventListener('activate', evt => {
    console.log('Servic Worker activated');
})

self.addEventListener('fetch', evt => {
    // console.log('fetch service worker',evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    )
})