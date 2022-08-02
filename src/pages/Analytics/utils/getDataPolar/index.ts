import { SumByCategory } from '@/interfaces';

import { CATEGORY_COLORS } from '../../constants';

export const getDataPolar = (items: SumByCategory[]) => {
  return {
    labels: items.map((item) => item.category.name),
    datasets: [
      {
        data: items.map((item) => item.sum),
        backgroundColor: CATEGORY_COLORS,
      },
    ],
  };
};
