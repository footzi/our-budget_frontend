import { useAppSelector } from '@/store';
import { useMemo } from 'react';

import { UseGetSavingsAnalyticsResult } from './interfaces';
import { formatToTableSavingsAnalytics } from './utils/formatToTableSavingsAnalytics';
import { getTotalByCategoriesAnalytics } from './utils/getTotalByCategoriesAnalytics';

export const useGetSavingsAnalytics = (): UseGetSavingsAnalyticsResult => {
  const { savingGoals, savings } = useAppSelector();

  const renderSavings = useMemo(
    () => formatToTableSavingsAnalytics(savingGoals.value, savings.fact.list),
    [savingGoals.value, savings.fact.list]
  );
  const total = useMemo(() => getTotalByCategoriesAnalytics(renderSavings), [renderSavings]);

  return {
    savings: renderSavings,
    total,
  };
};
