import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UseUpdateBalanceResult } from './interfaces';

export const useUpdateBalance = (): UseUpdateBalanceResult => {
  const { isLoading, executePut } = useMutation({ config: ApiConfig.updateBalance });

  const update = useCallback(
    async (value: string) => {
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
