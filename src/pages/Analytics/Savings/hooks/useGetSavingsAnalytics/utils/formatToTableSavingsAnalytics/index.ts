import { SAVING_ACTION_TYPE } from '@/constants';
import { Saving, SavingGoal } from '@/interfaces';
import { AnalyticsSavingRender } from '@/pages/Analytics/Savings/interfaces';
import { calculateSumSavings } from '@/utils/calculateSumSavings';

/**
 * Подготавливает данные для отображения в аналитике копилок
 */
export const formatToTableSavingsAnalytics = (
  savingsGoals: SavingGoal[],
  savings: Saving[]
): AnalyticsSavingRender[] => {
  return savingsGoals.map((goal) => {
    const currentSavings = savings.filter((saving) => saving.goal.id === goal.id);
    const incomeSavings = currentSavings.filter((saving) => saving.actionType === SAVING_ACTION_TYPE.INCOME);
    const expenseSavings = currentSavings.filter((saving) => saving.actionType === SAVING_ACTION_TYPE.EXPENSE);

    const income = calculateSumSavings(incomeSavings);
    const expense = calculateSumSavings(expenseSavings);

    const isPositive = expense <= income;
    const diff = income - expense;

    return {
      key: goal.id,
      name: goal.name,
      income,
      expense,
      diff: {
        value: diff,
        isPositive,
      },
    };
  });
};
