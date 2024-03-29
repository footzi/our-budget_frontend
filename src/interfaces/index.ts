import {
  BALANCE_HISTORY_ACTION,
  CATEGORIES_TYPES,
  CURRENCIES_TYPE,
  ON_BOARDING_STATUSES,
  SAVING_ACTION_TYPE,
} from '@/constants';

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
  currency: CURRENCIES_TYPE;
}

export interface Income {
  id: number;
  category: Category;
  value: number;
  comment: string;
  date: string;
  currency: CURRENCIES_TYPE;
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
  finishValue?: Maybe<number>;
  currency: CURRENCIES_TYPE;
  order: number;
}

export interface Saving {
  id?: number;
  goal: SavingGoal;
  actionType: SAVING_ACTION_TYPE;
  value: number;
  comment: string;
  date: string;
  currency: CURRENCIES_TYPE;
}

export type Maybe<T> = T | (null | undefined);

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserLocalStorage {
  id: number;
  firstName: string;
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

export interface Currency {
  name: CURRENCIES_TYPE;
  symbol: string;
}

export interface CurrencyOption {
  label: string;
  value: CURRENCIES_TYPE;
}

export type CurrenciesValues = {
  [key in CURRENCIES_TYPE]?: number;
};

export interface BalanceHistory {
  id: number;
  createdAt: string;
  currency: CURRENCIES_TYPE;
  oldValue: number;
  newValue: number;
  action: BALANCE_HISTORY_ACTION;
}
