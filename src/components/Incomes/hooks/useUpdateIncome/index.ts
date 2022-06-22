import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UseUpdateIncomeBody, UseUpdateIncomeResult } from './interfaces';

export const useUpdateIncome = (isPlan: boolean = false): UseUpdateIncomeResult => {
  const config = isPlan ? ApiConfig.updateIncomePlan : ApiConfig.updateIncomeFact;
  const { isLoading, executePut } = useMutation({ config });

  const update = useCallback(async (body: UseUpdateIncomeBody) => {
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
