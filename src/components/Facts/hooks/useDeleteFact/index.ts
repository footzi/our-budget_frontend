import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UseDeleteFactResult } from './interfaces';

export const useDeleteFact = (isIncome = false): UseDeleteFactResult => {
  const config = isIncome ? ApiConfig.deleteIncomeFact : ApiConfig.deleteExpenseFact;
  const { isLoading, executePut } = useMutation({ config });

  const remove = useCallback(
    async (id: number) => {
      await executePut({
        data: {
          id,
        },
      });
    },
    [executePut]
  );

  return {
    isLoading,
    delete: remove,
  };
};
