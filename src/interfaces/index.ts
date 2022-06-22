export interface User {
  id: number;
  login: string;
}

export interface Category {
  id: number;
  name: string;
  isAdditional: boolean;
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

export type Maybe<T> = T | (null | undefined);

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserLocalStorage {
  id: number;
  tokens: Tokens;
}
