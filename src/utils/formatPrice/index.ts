import { Maybe } from '@/interfaces';

/**
 * Форматирует строку стоимости по ru стандарту (10000 -> 10 000)
 */
export const formatPrice = (price: Maybe<number>): string => {
  if (!price) {
    return '0 ₽';
  }

  const result = new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

  // Добавляет пробел для отрицательных чиселы
  if (result[0] === '-') {
    return result.replace(new RegExp('-', 'g'), '- ');
  }

  return result;
};
