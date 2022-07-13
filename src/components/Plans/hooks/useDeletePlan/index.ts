import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UseDeletePlanResult } from './interfaces';

export const useDeletePlan = (isIncome = false): UseDeletePlanResult => {
  const config = isIncome ? ApiConfig.deleteIncomePlan : ApiConfig.deleteExpensePlan;
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
