import { CATEGORIES_TYPES } from '@/constants';
import { useAppSelector } from '@/store';
import { useMemo } from 'react';

import { formatToTableCategoriesAnalytics } from './utils/formatToTableCategoriesAnalytics';

/**
 * Хук возвращает данные для отображения в аналитике по категориям
 */
export const useGetCategoriesAnalytics = () => {
  const { categories, expenses, user } = useAppSelector();
  const expensesCategories = categories.value.filter((category) => category.type === CATEGORIES_TYPES.EXPENSE);

  return useMemo(
    () =>
      formatToTableCategoriesAnalytics(
        expensesCategories,
        expenses.plan.list,
        expenses.fact.list,
        user?.currencies ?? []
      ),
    [expenses.fact.list, expenses.plan.list, expensesCategories, user]
  );
};
