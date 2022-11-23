import { CURRENCIES_TYPE } from '@/constants';
import { Maybe } from '@/interfaces';
import { getCurrencyInfo } from '@/utils/getCurrencyInfo';

/**
 * Форматирует строку стоимости по ru стандарту (10000 -> 10 000)
 */

// @todo после основного сделать currency обязательным
export const formatPrice = (price: Maybe<number>, currency?: CURRENCIES_TYPE): string => {
  const { symbol } = getCurrencyInfo(currency);

  if (!price) {
    return `0 ${symbol}`;
  }

  const format = currency === CURRENCIES_TYPE.RUB ? 'ru-RU' : 'en-EN';

  const result = new Intl.NumberFormat(format).format(price) + ` ${symbol}`;

  // Добавляет пробел для отрицательных чиселы
  if (result[0] === '-') {
    return result.replace(new RegExp('-', 'g'), '- ');
  }

  return result;
};
