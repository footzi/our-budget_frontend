import { Expense, Maybe } from '@/interfaces';

export interface UseGetExpensesResult {
  isLoading: boolean;
  expenses: Maybe<ExpensesResult>;
  refetch: () => void;
}

export interface ExpensesResult {
  plan: {
    list: Expense[];
    sum: number;
  };
  fact: {
    list: Expense[];
    sum: number;
  };
}
