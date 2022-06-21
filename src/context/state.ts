import { ContextState } from './interfaces';

export const initialState: ContextState = {
  user: null,
  categories: [],
  // eslint-disable-next-line
  dispatch: () => {},
};
