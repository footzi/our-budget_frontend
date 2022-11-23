import { DEFAULT_CURRENCY } from '@/constants';
import { SumByCurrency } from '@/interfaces';

import { LABELS, MAIN_COLORS } from '../../../constants';

export const getData = (values: SumByCurrency[]) => {
  // @todo пока возвращаем только в рублях
  const data = values.map((item) => item[DEFAULT_CURRENCY]);

  return {
    labels: LABELS,
    datasets: [
      {
        data,
        backgroundColor: MAIN_COLORS,
      },
    ],
  };
};
