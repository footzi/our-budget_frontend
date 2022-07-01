import { SavingGoalAddBody } from '../../interfaces';

export interface UseAddSavingResult {
  isLoading: boolean;
  add: (body: SavingGoalAddBody) => void;
}
