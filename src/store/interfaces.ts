import { Category, Maybe, SavingGoal, User } from '@/interfaces';

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
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
