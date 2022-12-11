import { CURRENCIES_TYPE } from '@/constants';
import { Maybe, SavingGoal } from '@/interfaces';

export const getCurrencyByGoalId = (goalId: Maybe<number>, goals: SavingGoal[] = []): CURRENCIES_TYPE | null => {
  if (!goalId) {
    return null;
  }

  return goals.find((item) => item.id === goalId)?.currency ?? null;
};
