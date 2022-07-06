import { Balance } from '@/components/Balance';
import { Main } from '@/components/Main';
import { Settings } from '@/components/Settings';
import { ROUTES } from '@/constants/routes';
import { Button } from 'antd';
import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import './index.less';

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSettings = location.pathname.includes(ROUTES.SETTINGS);
  const buttonText = isSettings ? 'Назад' : 'Настройки';

  const handleOpenSettings = () => {
    if (isSettings) {
      navigate(ROUTES.MAIN);
    } else {
      navigate(ROUTES.SETTINGS);
    }
  };

  return (
    <div className="layout">
      <aside className="layout__sidebar">
        <div className="layout__sidebar-content">
          <Balance />
          <Button onClick={handleOpenSettings}>{buttonText}</Button>
        </div>
      </aside>
      <div className="layout__content">
        <main>
          <Routes>
            <Route path="/*" element={<Main />} />
            <Route path="settings/*" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
