import { CATEGORIES_TYPES } from '@/constants';
import { Category } from '@/interfaces';

export interface CategoryAddBody {
  name: string;
  type: CATEGORIES_TYPES;
}

export interface CategoryUpdateBody {
  id: number;
  name: string;
}

export interface CategoryRender extends Category {
  key: number;
}
