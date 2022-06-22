import { ContextState } from './interfaces';

export const initialState: ContextState = {
  user: null,
  categories: [],
  balance: {
    value: null,
    refetch: () => {},
    isLoading: false,
  },
  // eslint-disable-next-line
  dispatch: () => {},
};
