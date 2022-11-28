import { Category, CurrenciesValues, Expense } from '@/interfaces';
import { calculateSumItems } from '@/utils/calculateSumItems';

/**
 * Возвращает общую сумму айтемов в разрезе валют по определенной категории
 */
export const calculateSumByCategory = (category: Category, items: Expense[]): CurrenciesValues => {
  const itemsByCategory = items.filter((item) => item.category.id === category.id);

  return calculateSumItems(itemsByCategory);
};
