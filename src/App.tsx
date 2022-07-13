import { MainLoader } from '@/components/MainLoader';
import { SignUpForm } from '@/components/SignUpForm';
import { ROUTES } from '@/constants/routes';
import { useGetUser } from '@/hooks/useGetUser';
import { Layout } from '@/pages/Layout';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoginForm } from './components/LoginForm';
import { RequireAuth } from './components/RequireAuth';

export const App = () => {
  const { isLoading } = useGetUser();

  if (isLoading) {
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
