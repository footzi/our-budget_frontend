import React from 'react';

import { LoginForm } from './components/LoginForm';
import { useAppContext } from './context';
import { useGetUser } from './hooks/useGetUser';
import { Layout } from '@/components/Layout';
import { useGetCategories } from '@/hooks/useGetCategories';

export const App = () => {
  const { user } = useAppContext();
  const { isLoading: isLoadingGetCategories } = useGetCategories();
  const { isLoading } = useGetUser();

  const isProcessing = isLoading || isLoadingGetCategories;

  return (
    <>
      {isProcessing && <div className="app-loader">Загрузка</div>}
      {!isProcessing && <>{user ? <Layout /> : <LoginForm />}</>}
    </>
  );
};
