import { ApiConfig, useQuery } from '@/api';
import { Dayjs } from 'dayjs';

import { IncomesResult, UseGetIncomesResult } from './interfases';

export const useGetIncomes = (date: Dayjs): UseGetIncomesResult => {
  const start = date.format('YYYY-MM');
  const end = date.add(1, 'month').format('YYYY-MM');

  const { isLoading, data, refetch } = useQuery<{ incomes: IncomesResult }>({
    config: ApiConfig.incomes,
    params: { start, end },
  });

  return { isLoading, incomes: data?.incomes ?? null, refetch };
};
