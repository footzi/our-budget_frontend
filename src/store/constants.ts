import { State } from './interfaces';

export const initialState: State = {
  user: null,
  onBoardingStep: null,
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
  expenses: {
    fact: {
      list: [],
      sum: 0,
    },
    plan: {
      list: [],
      sum: 0,
    },
  },
  incomes: {
    fact: {
      list: [],
      sum: 0,
    },
    plan: {
      list: [],
      sum: 0,
    },
  },
  savings: {
    fact: {
      list: [],
      sum: 0,
    },
    plan: {
      list: [],
      sum: 0,
    },
  },
};
