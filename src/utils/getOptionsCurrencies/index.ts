import { CURRENCIES_TYPE, OPTIONS_CURRENCIES } from '@/constants';
import { CurrencyOption } from '@/interfaces';

/**
 * Возвращает опции для селекта выбора валюты
 */
export const getOptionsCurrencies = (
  currencies: CURRENCIES_TYPE[] = [],
  goalCurrency?: CURRENCIES_TYPE
): CurrencyOption[] => {
  const currenciesOptions = OPTIONS_CURRENCIES.filter((item) => currencies.includes(item.value));

  return goalCurrency ? currenciesOptions.filter((item) => item.value === goalCurrency) : currenciesOptions;
};
