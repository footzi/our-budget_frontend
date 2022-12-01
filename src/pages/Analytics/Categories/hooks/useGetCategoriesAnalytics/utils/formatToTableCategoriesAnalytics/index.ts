import { CURRENCIES_TYPE } from '@/constants';
import { Category, Item } from '@/interfaces';
import { calculateSumByCategory } from '@/utils/calculateSumByCategory';
import { getDiffSumItems } from '@/utils/getDiffSumItems';
import { getIsEmptyObject } from '@/utils/getIsEmptyObject';
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
  return categories.reduce((acc: AnalyticsCategoryRender[], category: Category) => {
    const plan = calculateSumByCategory(category, plans);
    const fact = calculateSumByCategory(category, facts);

    if (getIsEmptyObject(plan) && getIsEmptyObject(fact)) {
      return acc;
    }

    const item = {
      key: category.id,
      name: category.name,
      plan: sortByCurrencies(plan, currencies),
      fact: sortByCurrencies(fact, currencies),
      diff: getDiffSumItems(plan, fact, currencies),
    };

    acc.push(item);

    return acc;
  }, []);
};
