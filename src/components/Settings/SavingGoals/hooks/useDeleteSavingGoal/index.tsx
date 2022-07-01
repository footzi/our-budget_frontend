import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UseDeleteSavingGoalResult } from './interfaces';

export const useDeleteSavingGoal = (): UseDeleteSavingGoalResult => {
  const { isLoading, executePut } = useMutation({ config: ApiConfig.deleteSavingGoals });

  const remove = useCallback(async (id: number) => {
    await executePut({
      data: {
        id,
      },
    });
  }, []);

  return {
    isLoading,
    remove,
  };
};
