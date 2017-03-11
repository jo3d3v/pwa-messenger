/**
 * Listen on install event 
 * to cache static ressources and setup further configs.
 */
self.addEventListener('install', function (event) {
    event.waitUntil(preCache())
});

/**
 * Listen to fetch event to provide cached resources.
 */
self.addEventListener('fetch', function (event) {
    if (event.request.url.indexOf('/api') !== -1) {
        // TODO answer api calls
    } else {
        if (event.request.method === 'GET') {
            event.respondWith(fromCacheFirst(event.request));
        } else {
            evetn.respondWith(Promise.reject('Method not allowed!'));
        }
    }
});

/**
 * Cache space.
 */
var CACHE = 'app-v1';

/**
 * Caches all static ressources.
 */
function preCache() {
    return caches.open(CACHE).then(function (cache) {
        // cache static ressources
        return cache.addAll([
            './',
            './index.html',
            './manifest.json',
            './polyfills.bundle.js',
            './vendor.bundle.js',
            './main.bundle.js',
            './assets/icon/favicon-16x16.png',
            './assets/icon/favicon-32x32.png',
            './assets/icon/favicon-96x96.png',
            './assets/icon/android-icon-36x36.png',
            './assets/icon/android-icon-48x48.png',
            './assets/icon/android-icon-72x72.png',
            './assets/icon/android-icon-96x96.png',
            './assets/icon/android-icon-144x144.png',
            './assets/icon/android-icon-192x192.png',
            './assets/fonts/material_icons/codepoints',
            './assets/fonts/material_icons/MaterialIcons-Regular.eot',
            './assets/fonts/material_icons/MaterialIcons-Regular.ijmap',
            './assets/fonts/material_icons/MaterialIcons-Regular.svg',
            './assets/fonts/material_icons/MaterialIcons-Regular.ttf',
            './assets/fonts/material_icons/MaterialIcons-Regular.woff',
            './assets/fonts/material_icons/MaterialIcons-Regular.woff2',
            './assets/fonts/roboto/Roboto-Bold.ttf',
            './assets/fonts/roboto/Roboto-Italic.ttf',
            './assets/fonts/roboto/Roboto-Light.ttf',
            './assets/fonts/roboto/Roboto-Medium.ttf',
            './assets/fonts/roboto/Roboto-Regular.ttf',
            './favicon.ico'
        ]);
    });
}

/**
 * Cache reponse handler for static ressources.
 */
function fromCacheFirst(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    }).catch(function () {
        return fetch(request)
    });
}