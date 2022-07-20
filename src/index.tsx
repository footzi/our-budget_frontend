import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { store } from './store';
import './styles/index.less';

dayjs.locale('ru_RU');

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider locale={locale}>
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  );
}
