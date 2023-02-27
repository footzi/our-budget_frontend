import { ApiConfig, useMutation } from '@/api';
import { LOCAL_STORAGE_ITEMS } from '@/constants';
import { ROUTES } from '@/constants/routes';
import { UserLocalStorage } from '@/interfaces';
import { setUser, useAppDispatch } from '@/store';
import { LocalStorage } from '@/utils/localStorage';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignUpBody, UseSignUpQueryData } from './interfaces';

export const useSignUp = () => {
  const { isLoading, executePut } = useMutation<UseSignUpQueryData>({ config: ApiConfig.signUp });
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const signUp = useCallback(
    async (body: SignUpBody) => {
      const response = await executePut({
        data: {
          ...body,
        },
      });

      if (response?.data?.user && response?.data?.tokens && response.data.user.id) {
        const { accessToken, refreshToken } = response.data.tokens;

        LocalStorage.set<UserLocalStorage>(LOCAL_STORAGE_ITEMS.USER, {
          tokens: { accessToken, refreshToken },
          id: response.data.user.id,
          login: response.data.user.login,
        });
        dispatch(setUser(response.data.user));
        navigate(ROUTES.CATEGORIES);
      }
    },
    [executePut, dispatch, navigate]
  );

  return {
    signUp,
    isLoading,
  };
};
