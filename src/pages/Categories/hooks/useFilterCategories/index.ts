import { CATEGORIES_TYPES } from '@/constants';
import { Category } from '@/interfaces';
import { useAppSelector } from '@/store';
import dayjs from 'dayjs';

import { CategoryRender } from '../../interfaces';
import { UseFilterCategoriesResult } from './interfaces';

export const formatTableData = (category: Category): CategoryRender => {
  const start = category.startDate ? dayjs(category.startDate).format('MM.YYYY') : null;
  const end = category.endDate ? dayjs(category.endDate).format('MM.YYYY') : null;

  return {
    ...category,
    key: category.id,
    period: start && end ? `${start} - ${end}` : '',
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
