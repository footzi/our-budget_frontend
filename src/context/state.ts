import { ContextState } from './interfaces';

export const initialState: ContextState = {
  user: null,
  categories: {
    value: [],
    refetch: () => {},
    isLoading: false,
  },
  balance: {
    value: null,
    refetch: () => {},
    isLoading: false,
  },
  savingGoals: {
    value: [],
    refetch: () => {},
    isLoading: false,
  },
  // eslint-disable-next-line
  dispatch: () => {},
};
