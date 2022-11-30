import { CATEGORIES_TYPES, CURRENCIES_TYPE } from '@/constants';
import { SumByCategory } from '@/interfaces';
import { useAppSelector } from '@/store';
import { calculateSumItems } from '@/utils/calculateSumItems';
import { useMemo } from 'react';

export const useGetSumByCategories = (categoryType: CATEGORIES_TYPES, currency: CURRENCIES_TYPE) => {
  const { incomes, expenses, categories } = useAppSelector();

  const values = categoryType === CATEGORIES_TYPES.INCOME ? incomes : expenses;

  const filteredCategories = useMemo(
    () => categories.value.filter((category) => category.type === categoryType),
    [categories.value, categoryType]
  );

  return useMemo(
    () =>
      filteredCategories.reduce((acc: SumByCategory[], category) => {
        const items = values.fact.list.filter((item) => item.category.id === category.id);
        const sum = calculateSumItems(items);

        acc.push({
          category: category,
          sum: sum[currency] ?? 0,
        });

        return acc;
      }, []),
    [filteredCategories, values.fact.list, currency]
  );
};
