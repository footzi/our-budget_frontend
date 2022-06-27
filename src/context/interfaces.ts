import { Balance, Category, Maybe, User } from '@/interfaces';
import { Dispatch } from 'react';

import { ActionTypes } from './constants';

export interface ContextState {
  user: Maybe<User>;
  categories: {
    value: Category[];
    refetch: () => void;
    isLoading: boolean;
  };
  balance: {
    value: Maybe<Balance>;
    refetch: () => void;
    isLoading: boolean;
  };
  dispatch: Dispatch<Action<ContextPayload>>;
}

export type Action<TPayload> = {
  type: ActionTypes;
  payload: TPayload;
};

export interface ResponsePayload<T> {
  value: T;
  refetch: () => void;
  isLoading: boolean;
}

export type ContextPayload = User | null | ResponsePayload<Category[]> | ResponsePayload<Balance>;
