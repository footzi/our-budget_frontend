import { Category, Item } from '@/interfaces';
import { calculateSumByCategory } from '@/utils/calculateSumByCategory';

import { AnalyticsCategoryRender } from '../../../../interfaces';

/**
 * Преобразует данные для отображение в аналитике по категориям
 */
export const formatToTableData = (categories: Category[], plans: Item[], facts: Item[]): AnalyticsCategoryRender[] => {
  return categories.map((category) => {
    const plan = calculateSumByCategory(category, plans);
    const fact = calculateSumByCategory(category, facts);

    const isPositive = fact <= plan;
    const diff = plan - fact;

    return {
      key: category.id,
      name: category.name,
      plan,
      fact,
      diff: {
        value: diff,
        isPositive,
      },
    };
  });
};
