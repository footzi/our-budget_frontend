import { ApiConfig, useQuery } from '@/api';
import { setExpensesFact, setExpensesPlan, useAppDispatch } from '@/store';
import { Dayjs } from 'dayjs';
import { useEffect } from 'react';

import { ExpensesResult, UseGetExpensesResult } from './interfases';

export const useGetExpenses = (date: Dayjs): UseGetExpensesResult => {
  const start = date.format('YYYY-MM');
  const end = date.add(1, 'month').format('YYYY-MM');

  const dispatch = useAppDispatch();

  const { isLoading, data } = useQuery<{ expenses: ExpensesResult }>({
    config: ApiConfig.expenses,
    params: { start, end },
  });

  useEffect(() => {
    if (data?.expenses) {
      dispatch(setExpensesFact(data.expenses.fact));
      dispatch(setExpensesPlan(data.expenses.plan));
    }
  }, [data, dispatch]);

  return { isLoading };
};
