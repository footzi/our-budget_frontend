import { MainLoader } from '@/components/MainLoader';
import { ROUTES } from '@/constants/routes';
import { useGetFirstLoading } from '@/hooks/useGetFirstLoading';
import { useGetUser } from '@/hooks/useGetUser';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RequireAuth } from './components/RequireAuth';

const Layout = React.lazy(() => import(/* webpackPrefetch: true */ './pages/Layout'));
const LoginForm = React.lazy(() => import(/* webpackPrefetch: true */ './modules/LoginForm'));
const SignUpForm = React.lazy(() => import(/* webpackPrefetch: true */ './modules/SignUpForm'));

export const App = () => {
  const { isLoading } = useGetUser();
  const isFirstLoading = useGetFirstLoading([isLoading]);

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
        </Route>
      </Routes>
    </Suspense>
  );
};
