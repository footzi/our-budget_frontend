import { ApiConfig, useQuery } from '@/api';
import { LocalStorageItems } from '@/constants';
import { ROUTES } from '@/constants/routes';
import { Maybe, User, UserLocalStorage } from '@/interfaces';
import { removeUser, setUser, useAppDispatch } from '@/store';
import { LocalStorage } from '@/utils/localStorage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseGetUserResult } from './interfaces';

/**
 * Hook for get user data
 */
export const useGetUser = (): UseGetUserResult => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { refetch: getUser } = useQuery<{ user: Maybe<User> }>({
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
        setIsLoading(false);
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
      } finally {
        setIsLoading(false);
      }
    })();
    // navigate вызывает useEffect
    // eslint-disable-next-line
  }, [dispatch]);

  return {
    isLoading,
  };
};
