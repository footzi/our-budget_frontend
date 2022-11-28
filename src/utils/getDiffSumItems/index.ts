import { CURRENCIES_TYPE } from '@/constants';
import { CurrenciesValues } from '@/interfaces';

/**
 * Возвращает разницу между сумм айтемов
 */
export const getDiffSumItems = (
  plan: CurrenciesValues,
  fact: CurrenciesValues,
  currencies: CURRENCIES_TYPE[]
): CurrenciesValues => {
  return currencies.reduce((acc: CurrenciesValues, currency) => {
    if (plan[currency] !== undefined || fact[currency] !== undefined) {
      const planValue = plan[currency] ?? 0;
      const factValue = fact[currency] ?? 0;

      acc[currency] = planValue - factValue;
    }

    return acc;
  }, {});
};
