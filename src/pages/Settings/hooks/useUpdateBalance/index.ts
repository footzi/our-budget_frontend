import { ApiConfig, useMutation } from '@/api';
import { CURRENCIES_TYPE } from '@/constants';
import { useCallback } from 'react';

import { ProfileEditableValue } from '../../interfaces';
import { UseUpdateBalanceResult } from './interfaces';

export const useUpdateBalance = (): UseUpdateBalanceResult => {
  const { isLoading, executePut } = useMutation({ config: ApiConfig.updateBalance });

  const update = useCallback(
    async (value: ProfileEditableValue, currency: CURRENCIES_TYPE) => {
      await executePut({
        data: {
          [currency]: value,
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
