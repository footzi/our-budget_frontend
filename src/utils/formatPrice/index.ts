/**
 * Форматирует строку стоимости по ru стандарту (10000 -> 10 000)
 *
 * @param {number} price - стоимость
 */
export const formatPrice = (price: number): string =>
  price ? new Intl.NumberFormat('ru-RU').format(price) + ' ₽' : '';
