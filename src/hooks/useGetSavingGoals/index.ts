import { ApiConfig, useQuery } from '@/api';
import { Maybe, SavingGoal } from '@/interfaces';
import { setSavingGoals, useAppDispatch } from '@/store';
import { useEffect } from 'react';

import { UseGetSavingGoalsResult } from './interfaces';

export const useGetSavingGoals = (): UseGetSavingGoalsResult => {
  const dispatch = useAppDispatch();

  const { isLoading, data } = useQuery<{ savingGoals: Maybe<SavingGoal[]> }>({
    config: ApiConfig.savingGoals,
  });

  useEffect(() => {
    if (data?.savingGoals) {
      dispatch(setSavingGoals({ value: data.savingGoals, isLoading }));
    }
  }, [data, isLoading, dispatch]);

  return { isLoading };
};
