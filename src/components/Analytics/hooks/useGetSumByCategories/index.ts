import { CATEGORIES_TYPES } from '@/constants';
import { Expense, Income, SumByCategory } from '@/interfaces';
import { useAppSelector } from '@/store';
import { useMemo } from 'react';

export const getSumItems = (items: Income[] | Expense[]) => {
  return items.reduce((acc: number, item) => {
    return acc + item.value;
  }, 0);
};

export const useGetSumByCategories = (categoryType: CATEGORIES_TYPES) => {
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
        const sum = getSumItems(items);

        acc.push({
          category: category,
          sum,
        });

        return acc;
      }, []),
    [filteredCategories, values.fact.list]
  );
};
