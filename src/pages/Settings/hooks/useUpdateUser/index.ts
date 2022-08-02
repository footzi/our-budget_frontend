import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { PROFILE_ITEM_TYPES } from '../../constants';
import { UseUpdateUserBody, UseUpdateUserResult } from './interfaces';

export const useUpdateUser = (): UseUpdateUserResult => {
  const { isLoading, executePut } = useMutation({ config: ApiConfig.updateUser });

  const update = useCallback(
    async (value: string, type: PROFILE_ITEM_TYPES) => {
      const body: UseUpdateUserBody = {};

      if (type === PROFILE_ITEM_TYPES.FIRST_NAME) {
        body.firstName = value;
      }

      await executePut({
        data: {
          ...body,
        },
      });
    },
    [executePut]
  );

  return {
    isLoading,
    update,
  };
};
