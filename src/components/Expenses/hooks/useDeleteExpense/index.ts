import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UseDeleteExpenseResult } from './interfaces';

export const useDeleteExpense = (isPlan = false): UseDeleteExpenseResult => {
  const config = isPlan ? ApiConfig.deleteExpensePlan : ApiConfig.deleteExpenseFact;
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
