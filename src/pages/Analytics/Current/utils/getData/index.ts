import { CURRENCIES_TYPE } from '@/constants';
import { CurrenciesValues } from '@/interfaces';

import { LABELS, MAIN_COLORS } from '../../../constants';

export const getData = (values: CurrenciesValues[], currency: CURRENCIES_TYPE) => {
  const data = values.map((item) => item[currency] ?? 0);

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
