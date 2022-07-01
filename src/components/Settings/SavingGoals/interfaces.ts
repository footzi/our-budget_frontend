import { SavingGoal } from '@/interfaces';

export interface SavingGoalAddBody {
  name: string;
  description?: string;
  value?: number;
}

export interface SavingGoalUpdateBody {
  id: number;
  name: string;
  description?: string;
  value?: number;
}

export interface SavingGoalRender extends SavingGoal {
  key: number;
  valueText: string;
}
