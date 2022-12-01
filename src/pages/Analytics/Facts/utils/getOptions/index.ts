import { CURRENCIES_TYPE } from '@/constants';
import { formatPrice } from '@/utils/formatPrice';

import { FACTS_ANALYTICS_OPTIONS } from '../../constants';

// eslint-disable-next-line
export const getOptions = (currency: CURRENCIES_TYPE): any => {
  return {
    ...FACTS_ANALYTICS_OPTIONS,
    plugins: {
      ...FACTS_ANALYTICS_OPTIONS.plugins,
      tooltip: {
        callbacks: {
          label: (context: { raw: number }) => formatPrice(context.raw, currency),
        },
      },
    },
  };
};
