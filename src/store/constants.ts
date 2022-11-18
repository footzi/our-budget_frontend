import { State } from './interfaces';

export const initialState: State = {
  user: null,
  onBoardingStep: null,
  cardEditedDates: null,
  balance: {
    value: {},
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
      sum: {},
    },
    plan: {
      list: [],
      sum: {},
    },
  },
  incomes: {
    fact: {
      list: [],
      sum: {},
    },
    plan: {
      list: [],
      sum: {},
    },
  },
  savings: {
    fact: {
      list: [],
      sum: {},
    },
    plan: {
      list: [],
      sum: {},
    },
  },
};
