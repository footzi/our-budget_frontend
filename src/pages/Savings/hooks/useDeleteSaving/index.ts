import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UseDeleteSavingResult } from './interfaces';

export const useDeleteSaving = (isPlan = false): UseDeleteSavingResult => {
  const config = isPlan ? ApiConfig.deleteSavingPlan : ApiConfig.deleteSavingFact;
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
