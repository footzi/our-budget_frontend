import { CATEGORIES_TYPES, ON_BOARDING_STATUSES, SAVING_ACTION_TYPE } from '@/constants';

export interface User {
  id: number;
  login: string;
  firstName: string;
  currencies: CURRENCIES_TYPE[];
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

export type Item = Income | Expense;

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

export interface SumByCategory {
  category: Category;
  sum: number;
}

export interface OnBoardingItem {
  state: ON_BOARDING_STATUSES;
}

export type OnBoardingItemsLS = { [key: string]: OnBoardingItem };

export enum CURRENCIES_TYPE {
  RUB = 'RUB',
  USD = 'USD',
}

export interface Currency {
  name: string;
  symbol: string;
}
