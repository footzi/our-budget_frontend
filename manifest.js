const path = require('path');

const createManifest = (publicPath) => {
  return {
    id: '1',
    scope: '/',
    name: 'Money Hamster',
    display: 'standalone',
    start_url: '/',
    short_name: 'Money Hamster',
    theme_color: '#821EA5',
    description: 'Money Hamster | Учет финансов | Ведение семейного бюджета | Домашняя бухгалтерия',
    orientation: 'any',
    background_color: '#FFFFFF',
    related_applications: [],
    prefer_related_applications: false,
    display_override: ['window-controls-overlay'],
    icons: [
      {
        src: path.resolve('public/favicons/pwa-icon.png'),
        sizes: [96, 128, 192, 256, 384, 512],
      },
    ],
    screenshots: [
      {
        src: `${publicPath}images/screenshot.png`,
        sizes: '770x1544',
        type: 'image/png',
      },
    ],
    features: ['Cross Platform', 'fast', 'simple'],
    categories: ['social'],
    // @todo проверить, что это и удалить
    shortcuts: [
      {
        name: 'Open About',
        short_name: 'About',
        description: 'Open the about page',
        url: '/about',
        icons: [{ src: `${publicPath}favicons/192x192.png`, sizes: '192x192' }],
      },
    ],
  };
};

module.exports = createManifest;
