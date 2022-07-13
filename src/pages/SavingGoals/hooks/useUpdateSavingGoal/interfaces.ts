import { SavingGoalUpdateBody } from '../../interfaces';

export interface UseUpdateSavingGoalResult {
  isLoading: boolean;
  update: (body: SavingGoalUpdateBody) => void;
}
