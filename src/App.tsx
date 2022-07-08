import { Layout } from '@/components/Layout';
import { MainLoader } from '@/components/MainLoader';
import { useGetUser } from '@/hooks/useGetUser';
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
        <Route path="login" element={<LoginForm />} />
      </Route>
    </Routes>
  );
};
