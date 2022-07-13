import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { AddPlanBody } from '../../interfaces';
import { UseAddPlanResult } from './interfaces';

export const useAddPlan = (isIncome = false): UseAddPlanResult => {
  const config = isIncome ? ApiConfig.addIncomePlan : ApiConfig.addExpensePlan;

  const { isLoading, executePut } = useMutation({ config });

  const add = useCallback(
    async (body: AddPlanBody) => {
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
