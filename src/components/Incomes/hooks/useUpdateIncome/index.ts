import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UpdateIncomeBody } from '../../interfaces';
import { UseUpdateIncomeResult } from './interfaces';

export const useUpdateIncome = (isPlan = false): UseUpdateIncomeResult => {
  const config = isPlan ? ApiConfig.updateIncomePlan : ApiConfig.updateIncomeFact;
  const { isLoading, executePut } = useMutation({ config });

  const update = useCallback(
    async (body: UpdateIncomeBody) => {
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
