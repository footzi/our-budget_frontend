import { ApiConfig, useQuery } from '@/api';
import { Maybe } from '@/interfaces';
import { setIncomesFact, setIncomesPlan, useAppDispatch } from '@/store';
import { Dayjs } from 'dayjs';
import { useEffect } from 'react';

import { IncomesResult, UseGetIncomesResult } from './interfases';

export const useGetIncomes = (date: Maybe<Dayjs>): UseGetIncomesResult => {
  const start = date && date.format('YYYY-MM');
  const end = date && date.add(1, 'month').format('YYYY-MM');

  const dispatch = useAppDispatch();

  const { isLoading, data } = useQuery<{ incomes: IncomesResult }>({
    config: ApiConfig.incomes,
    params: { start, end },
    isSkip: !date,
  });

  useEffect(() => {
    if (data?.incomes) {
      dispatch(setIncomesFact(data.incomes.fact));
      dispatch(setIncomesPlan(data.incomes.plan));
    }
  }, [data, dispatch]);

  return { isLoading };
};
