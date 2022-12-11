import { ON_BOARDING_STEPS } from '@/constants';
import { Category, CurrenciesValues, Expense, Income, Maybe, Saving, SavingGoal, User } from '@/interfaces';

import { store } from './index';

export interface State {
  user: Maybe<User>;
  onBoardingStep: Maybe<ON_BOARDING_STEPS>;
  balance: {
    value: CurrenciesValues;
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
      sum: CurrenciesValues;
    };
    plan: {
      list: Expense[];
      sum: CurrenciesValues;
    };
  };
  incomes: {
    fact: {
      list: Income[];
      sum: CurrenciesValues;
    };
    plan: {
      list: Income[];
      sum: CurrenciesValues;
    };
  };
  savings: {
    plan: {
      list: Saving[];
      sum: CurrenciesValues;
    };
    fact: {
      list: Saving[];
      sum: CurrenciesValues;
    };
  };
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
