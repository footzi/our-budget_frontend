import { CurrenciesValues, Saving } from '@/interfaces';

/**
 * Возвращает сумму по копилках
 */
export const calculateSumSavings = (savings: Saving[]): CurrenciesValues => {
  return savings.reduce((acc: CurrenciesValues, item: Saving) => {
    const { currency, value } = item;

    const cur = acc[currency];

    acc[currency] = cur ? cur + value : value;

    return acc;
  }, {});
};
