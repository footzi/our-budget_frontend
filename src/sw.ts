export const initServiceWorker = () => {
  window.addEventListener('load', () => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register(`${PUBLIC_PATH}service-worker.js`);
    }
  });
};
