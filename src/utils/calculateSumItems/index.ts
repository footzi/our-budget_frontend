import { CurrenciesValues, Item } from '@/interfaces';

/**
 * Возвращает сумму айтемов в разрезе валют
 */
export const calculateSumItems = (items: Item[]): CurrenciesValues => {
  return items.reduce((acc: CurrenciesValues, item: Item) => {
    const { currency, value } = item;

    const cur = acc[currency];

    acc[currency] = cur ? cur + value : value;

    return acc;
  }, {});
};
