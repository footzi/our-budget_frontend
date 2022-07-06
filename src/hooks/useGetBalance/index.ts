import { ApiConfig, useQuery } from '@/api';
import { Balance } from '@/interfaces';
import { setBalance, useAppDispatch, useAppSelector } from '@/store';
import { useEffect } from 'react';

import { UseGetBalanceResult } from './interfases';

export const useGetBalance = (): UseGetBalanceResult => {
  const { user } = useAppSelector();
  const dispatch = useAppDispatch();

  const { isLoading, data } = useQuery<{ balance: Balance }>({
    config: ApiConfig.balance,
    isSkip: !user,
  });

  useEffect(() => {
    if (data?.balance) {
      dispatch(setBalance({ value: data.balance, isLoading }));
    }
  }, [dispatch, isLoading, data]);

  return { isLoading };
};
