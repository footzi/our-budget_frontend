import { CURRENCIES_TYPE } from '@/constants';
import { formatPrice } from '@/utils/formatPrice';
import cx from 'classnames';
import React from 'react';

import './index.less';
import { CurrenciesListProps } from './interfaces';

export const CurrenciesList: React.FC<CurrenciesListProps> = ({ values, isDiff = false }) => {
  const currencies = Object.keys(values) as CURRENCIES_TYPE[];

  if (currencies.length === 0) {
    return <>—</>;
  }

  return (
    <>
      {currencies.map((currency: CURRENCIES_TYPE) => {
        const value = values[currency] ?? 0;
        const cxState = isDiff
          ? cx('currencies-list', {
              'currencies-list_positive': value > 0,
              'currencies-list_negative': value < 0,
            })
          : undefined;

        return (
          <div key={currency} className={cxState}>
            {formatPrice(value, currency)}
          </div>
        );
      })}
    </>
  );
};
