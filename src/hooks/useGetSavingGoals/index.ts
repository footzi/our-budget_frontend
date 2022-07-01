import { ApiConfig, useQuery } from '@/api';
import { setSavingGoal, useAppContext } from '@/context';
import { Maybe, SavingGoal } from '@/interfaces';
import { useEffect } from 'react';

import { UseGetSavingGoalsResult } from './interfaces';

export const useGetSavingGoals = (): UseGetSavingGoalsResult => {
  const { dispatch, user } = useAppContext();

  const { isLoading, data, refetch } = useQuery<{ savingGoals: Maybe<SavingGoal[]> }>({
    config: ApiConfig.savingGoals,
    isSkip: !user,
  });

  useEffect(() => {
    if (data?.savingGoals) {
      dispatch(setSavingGoal(data.savingGoals, refetch, isLoading));
    }
  }, [data]);

  return { isLoading };
};
