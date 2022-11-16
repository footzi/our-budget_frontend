import { ApiConfig, useMutation } from '@/api';
import { ProfileEditableValue } from '@/pages/Settings/interfaces';
import { useCallback } from 'react';

import { PROFILE_ITEM_TYPES } from '../../constants';
import { UseUpdateUserBody, UseUpdateUserResult } from './interfaces';

export const useUpdateUser = (): UseUpdateUserResult => {
  const { isLoading, executePut } = useMutation({ config: ApiConfig.updateUser });

  const update = useCallback(
    async (value: ProfileEditableValue, type: PROFILE_ITEM_TYPES) => {
      const body: UseUpdateUserBody = {};

      if (type === PROFILE_ITEM_TYPES.FIRST_NAME && typeof value === 'string') {
        body.firstName = value;
      }

      if (type === PROFILE_ITEM_TYPES.CURRENCY && Array.isArray(value)) {
        body.currencies = value;
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
