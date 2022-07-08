import { ApiConfig, useQuery } from '@/api';
import { LocalStorageItems } from '@/constants';
import { ROUTES } from '@/constants/routes';
import { Maybe, User, UserLocalStorage } from '@/interfaces';
import { removeUser, setUser, useAppDispatch } from '@/store';
import { LocalStorage } from '@/utils/localStorage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseGetUserResult } from './interfaces';

/**
 * Hook for get user data
 */
export const useGetUser = (): UseGetUserResult => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, refetch: getUser } = useQuery<{ user: Maybe<User> }>({
    config: ApiConfig.user,
    options: {
      manual: true,
    },
  });

  useEffect(() => {
    (async () => {
      const savedUser = LocalStorage.get<UserLocalStorage>(LocalStorageItems.USER);

      if (!savedUser) {
        dispatch(setUser(null));
        return navigate(ROUTES.LOGIN);
      }

      try {
        const response = await getUser({
          data: {
            id: savedUser.id,
          },
        });

        if (response?.data?.user) {
          dispatch(setUser(response.data.user));
        }
      } catch (e) {
        dispatch(removeUser());
        navigate(ROUTES.LOGIN);
      }
    })();
    // navigate вызывает useEffect
    // eslint-disable-next-line
  }, [getUser, dispatch]);

  return {
    isLoading,
  };
};
