import { Category, User } from '@/interfaces';

import { ActionTypes } from './constants';
import { Action, ContextPayload, ContextState } from './interfaces';

export const reducer = (state: ContextState, action: Action<ContextPayload>): ContextState => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload as User };
    case ActionTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload as Category[] };
    default:
      return state;
  }
};
