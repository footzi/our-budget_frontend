import { Layout } from '@/components/Layout';
import { useGetUser } from '@/hooks/useGetUser';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoginForm } from './components/LoginForm';
import { RequireAuth } from './components/RequireAuth';

export const App = () => {
  useGetUser();

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
