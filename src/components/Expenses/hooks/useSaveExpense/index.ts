import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UseSaveExpenseBody, UseSaveExpenseResult } from './interfaces';

export const useSaveExpense = (isPlan: boolean = false): UseSaveExpenseResult => {
  const config = isPlan ? ApiConfig.saveExpensePlan : ApiConfig.saveExpenseFact;
  const { isLoading, executePut } = useMutation({ config });

  const save = useCallback(async (body: UseSaveExpenseBody) => {
    await executePut({
      data: {
        ...body,
      },
    });
  }, []);

  return {
    isLoading,
    save,
  };
};
