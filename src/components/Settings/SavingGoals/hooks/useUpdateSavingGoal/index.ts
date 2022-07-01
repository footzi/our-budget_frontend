import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { SavingGoalUpdateBody } from '../../interfaces';
import { UseUpdateSavingGoalResult } from './interfaces';

export const useUpdateSavingGoal = (): UseUpdateSavingGoalResult => {
  const { isLoading, executePut } = useMutation({ config: ApiConfig.updateSavingGoals });

  const update = useCallback(async (body: SavingGoalUpdateBody) => {
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
