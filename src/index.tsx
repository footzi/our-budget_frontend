import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.less';
import locale from 'antd/es/locale/ru_RU';
import 'dayjs/locale/ru';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import './dayjs-config';
import { store } from './store';
import './styles/default.less';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <ConfigProvider locale={locale}>
            <App />
          </ConfigProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
}
