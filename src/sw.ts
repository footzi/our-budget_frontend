export const initServiceWorker = () => {
  window.addEventListener('load', () => {
    if (navigator.serviceWorker) {
      console.log(`${PUBLIC_PATH}service-worker.js`);
      navigator.serviceWorker.register(`${PUBLIC_PATH}service-worker.js`);
    }
  });
};
