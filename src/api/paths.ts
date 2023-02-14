import { REFETCHES_LIST } from '@/api/constants';

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
  signUp: {
    url: '/api/auth/signUp',
    method: 'POST',
  },
  user: {
    url: '/api/users',
    json: '/json/user.json',
    refetch: REFETCHES_LIST.USER,
  },
  updateUser: {
    url: '/api/users',
    method: 'PUT',
  },
  changePassword: {
    url: '/api/users/change-password',
    method: 'PUT',
    successMessage: 'Пароль успешно изменен. Повторите вход в систему',
  },
  categories: {
    url: '/api/categories/getAll',
    refetch: REFETCHES_LIST.CATEGORIES,
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
    refetch: REFETCHES_LIST.EXPENSES,
  },
  addExpensePlan: {
    url: '/api/expenses/plan',
    successMessage: 'Плановый расход добавлен',
  },
  addExpenseFact: {
    url: '/api/expenses/fact',
    successMessage: 'Фактический расход добавлен',
  },
  updateExpenseFact: {
    url: '/api/expenses/fact',
    method: 'PUT',
    successMessage: 'Фактический расход обновлен',
  },
  updateExpensePlan: {
    url: '/api/expenses/plan',
    method: 'PUT',
    successMessage: 'Плановый расход добавлен',
  },
  deleteExpenseFact: {
    url: '/api/expenses/fact',
    method: 'DELETE',
    successMessage: 'Фактический расход удален',
  },
  deleteExpensePlan: {
    url: '/api/expenses/plan',
    method: 'DELETE',
    successMessage: 'Плановый расход удален',
  },
  incomes: {
    url: '/api/incomes/getAll',
    refetch: REFETCHES_LIST.INCOMES,
  },
  addIncomePlan: {
    url: '/api/incomes/plan',
    successMessage: 'Плановый доход добавлен',
  },
  addIncomeFact: {
    url: '/api/incomes/fact',
    successMessage: 'Фактический доход добавлен',
  },
  updateIncomeFact: {
    url: '/api/incomes/fact',
    method: 'PUT',
    successMessage: 'Фактический доход обновлен',
  },
  updateIncomePlan: {
    url: '/api/incomes/plan',
    method: 'PUT',
    successMessage: 'Плановый доход обновлен',
  },
  deleteIncomeFact: {
    url: '/api/incomes/fact',
    method: 'DELETE',
    successMessage: 'Фактический доход удален',
  },
  deleteIncomePlan: {
    url: '/api/incomes/plan',
    method: 'DELETE',
    successMessage: 'Плановый доход удален',
  },
  balance: {
    url: '/api/balance',
    refetch: REFETCHES_LIST.BALANCES,
  },
  updateBalance: {
    url: '/api/balance',
    method: 'PUT',
    refetch: REFETCHES_LIST.BALANCES,
  },
  savingGoals: {
    url: '/api/savings/goal',
    refetch: REFETCHES_LIST.SAVING_GOALS,
  },
  addSavingGoals: {
    url: '/api/savings/goal',
    method: 'POST',
    successMessage: 'Копилка добавлена',
  },
  updateSavingGoals: {
    url: '/api/savings/goal',
    method: 'PUT',
    successMessage: 'Копилка обновлена',
  },
  deleteSavingGoals: {
    url: '/api/savings/goal',
    method: 'DELETE',
    successMessage: 'Копилка удалена',
  },
  savings: {
    url: '/api/savings/getAll',
    refetch: REFETCHES_LIST.SAVINGS,
  },
  addSavingPlan: {
    url: '/api/savings/plan',
    successMessage: 'Плановый доход в копилку добавлен',
  },
  updateSavingPlan: {
    url: '/api/savings/plan',
    method: 'PUT',
    successMessage: 'Плановый доход в копилке обновлен',
  },
  deleteSavingPlan: {
    url: '/api/savings/plan',
    method: 'DELETE',
    successMessage: 'Плановый доход в копилке удален',
  },
  addSavingFact: {
    url: '/api/savings/fact',
    successMessage: 'Фактический доход в копилку добавлен',
  },
  updateSavingFact: {
    url: '/api/savings/fact',
    method: 'PUT',
    successMessage: 'Фактический доход в копилке обновлен',
  },
  deleteSavingFact: {
    url: '/api/savings/fact',
    method: 'DELETE',
    successMessage: 'Фактический доход в копилке удален',
  },
};
