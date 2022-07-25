import { CATEGORIES_TYPES } from '@/constants';
import { Maybe } from '@/interfaces';

import { CategoryAddBody, CategoryRender, CategoryUpdateBody } from '../interfaces';

export interface CategoryModalProps {
  isShow: boolean;
  editedCategory: Maybe<CategoryRender>;
  type: CATEGORIES_TYPES;
  onAdd(body: CategoryAddBody): void;
  onUpdate(body: CategoryUpdateBody): void;
  onCancel(): void;
  onDelete(id: number): void;
  isLoading: boolean;
  isLoadingDelete: boolean;
}
