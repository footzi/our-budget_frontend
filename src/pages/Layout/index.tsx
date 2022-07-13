import { MainLoader } from '@/components/MainLoader';
import { Sidebar } from '@/components/Sidebar';
import { UserWidget } from '@/components/UserWidget';
import { ROUTES } from '@/constants/routes';
import { useGetBalance } from '@/hooks/useGetBalance';
import { useGetCategories } from '@/hooks/useGetCategories';
import { useGetSavingGoals } from '@/hooks/useGetSavingGoals';
import { Categories } from '@/pages/Categories';
import { Main } from '@/pages/Main';
import { SavingGoals } from '@/pages/SavingGoals';
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
      <div className="layout__sidebar">
        <Sidebar />
      </div>
      <div className="layout__content">
        <main>
          <Routes>
            <Route path="/*" element={<Main />} />
            <Route path={ROUTES.CATEGORIES} element={<Categories />} />
            <Route path={ROUTES.SAVING_GOALS} element={<SavingGoals />} />
            <Route path={ROUTES.PROFILE} element={<h1>Профиль</h1>} />
          </Routes>
        </main>
      </div>
      <div className="layout__user-widget">
        <UserWidget />
      </div>
    </div>
  );
};
