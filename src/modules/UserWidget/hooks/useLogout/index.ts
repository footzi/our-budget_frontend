import { ApiConfig, useMutation } from '@/api';
import { UseMutationSuccessResult } from '@/api/interfaces';
import { LocalStorageItems } from '@/constants';
import { ROUTES } from '@/constants/routes';
import { setUser, useAppDispatch } from '@/store';
import { LocalStorage } from '@/utils/localStorage';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseLogoutResult } from './interfaces';

export const useLogout = (): UseLogoutResult => {
  const { isLoading, executePut } = useMutation<UseMutationSuccessResult>({ config: ApiConfig.logout });
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const logout = useCallback(async () => {
    const response = await executePut();

    if (response?.data?.success) {
      LocalStorage.remove(LocalStorageItems.USER);
      dispatch(setUser(null));
      navigate(ROUTES.LOGIN);
    }
  }, [executePut, dispatch, navigate]);

  return {
    logout,
    isLoading,
  };
};
