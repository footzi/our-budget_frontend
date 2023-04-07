import { CURRENCIES_TYPE, SAVING_ACTION_TYPE } from '@/constants';
import { Category, CurrenciesValues, Expense, Income, Maybe, Saving, SavingGoal } from '@/interfaces';
import { Dayjs } from 'dayjs';
import React from 'react';

import { CARD_FORM_FIELDS, CARD_TYPES } from './constants';

export interface CardProps {
  title: string;
  hint?: React.ReactElement;
  list: CardItem[];
  currencies?: CURRENCIES_TYPE[];
  categories?: Category[];
  savingGoals?: SavingGoal[];
  total: CurrenciesValues;
  type: CARD_TYPES;
  selectedDate?: Dayjs;
  isLoadingSave: boolean;
  isLoadingUpdate: boolean;
  isLoadingDelete: boolean;
  onAdd: (type: CARD_TYPES, body: CardSaveBody) => void;
  onUpdate: (type: CARD_TYPES, body: CardUpdateSaveBody) => void;
  onDelete: (type: CARD_TYPES, id: number) => void;
}

export type CardSaveBody = CardAddBalancesBody | CardAddSavingBody;

// @todo удалить
export type UpdateSaveBody = CardUpdateBalancesBody | CardUpdateSavingBody;
export type CardUpdateSaveBody = CardUpdateBalancesBody | CardUpdateSavingBody;

export interface CardAddBalancesBody {
  id?: number;
  date?: Dayjs;
  categoryId: string;
  value: number;
  comment?: string;
  currency: CURRENCIES_TYPE;
}

export interface CardAddSavingBody {
  date?: Dayjs;
  goalId: number;
  actionType: SAVING_ACTION_TYPE;
  value: number;
  comment?: string;
  currency: CURRENCIES_TYPE;
}

export interface CardUpdateBalancesBody extends CardAddBalancesBody {
  id: number;
}

export interface CardUpdateSavingBody extends CardAddSavingBody {
  id: number;
}

export type CardItem = Expense | Income | Saving;

export type CardFormFieldType = keyof typeof CARD_FORM_FIELDS;
export type CardFormFieldValue = (typeof CARD_FORM_FIELDS)[CardFormFieldType];
export type CardFormField = Record<CardFormFieldValue, unknown>;

export type CardFormSavedValues = Maybe<Record<CARD_TYPES, CardFormField>>;
