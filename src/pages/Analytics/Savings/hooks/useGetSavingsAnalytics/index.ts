import { useAppSelector } from '@/store';
import { useMemo } from 'react';

import { UseGetSavingsAnalyticsResult } from './interfaces';
import { formatToTableSavingsAnalytics } from './utils/formatToTableSavingsAnalytics';
import { getTotalByCategoriesAnalytics } from './utils/getTotalByCategoriesAnalytics';

export const useGetSavingsAnalytics = (): UseGetSavingsAnalyticsResult => {
  const { savingGoals, savings, user } = useAppSelector();
  const currencies = useMemo(() => user?.currencies ?? [], [user]);

  const renderSavings = useMemo(
    () => formatToTableSavingsAnalytics(savingGoals.value, savings.fact.list, currencies),
    [savingGoals.value, savings.fact.list, currencies]
  );
  const total = useMemo(() => getTotalByCategoriesAnalytics(savings.fact.list, currencies), [savings, currencies]);

  return {
    savings: renderSavings,
    total,
  };
};
