import { CARD_TYPES } from '@/components/Card';
import { ON_BOARDING_STEPS } from '@/constants';
import { Category, Expense, Income, Maybe, Saving, SavingGoal, SumByCurrency, User } from '@/interfaces';

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
      sum: SumByCurrency;
    };
    plan: {
      list: Expense[];
      sum: SumByCurrency;
    };
  };
  incomes: {
    fact: {
      list: Income[];
      sum: SumByCurrency;
    };
    plan: {
      list: Income[];
      sum: SumByCurrency;
    };
  };
  savings: {
    plan: {
      list: Saving[];
      sum: SumByCurrency;
    };
    fact: {
      list: Saving[];
      sum: SumByCurrency;
    };
  };
  cardEditedDates: Maybe<{
    [key in CARD_TYPES]: string;
  }>;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
