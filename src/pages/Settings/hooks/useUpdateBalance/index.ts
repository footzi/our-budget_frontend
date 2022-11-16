import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { ProfileEditableValue } from '../../interfaces';
import { UseUpdateBalanceResult } from './interfaces';

export const useUpdateBalance = (): UseUpdateBalanceResult => {
  const { isLoading, executePut } = useMutation({ config: ApiConfig.updateBalance });

  const update = useCallback(
    async (value: ProfileEditableValue) => {
      await executePut({
        data: {
          common: value,
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
