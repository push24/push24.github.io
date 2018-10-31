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
              return fetch(event.request).then(function(response) {
                console.log('Response from network is:', response);
              console.log(event.request.url);
              if(event.request.url == 'http://127.0.0.1:8698/pages/a.html')
              {
                caches.open(cacheName)
                        .then(cache =>
                        {  console.log('add new page to cache');
                            cache.add('http://127.0.0.1:8698/small.mp4');
                          
                        });
                        
              }
                return caches.open(cacheName)
                        .then(cache =>
                        {  console.log('add new page to cache');
                            cache.put(event.request.url ,response.clone());
                            return response;
                        });
            
              })
      })
    );
  });
 
  