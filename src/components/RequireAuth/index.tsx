import { LOCAL_STORAGE_ITEMS } from '@/constants';
import { ROUTES } from '@/constants/routes';
import { LocalStorage } from '@/utils/localStorage';
import React, { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// @ts-ignore
export const RequireAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const user = LocalStorage.get(LOCAL_STORAGE_ITEMS.USER);
  const location = useLocation();

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};
