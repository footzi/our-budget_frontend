import { CURRENCIES_TYPE, OPTIONS_CURRENCIES } from '@/constants';
import { CurrencyOption } from '@/interfaces';

/**
 * Возвращает опции для селекта выбора валюты
 */
export const getOptionsCurrencies = (
  currencies: CURRENCIES_TYPE[] = [],
  goalCurrency?: CURRENCIES_TYPE
): CurrencyOption[] => {
  const currenciesOptions = currencies.reduce((acc: CurrencyOption[], currency: CURRENCIES_TYPE) => {
    const option = OPTIONS_CURRENCIES.find((option) => option.value === currency);

    if (option) {
      acc.push(option);
    }

    return acc;
  }, []);
  return goalCurrency ? currenciesOptions.filter((item) => item.value === goalCurrency) : currenciesOptions;
};
