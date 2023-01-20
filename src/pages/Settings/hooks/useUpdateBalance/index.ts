import { ApiConfig, useMutation } from '@/api';
import { CURRENCIES_TYPE } from '@/constants';
import { useCallback } from 'react';

import { UseUpdateBalanceResult } from './interfaces';

export const useUpdateBalance = (): UseUpdateBalanceResult => {
  const { isLoading, executePut } = useMutation({ config: ApiConfig.updateBalance });

  const update = useCallback(
    async (currency: CURRENCIES_TYPE, value: number) => {
      await executePut({
        data: {
          currency,
          value,
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
