import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UseDeleteIncomeResult } from './interfaces';

export const useDeleteIncome = (isPlan: boolean = false): UseDeleteIncomeResult => {
  const config = isPlan ? ApiConfig.deleteIncomePlan : ApiConfig.deleteIncomeFact;
  const { isLoading, executePut } = useMutation({ config });

  const remove = useCallback(async (id: number) => {
    await executePut({
      data: {
        id,
      },
    });
  }, []);

  return {
    isLoading,
    delete: remove,
  };
};
