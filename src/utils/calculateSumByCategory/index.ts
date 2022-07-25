import { Category, Expense } from '@/interfaces';
import { calculateSumItems } from '@/utils/calculateSumItems';

/**
 * Возвращает общую сумму айтемов по определенной категории
 */
export const calculateSumByCategory = (category: Category, items: Expense[]): number => {
  const itemsByCategory = items.filter((item) => item.category.id === category.id);

  return calculateSumItems(itemsByCategory);
};
