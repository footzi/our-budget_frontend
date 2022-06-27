export enum LocalStorageItems {
  USER = 'USER',
}

export enum CATEGORIES_TYPES {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export const CATEGORIES_TYPES_LIST = [
  { type: CATEGORIES_TYPES.INCOME, text: 'Доходы' },
  {
    type: CATEGORIES_TYPES.EXPENSE,
    text: 'Расходы',
  },
];
