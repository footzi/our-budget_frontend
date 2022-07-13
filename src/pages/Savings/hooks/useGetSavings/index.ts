import { ApiConfig, useQuery } from '@/api';
import { Dayjs } from 'dayjs';

import { SavingsResult, UseGetIncomesResult } from './interfases';

export const useGetSavings = (date: Dayjs): UseGetIncomesResult => {
  const start = date.format('YYYY-MM');
  const end = date.add(1, 'month').format('YYYY-MM');

  const { isLoading, data, refetch } = useQuery<{ savings: SavingsResult }>({
    config: ApiConfig.savings,
    params: { start, end },
  });

  return { isLoading, savings: data?.savings ?? null, refetch };
};
