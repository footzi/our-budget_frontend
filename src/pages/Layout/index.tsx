import { MainLoader } from '@/components/MainLoader';
import { PageTitle } from '@/components/PageTitle';
import { ROUTES } from '@/constants/routes';
import { useGetBalance } from '@/hooks/useGetBalance';
import { useGetCategories } from '@/hooks/useGetCategories';
import { useGetExpenses } from '@/hooks/useGetExpenses';
import { useGetFirstLoading } from '@/hooks/useGetFirstLoading';
import { useGetIncomes } from '@/hooks/useGetIncomes';
import { useGetSavingGoals } from '@/hooks/useGetSavingGoals';
import { useGetSavings } from '@/hooks/useGetSavings';
import { OnBoarding } from '@/modules/OnBoarding';
import { Sidebar } from '@/modules/Sidebar';
import { UserWidget } from '@/modules/UserWidget';
import { Categories } from '@/pages/Categories';
import { Main } from '@/pages/Main';
import { SavingGoals } from '@/pages/SavingGoals';
import { Settings } from '@/pages/Settings';
import { useAppSelector } from '@/store';
import cx from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './index.less';

const currentDay = dayjs();

export const Layout = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(currentDay);

  const { onBoardingStep } = useAppSelector();

  const { isLoading: isLoadingGetCategories } = useGetCategories();
  const { isLoading: isLoadingGetBalance } = useGetBalance();
  const { isLoading: isLoadingGetSavingGoals } = useGetSavingGoals();
  const { isLoading: isLoadingGetExpenses } = useGetExpenses(selectedDate);
  const { isLoading: isLoadingGetIncomes } = useGetIncomes(selectedDate);
  const { isLoading: isLoadingGetSavings } = useGetSavings(selectedDate);

  const handleChangeMonth = useCallback((date: Dayjs) => setSelectedDate(date), []);

  const isFirstLoading = useGetFirstLoading([
    isLoadingGetCategories,
    isLoadingGetBalance,
    isLoadingGetSavingGoals,
    isLoadingGetExpenses,
    isLoadingGetIncomes,
    isLoadingGetSavings,
  ]);

  if (isFirstLoading) {
    return <MainLoader />;
  }

  const cxSidebar = cx('layout__sidebar', {
    ['is-onboarding']: Boolean(onBoardingStep),
  });

  const isLoadingMain = isLoadingGetExpenses || isLoadingGetIncomes || isLoadingGetSavings;

  return (
    <div className="layout">
      <div className={cxSidebar}>
        <Sidebar />
      </div>
      <div className="layout__content">
        <PageTitle />

        <main>
          <Routes>
            <Route
              path="/*"
              element={<Main selectedDate={selectedDate} onChangeDate={handleChangeMonth} isLoading={isLoadingMain} />}
            />
            <Route path={ROUTES.CATEGORIES} element={<Categories />} />
            <Route path={ROUTES.SAVING_GOALS} element={<SavingGoals />} />
            <Route path={ROUTES.SETTINGS} element={<Settings />} />
          </Routes>
        </main>
      </div>
      <div className="layout__user-widget">
        <UserWidget />
      </div>

      <OnBoarding />
    </div>
  );
};
