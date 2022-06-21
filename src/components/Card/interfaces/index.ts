import { Category, Expense } from '@/interfaces';
import { Dayjs } from 'dayjs';

import { CARD_TYPES } from '../constants';

export interface CardProps {
  title: string;
  list: Expense[];
  categories: Category[];
  total: number;
  type: CARD_TYPES;
  isLoadingSave: boolean;
  isShowDate?: boolean;
  isShowComment?: boolean;
  isLoadingUpdate: boolean;
  isLoadingDelete: boolean;
  onSave: (type: CARD_TYPES, body: CardSaveBody) => void;
  onUpdate: (type: CARD_TYPES, body: UpdateSaveBody) => void;
  onDelete: (type: CARD_TYPES, id: number) => void;
}

export interface CardSaveBody {
  date?: Dayjs;
  categoryId: string;
  value: number;
  comment?: string;
}

export interface UpdateSaveBody {
  id: number;
  date?: Dayjs;
  categoryId: string;
  value: number;
  comment?: string;
}

export type CardItem = Expense;
