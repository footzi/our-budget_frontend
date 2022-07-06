import { State } from './interfaces';

export const initialState: State = {
  user: null,
  balance: {
    value: {
      common: 0,
    },
    isLoading: true,
  },
  categories: {
    value: [],
    isLoading: true,
  },
  savingGoals: {
    value: [],
    isLoading: true,
  },
};
