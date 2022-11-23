import { SavingGoal } from '@/interfaces';
import { formatPrice } from '@/utils/formatPrice';

import { SavingGoalRender } from '../../../../interfaces';

export const formatSavingToTable = (goals: SavingGoal[]): SavingGoalRender[] => {
  return goals.map((goal: SavingGoal): SavingGoalRender => {
    return {
      id: goal.id,
      name: goal.name,
      description: goal.description ?? goal.description,
      value: goal.value ?? 0,
      valueText: formatPrice(goal.value, goal.currency),
      key: goal.id,
      currency: goal.currency,
    };
  });
};
