import { SumByCategory } from '@/interfaces';

import { POLAR_COLORS } from '../../constants';

export const getDataPolar = (items: SumByCategory[]) => {
  return {
    labels: items.map((item) => item.category.name),
    datasets: [
      {
        data: items.map((item) => item.sum),
        backgroundColor: POLAR_COLORS,
      },
    ],
  };
};
