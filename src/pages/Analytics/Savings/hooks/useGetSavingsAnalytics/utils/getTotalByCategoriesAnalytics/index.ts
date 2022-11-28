import { CURRENCIES_TYPE, SAVING_ACTION_TYPE } from '@/constants';
import { Saving } from '@/interfaces';
import { AnalyticsSavingTotal } from '@/pages/Analytics/Savings/interfaces';
import { calculateSumSavings } from '@/utils/calculateSumSavings';
import { getDiffSumItems } from '@/utils/getDiffSumItems';
import { sortByCurrencies } from '@/utils/sortByCurrencies';

/**
 * Рассчитывает итоговые положили/вынули по всем копилкам
 */
export const getTotalByCategoriesAnalytics = (
  savings: Saving[],
  currencies: CURRENCIES_TYPE[]
): AnalyticsSavingTotal => {
  const income = savings.filter((saving) => saving.actionType === SAVING_ACTION_TYPE.INCOME);
  const expense = savings.filter((saving) => saving.actionType === SAVING_ACTION_TYPE.EXPENSE);

  const incomeSum = calculateSumSavings(income);
  const expenseSum = calculateSumSavings(expense);
  const diff = getDiffSumItems(incomeSum, expenseSum, currencies);

  return {
    income: sortByCurrencies(incomeSum, currencies),
    expense: sortByCurrencies(expenseSum, currencies),
    diff,
  };
};
