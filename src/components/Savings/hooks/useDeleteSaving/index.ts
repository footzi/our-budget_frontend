import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UseDeleteSavingResult } from './interfaces';

export const useDeleteSaving = (isPlan: boolean = false): UseDeleteSavingResult => {
  const config = isPlan ? ApiConfig.deleteSavingPlan : ApiConfig.deleteSavingFact;
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
