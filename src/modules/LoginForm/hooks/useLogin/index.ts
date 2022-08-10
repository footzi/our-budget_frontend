import { ApiConfig, useMutation } from '@/api';
import { LocalStorageItems } from '@/constants';
import { ROUTES } from '@/constants/routes';
import { UserLocalStorage } from '@/interfaces';
import { setUser, useAppDispatch } from '@/store';
import { LocalStorage } from '@/utils/localStorage';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseLoginQueryData } from './interfaces';

export const useLogin = () => {
  const { isLoading, executePut } = useMutation<UseLoginQueryData>({ config: ApiConfig.login });
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const login = useCallback(
    async (login: string, password: string) => {
      const response = await executePut({
        data: {
          login,
          password,
        },
      });

      if (response?.data?.user && response?.data?.tokens && response.data.user.id) {
        const { accessToken, refreshToken } = response.data.tokens;

        LocalStorage.set<UserLocalStorage>(LocalStorageItems.USER, {
          tokens: { accessToken, refreshToken },
          id: response.data.user.id,
        });
        dispatch(setUser(response.data.user));
        navigate(ROUTES.MAIN);
      }
    },
    [executePut, dispatch, navigate]
  );

  return {
    login,
    isLoading,
  };
};
