import { Saving } from '@/interfaces';

/**
 * Возвращает сумму по копилках
 */
export const calculateSumSavings = (savings: Saving[]): number => savings.reduce((acc, item) => acc + item.value, 0);
