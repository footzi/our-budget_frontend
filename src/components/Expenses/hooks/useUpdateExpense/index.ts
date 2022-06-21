import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UseUpdateExpenseBody, UseUpdateExpenseResult } from './interfaces';

export const useUpdateExpense = (isPlan: boolean = false): UseUpdateExpenseResult => {
  const config = isPlan ? ApiConfig.updateExpensePlan : ApiConfig.updateExpenseFact;
  const { isLoading, executePut } = useMutation({ config });

  const update = useCallback(async (body: UseUpdateExpenseBody) => {
    await executePut({
      data: {
        ...body,
      },
    });
  }, []);

  return {
    isLoading,
    update,
  };
};
