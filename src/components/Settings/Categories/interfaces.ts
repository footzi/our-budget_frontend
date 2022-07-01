import { CATEGORIES_TYPES } from '@/constants';
import { Category } from '@/interfaces';
import { Dayjs } from 'dayjs';

export interface CategoryAddBody {
  name: string;
  type: CATEGORIES_TYPES;
  period: [Dayjs, Dayjs];
}

export interface CategoryUpdateBody {
  id: number;
  name: string;
  type: CATEGORIES_TYPES;
  period: [Dayjs, Dayjs];
}

export interface CategoryRender extends Category {
  key: number;
  period: string;
}
