import { Category, User } from '@/interfaces';

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

export const setCategories = (categories: Category[]) => ({
  type: ActionTypes.SET_CATEGORIES,
  payload: categories,
});
