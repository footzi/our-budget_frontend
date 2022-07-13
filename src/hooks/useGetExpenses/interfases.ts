import { Expense } from '@/interfaces';

export interface UseGetExpensesResult {
  isLoading: boolean;
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
