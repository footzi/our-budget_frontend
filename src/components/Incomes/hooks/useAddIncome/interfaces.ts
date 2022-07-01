import { AddIncomeBody } from '../../interfaces';

export interface UseAddIncomeResult {
  isLoading: boolean;
  add: (body: AddIncomeBody) => void;
}
