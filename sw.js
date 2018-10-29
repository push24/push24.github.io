
var cacheName = 'v1';

self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('v1').then(cache => {
        return cache.addAll([
          '/'

        ]);
      })
    );
    self.skipWaiting();
  });

  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response)
        {
            console.log("from cache");
            return response;

        }
     //   return fetch(event.request);
        return   fetch(event.request).then(function(response){
            console.log('n/w request foR ' + event.request.url);
            return fetch(event.request)
            .then(response =>
            {
                return caches.open(cacheName)
                .then(cache =>
                 {  console.log('add new page to cache');
                    cache.put(event.request.url ,response.clone());
                    return response;
                });
            });

        })
      })
    );
  });

