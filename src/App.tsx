import { Layout } from '@/components/Layout';
import { useGetBalance } from '@/hooks/useGetBalance';
import { useGetCategories } from '@/hooks/useGetCategories';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoginForm } from './components/LoginForm';
import { useGetUser } from './hooks/useGetUser';

export const App = () => {
  const { isLoading } = useGetUser();
  const { isLoading: isLoadingGetCategories } = useGetCategories();
  const { isLoading: isLoadingBalance } = useGetBalance();

  const isProcessing = isLoading || isLoadingGetCategories || isLoadingBalance || isLoading;

  if (isProcessing) {
    return <div>Загрузка</div>;
  }

  return (
    <Routes>
      <Route path="/*" element={<Layout />} />
      <Route path="login" element={<LoginForm />} />
    </Routes>
  );
};
