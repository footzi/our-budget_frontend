import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UseSaveIncomeBody, UseSaveIncomeResult } from './interfaces';

export const useSaveIncome = (isPlan: boolean = false): UseSaveIncomeResult => {
  const config = isPlan ? ApiConfig.saveIncomePlan : ApiConfig.saveIncomeFact;
  const { isLoading, executePut } = useMutation({ config });

  const save = useCallback(async (body: UseSaveIncomeBody) => {
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
