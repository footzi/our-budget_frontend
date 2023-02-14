import { CURRENCIES_TYPE } from '@/constants';
import { CurrenciesValues } from '@/interfaces';

export const getIsChangedBalance = (oldValue: CurrenciesValues, newValue: CurrenciesValues) => {
  return Object.keys(oldValue).some((item) => {
    const currency = item as CURRENCIES_TYPE;

    return oldValue[currency] !== newValue[currency];
  });
};
