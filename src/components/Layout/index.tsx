import { Balance } from '@/components/Balance';
import { Main } from '@/components/Main';
import { MainLoader } from '@/components/MainLoader';
import { Settings } from '@/components/Settings';
import { UserWidget } from '@/components/UserWidget';
import { useGetBalance } from '@/hooks/useGetBalance';
import { useGetCategories } from '@/hooks/useGetCategories';
import { useGetSavingGoals } from '@/hooks/useGetSavingGoals';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './index.less';

export const Layout = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const { isLoading: isLoadingGetCategories } = useGetCategories();
  const { isLoading: isLoadingGetBalance } = useGetBalance();
  const { isLoading: isLoadingGetSavingGoals } = useGetSavingGoals();

  useEffect(() => {
    if (!isLoadingGetCategories && !isLoadingGetSavingGoals && !isLoadingGetBalance) {
      setIsFirstLoading(false);
    }
  }, [isLoadingGetBalance, isLoadingGetCategories, isLoadingGetSavingGoals]);

  if (isFirstLoading) {
    return <MainLoader />;
  }

  return (
    <div className="layout">
      <aside className="layout__sidebar">
        <div className="layout__sidebar-content">
          <Balance />
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
