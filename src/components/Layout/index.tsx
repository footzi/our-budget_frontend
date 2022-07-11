import { Balance } from '@/components/Balance';
import { Main } from '@/components/Main';
import { MainLoader } from '@/components/MainLoader';
import { Settings } from '@/components/Settings';
import { UserWidget } from '@/components/UserWidget';
import { ROUTES } from '@/constants/routes';
import { useGetBalance } from '@/hooks/useGetBalance';
import { useGetCategories } from '@/hooks/useGetCategories';
import { useGetSavingGoals } from '@/hooks/useGetSavingGoals';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import './index.less';

export const Layout = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const { isLoading: isLoadingGetCategories } = useGetCategories();
  const { isLoading: isLoadingGetBalance } = useGetBalance();
  const { isLoading: isLoadingGetSavingGoals } = useGetSavingGoals();

  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenSettings = () => {
    if (isSettings) {
      navigate(ROUTES.MAIN);
    } else {
      navigate(ROUTES.SETTINGS);
    }
  };

  useEffect(() => {
    if (!isLoadingGetCategories && !isLoadingGetSavingGoals && !isLoadingGetBalance) {
      setIsFirstLoading(false);
    }
  }, [isLoadingGetBalance, isLoadingGetCategories, isLoadingGetSavingGoals]);

  if (isFirstLoading) {
    return <MainLoader />;
  }

  const isSettings = location.pathname.includes(ROUTES.SETTINGS);
  const buttonText = isSettings ? 'Назад' : 'Настройки';

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
      <div className="layout__user-widget">
        <UserWidget />
      </div>
    </div>
  );
};
