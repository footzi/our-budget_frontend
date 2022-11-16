import { CURRENCIES_TYPE, OPTIONS_CURRENCIES } from '@/constants';

/**
 * Возвращает опции для селекта выбора валюты
 */
export const getOptionsCurrencies = (currencies: CURRENCIES_TYPE[]) => {
  if (!currencies) return [];
  return OPTIONS_CURRENCIES.filter((item) => currencies.includes(item.value));
};
