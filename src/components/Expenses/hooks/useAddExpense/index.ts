import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { AddExpenseBody } from '../../interfaces';
import { UseAddExpenseResult } from './interfaces';

export const useAddExpense = (isPlan: boolean = false): UseAddExpenseResult => {
  const config = isPlan ? ApiConfig.addExpensePlan : ApiConfig.addExpenseFact;
  const { isLoading, executePut } = useMutation({ config });

  const add = useCallback(async (body: AddExpenseBody) => {
    await executePut({
      data: {
        ...body,
      },
    });
  }, []);

  return {
    isLoading,
    add,
  };
};
