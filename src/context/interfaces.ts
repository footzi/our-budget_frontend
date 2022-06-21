import { Category, Maybe, User } from '@/interfaces';
import { Dispatch } from 'react';

import { ActionTypes } from './constants';

export interface ContextState {
  user: Maybe<User>;
  categories: Category[];
  dispatch: Dispatch<Action<ContextPayload>>;
}

export type Action<TPayload> = {
  type: ActionTypes;
  payload: TPayload;
};

export type ContextPayload = User | null | Category[];
