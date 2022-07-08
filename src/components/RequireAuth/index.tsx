import { LocalStorageItems } from '@/constants';
import { ROUTES } from '@/constants/routes';
import { LocalStorage } from '@/utils/localStorage';
import React, { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// @ts-ignore
export const RequireAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const user = LocalStorage.get(LocalStorageItems.USER);
  const location = useLocation();

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};
