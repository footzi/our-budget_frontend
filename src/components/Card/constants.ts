import { CardFormFieldValue } from './interfaces';

export enum CARD_TYPES {
  EXPENSE_PLAN = 'EXPENSE_PLAN',
  EXPENSE_FACT = 'EXPENSE_FACT',
  INCOME_FACT = 'INCOME_FACT',
  INCOME_PLAN = 'INCOME_PLAN',
  SAVINGS_PLAN = 'SAVINGS_PLAN',
  SAVINGS_FACT = 'SAVINGS_FACT',
}

export enum CARD_FORM_FIELDS {
  DATE = 'date',
  CATEGORY_ID = 'categoryId',
  GOAL_ID = 'goalId',
  ACTION_TYPE = 'actionType',
  VALUE = 'value',
  CURRENCY = 'currency',
  COMMENT = 'comment',
}

export const AVAILABLE_FIELDS_FOR_SAVE: CardFormFieldValue[] = [
  CARD_FORM_FIELDS.DATE,
  CARD_FORM_FIELDS.CATEGORY_ID,
  CARD_FORM_FIELDS.GOAL_ID,
  CARD_FORM_FIELDS.CURRENCY,
];
