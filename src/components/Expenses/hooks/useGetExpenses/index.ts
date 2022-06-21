import { ApiConfig, useQuery } from '@/api';
import { Dayjs } from 'dayjs';

import { ExpensesResult, UseGetExpensesResult } from './interfases';

export const useGetExpenses = (date: Dayjs): UseGetExpensesResult => {
  const start = date.format('YYYY-MM');
  const end = date.add(1, 'month').format('YYYY-MM');

  const { isLoading, data, refetch } = useQuery<{ expenses: ExpensesResult }>({
    config: ApiConfig.expenses,
    params: { start, end },
  });

  return { isLoading, expenses: data?.expenses ?? null, refetch };
};
