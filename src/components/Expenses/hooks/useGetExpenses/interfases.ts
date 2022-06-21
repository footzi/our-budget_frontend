import { Expense, Maybe } from '@/interfaces';

export interface UseGetExpensesResult {
  isLoading: boolean;
  expenses: Maybe<ExpensesResult>;
  refetch: () => void;
}

export interface ExpensesResult {
  fact: Expense[];
  plan: Expense[];
}
