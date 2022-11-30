import { SumByCategory } from '@/interfaces';

import { CATEGORY_COLORS } from '../../../constants';

export const getData = (items: SumByCategory[]) => {
  const notEmptyItems = items.filter((item) => Boolean(item.sum));

  return {
    labels: notEmptyItems.map((item) => item.category.name),
    datasets: [
      {
        data: notEmptyItems.map((item) => item.sum),
        backgroundColor: CATEGORY_COLORS,
      },
    ],
  };
};
