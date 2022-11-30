import { CURRENCIES_TYPE } from '@/constants';
import { formatPrice } from '@/utils/formatPrice';
import { ChartOptions } from 'chart.js';

import { FACTS_ANALYTICS_OPTIONS } from '../../constants';

export const getOptions = (currency: CURRENCIES_TYPE): ChartOptions => {
  return {
    ...FACTS_ANALYTICS_OPTIONS,
    plugins: {
      ...FACTS_ANALYTICS_OPTIONS.plugins,
      tooltip: {
        callbacks: {
          //@ts-ignore
          label: (context: { raw: number }) => formatPrice(context.raw, currency),
        },
      },
    },
  };
};
