import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UseUpdateUserBody, UseUpdateUserResult } from './interfaces';

export const useUpdateUser = (): UseUpdateUserResult => {
  const { isLoading, executePut } = useMutation({ config: ApiConfig.updateUser });

  const update = useCallback(
    async (body: UseUpdateUserBody) => {
      await executePut({
        data: body,
      });
    },
    [executePut]
  );

  return {
    isLoading,
    update,
  };
};
