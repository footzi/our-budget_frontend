import { AnalyticsSavingRender, AnalyticsSavingTotal } from '@/pages/Analytics/Savings/interfaces';

/**
 * Рассчитывает итоговые положили/вынули по всем копилкам
 */
export const getTotalByCategoriesAnalytics = (savings: AnalyticsSavingRender[]): AnalyticsSavingTotal => {
  const income = savings.reduce((acc, item) => acc + item.income, 0);
  const expense = savings.reduce((acc, item) => acc + item.expense, 0);
  const isPositive = expense <= income;
  const diff = income - expense;

  return {
    income,
    expense,
    diff: {
      value: diff,
      isPositive,
    },
  };
};
