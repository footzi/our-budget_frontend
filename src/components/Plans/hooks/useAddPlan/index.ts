import { ApiConfig, useMutation } from '@/api';
import { AddPlanBody } from '@/components/Plans/interfaces';
import { useCallback } from 'react';

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
