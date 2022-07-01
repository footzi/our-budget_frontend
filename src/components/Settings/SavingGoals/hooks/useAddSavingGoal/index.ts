import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { SavingGoalAddBody } from '../../interfaces';
import { UseAddSavingResult } from './interfaces';

export const useAddSavingGoal = (): UseAddSavingResult => {
  const { isLoading, executePut } = useMutation({ config: ApiConfig.addSavingGoals });

  const add = useCallback(async (body: SavingGoalAddBody) => {
    await executePut({
      data: { ...body },
    });
  }, []);

  return {
    isLoading,
    add,
  };
};
