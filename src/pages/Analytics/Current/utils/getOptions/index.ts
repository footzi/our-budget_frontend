import { CURRENCIES_TYPE } from '@/constants';
import { formatPrice } from '@/utils/formatPrice';
import { ChartOptions } from 'chart.js';

import { CURRENT_ANALYTICS_OPTIONS } from '../../constants';

export const getOptions = (currency: CURRENCIES_TYPE): ChartOptions => {
  return {
    ...CURRENT_ANALYTICS_OPTIONS,
    scales: {
      y: {
        ticks: {
          // @ts-ignore
          callback: (value: number) => formatPrice(value, currency),
        },
      },
    },
    plugins: {
      ...CURRENT_ANALYTICS_OPTIONS.plugins,
      tooltip: {
        callbacks: {
          // @ts-ignore
          label: (context: { raw: number }) => formatPrice(context.raw, currency),
        },
      },
    },
  };
};
