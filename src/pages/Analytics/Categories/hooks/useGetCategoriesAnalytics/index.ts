import { CATEGORIES_TYPES } from '@/constants';
import { useAppSelector } from '@/store';
import { useMemo } from 'react';

import { formatToTableData } from './utils/formatToTableData';

/**
 * Хук возвращает данные для отображения в аналитике по категориям
 */
export const useGetCategoriesAnalytics = () => {
  const { categories, expenses } = useAppSelector();
  const expensesCategories = categories.value.filter((category) => category.type === CATEGORIES_TYPES.EXPENSE);

  return useMemo(
    () => formatToTableData(expensesCategories, expenses.plan.list, expenses.fact.list),
    [expenses.fact.list, expenses.plan.list, expensesCategories]
  );
};
