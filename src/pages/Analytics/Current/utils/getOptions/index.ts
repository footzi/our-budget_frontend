import { CURRENCIES_TYPE } from '@/constants';
import { formatPrice } from '@/utils/formatPrice';

import { CURRENT_ANALYTICS_OPTIONS } from '../../constants';

// eslint-disable-next-line
export const getOptions = (currency: CURRENCIES_TYPE): any => {
  return {
    ...CURRENT_ANALYTICS_OPTIONS,
    scales: {
      y: {
        ticks: {
          callback: (value: number) => formatPrice(value, currency),
        },
      },
    },
    plugins: {
      ...CURRENT_ANALYTICS_OPTIONS.plugins,
      tooltip: {
        callbacks: {
          label: (context: { raw: number }) => formatPrice(context.raw, currency),
        },
      },
    },
  };
};
