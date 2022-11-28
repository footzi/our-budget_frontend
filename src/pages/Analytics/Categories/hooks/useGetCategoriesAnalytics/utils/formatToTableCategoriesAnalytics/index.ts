import { CURRENCIES_TYPE } from '@/constants';
import { Category, Item } from '@/interfaces';
import { calculateSumByCategory } from '@/utils/calculateSumByCategory';
import { getDiffSumItems } from '@/utils/getDiffSumItems';
import { sortByCurrencies } from '@/utils/sortByCurrencies';

import { AnalyticsCategoryRender } from '../../../../interfaces';

/**
 * Преобразует данные для отображение в аналитике по категориям
 */
export const formatToTableCategoriesAnalytics = (
  categories: Category[],
  plans: Item[],
  facts: Item[],
  currencies: CURRENCIES_TYPE[]
): AnalyticsCategoryRender[] => {
  return categories.map((category) => {
    const plan = calculateSumByCategory(category, plans);
    const fact = calculateSumByCategory(category, facts);

    return {
      key: category.id,
      name: category.name,
      plan: sortByCurrencies(plan, currencies),
      fact: sortByCurrencies(fact, currencies),
      diff: getDiffSumItems(plan, fact, currencies),
    };
  });
};
