import { CURRENCIES_TYPE, SAVING_ACTION_TYPE } from '@/constants';
import { Category, Expense, Income, Saving, SavingGoal, SumByCurrency } from '@/interfaces';
import { Dayjs } from 'dayjs';

import { CARD_TYPES } from './constants';

export interface CardProps {
  title: string;
  list: CardItem[];
  currencies: CURRENCIES_TYPE[];
  categories?: Category[];
  savingGoals?: SavingGoal[];
  total: SumByCurrency;
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

export interface CardUpdateBalancesBody extends Omit<CardAddBalancesBody, 'currency'> {
  id: number;
}

export interface CardUpdateSavingBody extends Omit<CardAddSavingBody, 'currency'> {
  id: number;
}

export type CardItem = Expense | Income | Saving;
