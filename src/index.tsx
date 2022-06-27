import 'antd/dist/antd.less';
import 'antd/lib/style/themes/default.less';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { App } from './App';
import { ContextProvider } from './context';

dayjs.locale('ru_RU');

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <ContextProvider>
      <BrowserRouter>
        {/*<App />*/}
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}
