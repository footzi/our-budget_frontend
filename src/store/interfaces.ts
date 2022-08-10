import { ON_BOARDING_STEPS } from '@/constants';
import { Category, Expense, Income, Maybe, Saving, SavingGoal, User } from '@/interfaces';

import { store } from './index';

export interface State {
  user: Maybe<User>;
  onBoardingStep: Maybe<ON_BOARDING_STEPS>;
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
  savings: {
    plan: {
      list: Saving[];
      sum: number;
    };
    fact: {
      list: Saving[];
      sum: number;
    };
  };
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
