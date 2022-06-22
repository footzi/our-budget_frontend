import { Category, User } from '@/interfaces';

import { ActionTypes } from './constants';
import { Action, ContextPayload, ContextState, ResponsePayload } from './interfaces';

export const reducer = (state: ContextState, action: Action<ContextPayload>): ContextState => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload as User };
    case ActionTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload as Category[] };
    case ActionTypes.SET_BALANCE:
      return {
        ...state,
        balance: {
          ...(action.payload as ResponsePayload),
        },
      };
    default:
      return state;
  }
};
