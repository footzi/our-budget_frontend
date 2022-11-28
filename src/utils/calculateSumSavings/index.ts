import { CurrenciesValues, Saving } from '@/interfaces';

/**
 * Возвращает сумму по копилках
 */
export const calculateSumSavings = (savings: Saving[]): CurrenciesValues => {
  return savings.reduce((acc: CurrenciesValues, item: Saving) => {
    const { currency, value } = item;

    // @todo исправить
    // @ts-ignore
    acc[currency] = acc[currency] ? acc[currency] + value : value;

    return acc;
  }, {});
};
