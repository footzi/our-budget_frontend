import { AddExpenseBody } from '../../interfaces';

export interface UseAddExpenseResult {
  isLoading: boolean;
  add: (body: AddExpenseBody) => void;
}
