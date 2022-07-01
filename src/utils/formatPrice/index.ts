import { Maybe } from '@/interfaces';

/**
 * Форматирует строку стоимости по ru стандарту (10000 -> 10 000)
 */
export const formatPrice = (price: Maybe<number>): string =>
  price ? new Intl.NumberFormat('ru-RU').format(price) + ' ₽' : '0 ₽';
