import { CATEGORIES_TYPES } from '@/constants';
import { Category } from '@/interfaces';
import { useAppSelector } from '@/store';

import { CategoryRender } from '../../interfaces';
import { UseFilterCategoriesResult } from './interfaces';

export const formatTableData = (category: Category): CategoryRender => {
  return {
    ...category,
    key: category.id,
  };
};

export const useFilterCategories = (): UseFilterCategoriesResult => {
  const { categories } = useAppSelector();

  const expense = categories.value
    .filter((category) => category.type === CATEGORIES_TYPES.EXPENSE)
    .map(formatTableData);
  const income = categories.value.filter((category) => category.type === CATEGORIES_TYPES.INCOME).map(formatTableData);

  return {
    expense,
    income,
  };
};
