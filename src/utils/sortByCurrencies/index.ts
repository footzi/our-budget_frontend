import { CURRENCIES_TYPE } from '@/constants';
import { CurrenciesValues } from '@/interfaces';

/**
 * Cортирует список значений по порядку валют
 */
export const sortByCurrencies = (values: CurrenciesValues, currencies: CURRENCIES_TYPE[]): CurrenciesValues => {
  return currencies.reduce((acc: CurrenciesValues, currency: CURRENCIES_TYPE) => {
    if (values[currency] !== undefined) {
      acc[currency] = values[currency];
    }

    return acc;
  }, {});
};
