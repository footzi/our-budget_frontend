import { Item } from '@/interfaces';

/**
 * Возвращает сумму айтемов
 */
export const calculateSumItems = (items: Item[]): number => items.reduce((acc, item) => acc + item.value, 0);
