import 'dayjs/locale/ru';

import React from 'react';
import { createRoot } from 'react-dom/client';
import dayjs from 'dayjs';
import { App } from './App';

import 'antd/lib/style/themes/default.less';
import 'antd/dist/antd.less'; // Import Ant Design styles by less entry

import { ContextProvider } from './context';

dayjs.locale('ru_RU');

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <ContextProvider>
      <App />
    </ContextProvider>
  );
}
