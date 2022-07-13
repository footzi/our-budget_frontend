import { Category, Expense, Income, Maybe, SavingGoal, User } from '@/interfaces';

import { store } from './index';

export interface State {
  user: Maybe<User>;
  balance: {
    value: {
      common: number;
    };
    isLoading: boolean;
  };
  categories: {
    value: Category[];
    isLoading: true;
  };
  savingGoals: {
    value: SavingGoal[];
    isLoading: true;
  };
  expenses: {
    fact: {
      list: Expense[];
      sum: number;
    };
    plan: {
      list: Expense[];
      sum: number;
    };
  };
  incomes: {
    fact: {
      list: Income[];
      sum: number;
    };
    plan: {
      list: Income[];
      sum: number;
    };
  };
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
