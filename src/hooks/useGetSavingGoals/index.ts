import { ApiConfig, useQuery } from '@/api';
import { Maybe, SavingGoal } from '@/interfaces';
import { setSavingGoals, useAppDispatch, useAppSelector } from '@/store';
import { useEffect } from 'react';

import { UseGetSavingGoalsResult } from './interfaces';

export const useGetSavingGoals = (): UseGetSavingGoalsResult => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector();

  const { isLoading, data } = useQuery<{ savingGoals: Maybe<SavingGoal[]> }>({
    config: ApiConfig.savingGoals,
    isSkip: !user,
  });

  useEffect(() => {
    if (data?.savingGoals) {
      dispatch(setSavingGoals({ value: data.savingGoals, isLoading }));
    }
  }, [data, isLoading, dispatch]);

  return { isLoading };
};
