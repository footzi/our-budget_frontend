import { CATEGORIES_TYPES, SAVING_ACTION_TYPE } from '@/constants';

export interface User {
  id: number;
  login: string;
  firstName: string;
}

export interface Category {
  id: number;
  name: string;
  type: CATEGORIES_TYPES;
  startDate: Maybe<string>;
  endDate: Maybe<string>;
}

export interface Expense {
  id: number;
  category: Category;
  value: number;
  comment: string;
  date: string;
}

export interface Income {
  id: number;
  category: Category;
  value: number;
  comment: string;
  date: string;
}

export interface Balance {
  common: number;
}

export interface SavingGoal {
  id: number;
  name: string;
  description?: string;
  value?: Maybe<number>;
}

export interface Saving {
  id?: number;
  goal: SavingGoal;
  actionType?: SAVING_ACTION_TYPE;
  value: number;
  comment: string;
  date: string;
}

export type Maybe<T> = T | (null | undefined);

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserLocalStorage {
  id: number;
  tokens: Tokens;
}
