import { ApiConfig, useQuery } from '@/api';
import { Maybe } from '@/interfaces';
import { setSavings, useAppDispatch } from '@/store';
import { Dayjs } from 'dayjs';
import { useEffect } from 'react';

import { SavingsResult, UseGetIncomesResult } from './interfases';

export const useGetSavings = (date: Maybe<Dayjs>): UseGetIncomesResult => {
  const start = date && date.format('YYYY-MM');
  const end = date && date.add(1, 'month').format('YYYY-MM');

  const dispatch = useAppDispatch();

  const { isLoading, data } = useQuery<{ savings: SavingsResult }>({
    config: ApiConfig.savings,
    params: { start, end },
    isSkip: !date,
  });

  useEffect(() => {
    if (data?.savings) {
      dispatch(setSavings(data.savings));
    }
  }, [data, dispatch]);

  return { isLoading };
};
