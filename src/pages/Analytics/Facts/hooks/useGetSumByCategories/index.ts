import { CATEGORIES_TYPES, DEFAULT_CURRENCY } from '@/constants';
import { SumByCategory } from '@/interfaces';
import { useAppSelector } from '@/store';
import { calculateSumItems } from '@/utils/calculateSumItems';
import { useMemo } from 'react';

export const useGetSumByCategories = (categoryType: CATEGORIES_TYPES) => {
  const { incomes, expenses, categories } = useAppSelector();

  const values = categoryType === CATEGORIES_TYPES.INCOME ? incomes : expenses;

  const filteredCategories = useMemo(
    () => categories.value.filter((category) => category.type === categoryType),
    [categories.value, categoryType]
  );

  /** todo Очень похоже на calculateSumByCategory **/
  return useMemo(
    () =>
      filteredCategories.reduce((acc: SumByCategory[], category) => {
        const items = values.fact.list.filter((item) => item.category.id === category.id);
        const sum = calculateSumItems(items);

        acc.push({
          category: category,
          sum: sum[DEFAULT_CURRENCY] ?? 0,
        });

        return acc;
      }, []),
    [filteredCategories, values.fact.list]
  );
};
