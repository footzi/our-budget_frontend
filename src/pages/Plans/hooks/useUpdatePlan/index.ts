import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UpdatePlanBody } from '../../interfaces';
import { UseUpdatePlanResult } from './interfaces';

export const useUpdatePlan = (isIncome = false): UseUpdatePlanResult => {
  const config = isIncome ? ApiConfig.updateIncomePlan : ApiConfig.updateExpensePlan;
  const { isLoading, executePut } = useMutation({ config });

  const update = useCallback(
    async (body: UpdatePlanBody) => {
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
    update,
  };
};
