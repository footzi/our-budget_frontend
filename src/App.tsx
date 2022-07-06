import { Layout } from '@/components/Layout';
import { useGetBalance } from '@/hooks/useGetBalance';
import { useGetCategories } from '@/hooks/useGetCategories';
import { useGetSavingGoals } from '@/hooks/useGetSavingGoals';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoginForm } from './components/LoginForm';
import { useGetUser } from './hooks/useGetUser';

export const App = () => {
  const { isLoading } = useGetUser();
  const { isLoading: isLoadingGetCategories } = useGetCategories();
  const { isLoading: isLoadingBalance } = useGetBalance();
  const { isLoading: isLoadingSavingGoals } = useGetSavingGoals();

  // const isProcessing = isLoading || isLoadingGetCategories || isLoadingBalance || isLoading || isLoadingSavingGoals;

  // if (isProcessing) {
  //   return <div>Загрузка</div>;
  // }

  return (
    <Routes>
      <Route>
        <Route path="/*" element={<Layout />} />
        <Route path="login" element={<LoginForm />} />
      </Route>
    </Routes>
  );
};
