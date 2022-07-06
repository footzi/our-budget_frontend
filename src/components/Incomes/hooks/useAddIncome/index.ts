import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { AddIncomeBody } from '../../interfaces';
import { UseAddIncomeResult } from './interfaces';

export const useAddIncome = (isPlan = false): UseAddIncomeResult => {
  const config = isPlan ? ApiConfig.addIncomePlan : ApiConfig.addIncomeFact;
  const { isLoading, executePut } = useMutation({ config });

  const add = useCallback(
    async (body: AddIncomeBody) => {
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
    add,
  };
};
