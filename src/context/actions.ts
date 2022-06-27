import { Balance, Category, User } from '@/interfaces';

import { ActionTypes } from './constants';

export const setUser = (user: User) => {
  return {
    type: ActionTypes.SET_USER,
    payload: user,
  };
};

export const removeUser = () => {
  return {
    type: ActionTypes.SET_USER,
    payload: null,
  };
};

export const setCategories = (categories: Category[], refetch: () => {}, isLoading: boolean) => ({
  type: ActionTypes.SET_CATEGORIES,
  payload: { value: categories, refetch, isLoading },
});

export const setBalance = (balance: Balance, refetch: () => {}, isLoading: boolean) => ({
  type: ActionTypes.SET_BALANCE,
  payload: { value: balance, refetch, isLoading },
});
