import { CurrenciesValues, Item } from '@/interfaces';

/**
 * Возвращает сумму айтемов в разрезе валют
 */
export const calculateSumItems = (items: Item[]): CurrenciesValues => {
  return items.reduce((acc: CurrenciesValues, item: Item) => {
    const { currency, value } = item;

    // @todo исправить
    // @ts-ignore
    acc[currency] = acc[currency] ? acc[currency] + value : value;

    return acc;
  }, {});
};
