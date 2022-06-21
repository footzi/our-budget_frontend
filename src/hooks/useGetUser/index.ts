import { LocalStorageItems } from '@/constants';

import { ApiConfig, useQuery } from '@/api';
import { removeUser, setUser, useAppContext } from '@/context';
import { Maybe, User, UserLocalStorage } from '@/interfaces';
import { useEffect } from 'react';
import { LocalStorage } from '@/utils/localStorage';

import { UseGetUserResult } from './interfaces';

/**
 * Хук получения пользователя
 */
export const useGetUser = (): UseGetUserResult => {
  const { dispatch } = useAppContext();

  const { isLoading, refetch: getUser } = useQuery<{ user: Maybe<User> }>({
    config: ApiConfig.user,
    options: {
      manual: true,
    },
  });

  useEffect(() => {
    (async () => {
      const savedUser = LocalStorage.get<UserLocalStorage>(LocalStorageItems.USER);

      if (savedUser) {
        const response = await getUser({
          data: {
            id: savedUser.id,
          },
        });

        if (response?.data?.user) {
          dispatch(setUser(response.data.user));
        } else {
          dispatch(removeUser());
        }
      }
    })();
  }, []);

  return {
    isLoading,
  };
};
