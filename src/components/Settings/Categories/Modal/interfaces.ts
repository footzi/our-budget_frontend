import { Maybe } from '@/interfaces';

import { CategoryAddBody, CategoryRender, CategoryUpdateBody } from '../interfaces';

export interface CategoryModalProps {
  isShow: boolean;
  editedCategory: Maybe<CategoryRender>;
  onAdd(body: CategoryAddBody): void;
  onUpdate(body: CategoryUpdateBody): void;
  onCancel(): void;
  isLoading: boolean;
}
