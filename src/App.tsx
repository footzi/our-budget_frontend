import { MainLoader } from '@/components/MainLoader';
import { ROUTES } from '@/constants/routes';
import { useGetFirstLoading } from '@/hooks/useGetFirstLoading';
import { useGetUser } from '@/hooks/useGetUser';
import { SignUpForm } from '@/modules/SignUpForm';
import { Layout } from '@/pages/Layout';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { RequireAuth } from './components/RequireAuth';
import { LoginForm } from './modules/LoginForm';

export const App = () => {
  const { isLoading } = useGetUser();
  const isFirstLoading = useGetFirstLoading([isLoading]);

  if (isFirstLoading) {
    return <MainLoader />;
  }

  return (
    <Routes>
      <Route>
        <Route
          path="/*"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        />
        <Route path={ROUTES.LOGIN} element={<LoginForm />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpForm />} />
      </Route>
    </Routes>
  );
};
