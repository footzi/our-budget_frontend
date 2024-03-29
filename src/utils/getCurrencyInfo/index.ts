import { CURRENCIES, CURRENCIES_TYPE, DEFAULT_CURRENCY } from '@/constants';
import { Currency } from '@/interfaces';

/**
 * Возвращает информацию о валюте исходя из ее типа
 */
export const getCurrencyInfo = (currency?: CURRENCIES_TYPE): Currency =>
  currency && CURRENCIES[currency] ? CURRENCIES[currency] : CURRENCIES[DEFAULT_CURRENCY];
