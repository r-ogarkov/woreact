import { handleRequest } from './public/dist/worker'


addEventListener('fetch', (event) => {
  return event.respondWith(handleRequest(event));
});
