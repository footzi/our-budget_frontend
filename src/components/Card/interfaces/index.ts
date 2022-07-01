import { SAVING_ACTION_TYPE } from '@/constants';
import { Category, Expense, Income, Saving, SavingGoal } from '@/interfaces';
import { Dayjs } from 'dayjs';

import { CARD_TYPES } from '../constants';

export interface CardProps {
  title: string;
  list: CardItem[];
  categories?: Category[];
  savingGoals?: SavingGoal[];
  total: number;
  type: CARD_TYPES;
  isLoadingSave: boolean;
  isShowDate?: boolean;
  isShowComment?: boolean;
  isLoadingUpdate: boolean;
  isLoadingDelete: boolean;
  onAdd: (type: CARD_TYPES, body: CardSaveBody) => void;
  onUpdate: (type: CARD_TYPES, body: UpdateSaveBody) => void;
  onDelete: (type: CARD_TYPES, id: number) => void;
}

export type CardSaveBody = CardAddBalancesBody | CardAddSavingBody;

export type UpdateSaveBody = CardUpdateBalancesBody | CardUpdateSavingBody;

export interface CardAddBalancesBody {
  id?: number;
  date?: Dayjs;
  categoryId: string;
  value: number;
  comment?: string;
}

export interface CardAddSavingBody {
  date?: Dayjs;
  goalId: number;
  actionType: SAVING_ACTION_TYPE;
  value: number;
  comment?: string;
}

export interface CardUpdateBalancesBody extends CardAddBalancesBody {
  id: number;
}

export interface CardUpdateSavingBody extends CardAddSavingBody {
  id: number;
}

export type CardItem = Expense | Income | Saving;
