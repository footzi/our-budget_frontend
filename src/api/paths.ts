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
  addExpensePlan: {
    url: '/api/expenses/plan',
  },
  addExpenseFact: {
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
  addIncomePlan: {
    url: '/api/incomes/plan',
  },
  addIncomeFact: {
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
  savingGoals: {
    url: '/api/savings/goal',
  },
  addSavingGoals: {
    url: '/api/savings/goal',
    method: 'POST',
  },
  updateSavingGoals: {
    url: '/api/savings/goal',
    method: 'PUT',
  },
  deleteSavingGoals: {
    url: '/api/savings/goal',
    method: 'DELETE',
  },
  savings: {
    url: '/api/savings/getAll',
  },
  addSavingPlan: {
    url: '/api/savings/plan',
  },
  updateSavingPlan: {
    url: '/api/savings/plan',
    method: 'PUT',
  },
  deleteSavingPlan: {
    url: '/api/savings/plan',
    method: 'DELETE',
  },
  addSavingFact: {
    url: '/api/savings/fact',
  },
  updateSavingFact: {
    url: '/api/savings/fact',
    method: 'PUT',
  },
  deleteSavingFact: {
    url: '/api/savings/fact',
    method: 'DELETE',
  },
};
