import { CURRENCIES_TYPE, SAVING_ACTION_TYPE } from '@/constants';
import { Saving, SavingGoal } from '@/interfaces';
import { AnalyticsSavingRender } from '@/pages/Analytics/Savings/interfaces';
import { calculateSumSavings } from '@/utils/calculateSumSavings';
import { getDiffSumItems } from '@/utils/getDiffSumItems';

/**
 * Подготавливает данные для отображения в аналитике копилок
 */
export const formatToTableSavingsAnalytics = (
  savingsGoals: SavingGoal[],
  savings: Saving[],
  currencies: CURRENCIES_TYPE[]
): AnalyticsSavingRender[] => {
  return savingsGoals.map((goal) => {
    const currency = goal.currency;
    const currentSavings = savings.filter((saving) => saving.goal.id === goal.id);
    const incomeSavings = currentSavings.filter((saving) => saving.actionType === SAVING_ACTION_TYPE.INCOME);
    const expenseSavings = currentSavings.filter((saving) => saving.actionType === SAVING_ACTION_TYPE.EXPENSE);

    const income = calculateSumSavings(incomeSavings);
    const expense = calculateSumSavings(expenseSavings);

    return {
      key: goal.id,
      name: goal.name,
      income,
      expense,
      currency,
      diff: getDiffSumItems(income, expense, currencies),
    };
  });
};
