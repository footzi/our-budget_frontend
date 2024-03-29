import { ApiConfig, useQuery } from '@/api';
import { LOCAL_STORAGE_ITEMS } from '@/constants';
import { ROUTES } from '@/constants/routes';
import { Maybe, User, UserLocalStorage } from '@/interfaces';
import { removeUser, setUser, useAppDispatch } from '@/store';
import { LocalStorage } from '@/utils/localStorage';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { UseGetUserResult } from './interfaces';

/**
 * Hook for get user data
 */
export const useGetUser = (): UseGetUserResult => {
  const savedUser = LocalStorage.get<UserLocalStorage>(LOCAL_STORAGE_ITEMS.USER);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isLoading, data } = useQuery<{ user: Maybe<User> }>({
    config: ApiConfig.user,
    isSkip: !savedUser,
  });

  useEffect(() => {
    if (!savedUser) {
      dispatch(removeUser());

      if (pathname !== ROUTES.SIGNUP) {
        navigate(ROUTES.LOGIN);
      }
    }
    // navigate вызывает useEffect
    // eslint-disable-next-line
  }, [savedUser, dispatch]);

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
    }
  }, [data, dispatch]);

  return {
    isLoading,
  };
};
