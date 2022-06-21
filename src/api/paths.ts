import { ApiConfigItem } from './interfaces';

export const ApiConfig: { [key: string]: ApiConfigItem } = {
  login: {
    url: '/api/auth/login',
    json: '/json/login.json',
  },
  logout: {
    url: '/api/auth/logout',
    json: '/json/success.json',
    method: 'DELETE',
  },
  user: {
    url: '/api/users',
    json: '/json/user.json',
  },
  categories: {
    url: '/api/categories/getAll',
  },
  expenses: {
    url: '/api/expenses/getAll',
  },
  saveExpensePlan: {
    url: '/api/expenses/plan',
  },
};
