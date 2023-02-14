import { ApiConfig, useMutation } from '@/api';
import { UseMutationSuccessResult } from '@/api/interfaces';
import { ROUTES } from '@/constants/routes';
import { removeUser, useAppDispatch } from '@/store';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChangePasswordBody, UseChangePasswordResult } from './interfaces';

export const useChangePassword = (): UseChangePasswordResult => {
  const { isLoading, executePut } = useMutation<UseMutationSuccessResult>({ config: ApiConfig.changePassword });
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const changePassword = useCallback(
    async (body: ChangePasswordBody) => {
      const response = await executePut({
        data: {
          ...body,
        },
      });

      if (response?.data?.success) {
        dispatch(removeUser());
        navigate(ROUTES.LOGIN);
      }
    },
    [executePut, dispatch, navigate]
  );

  return {
    changePassword,
    isLoading,
  };
};
