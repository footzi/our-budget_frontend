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
  saveCategory: {
    url: '/api/categories',
    method: 'POST',
  },
  updateCategory: {
    url: '/api/categories',
    method: 'PUT',
  },
  deleteCategory: {
    url: '/api/categories',
    method: 'DELETE',
  },
  expenses: {
    url: '/api/expenses/getAll',
  },
  saveExpensePlan: {
    url: '/api/expenses/plan',
  },
  saveExpenseFact: {
    url: '/api/expenses/fact',
  },
  updateExpenseFact: {
    url: '/api/expenses/fact',
    method: 'PUT',
  },
  updateExpensePlan: {
    url: '/api/expenses/plan',
    method: 'PUT',
  },
  deleteExpenseFact: {
    url: '/api/expenses/fact',
    method: 'DELETE',
  },
  deleteExpensePlan: {
    url: '/api/expenses/plan',
    method: 'DELETE',
  },
  incomes: {
    url: '/api/incomes/getAll',
  },
  saveIncomePlan: {
    url: '/api/incomes/plan',
  },
  saveIncomeFact: {
    url: '/api/incomes/fact',
  },
  updateIncomeFact: {
    url: '/api/incomes/fact',
    method: 'PUT',
  },
  updateIncomePlan: {
    url: '/api/incomes/plan',
    method: 'PUT',
  },
  deleteIncomeFact: {
    url: '/api/incomes/fact',
    method: 'DELETE',
  },
  deleteIncomePlan: {
    url: '/api/incomes/plan',
    method: 'DELETE',
  },
  balance: {
    url: '/api/balance',
  },
};
