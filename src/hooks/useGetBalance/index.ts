import { ApiConfig, useQuery } from '@/api';
import { setBalance, useAppContext } from '@/context';
import { Balance } from '@/interfaces';
import { Dayjs } from 'dayjs';
import { useEffect } from 'react';

import { UseGetBalanceResult } from './interfases';

export const useGetBalance = (date: Dayjs): UseGetBalanceResult => {
  const start = date.format('YYYY');
  const end = date.add(1, 'year').format('YYYY');

  const { dispatch } = useAppContext();

  const { isLoading, data, refetch } = useQuery<{ balance: Balance }>({
    config: ApiConfig.balance,
    params: { start, end },
  });

  useEffect(() => {
    if (data?.balance) {
      dispatch(setBalance(data.balance, refetch, isLoading));
    }
  }, [data]);

  return { isLoading };
};
