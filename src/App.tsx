import { MainLoader } from '@/components/MainLoader';
import { LOCAL_STORAGE_ITEMS } from '@/constants';
import { ROUTES } from '@/constants/routes';
import { useGetFirstLoading } from '@/hooks/useGetFirstLoading';
import { useGetUser } from '@/hooks/useGetUser';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import LoginForm from '@/modules/LoginForm';
import ResetPasswordForm from '@/modules/ResetPasswordForm';
import SignUpForm from '@/modules/SignUpForm';
import Layout from '@/pages/Layout';
import { LocalStorage } from '@/utils/localStorage';
import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RequireAuth } from './components/RequireAuth';

export const App = () => {
  const { isLoading } = useGetUser();
  const isFirstLoading = useGetFirstLoading([isLoading]);

  useEffect(() => {
    LocalStorage.remove(LOCAL_STORAGE_ITEMS.CARD_VALUES);
  }, []);

  useScrollToTop();

  if (isFirstLoading) {
    return <MainLoader />;
  }

  return (
    <Suspense>
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
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordForm />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
