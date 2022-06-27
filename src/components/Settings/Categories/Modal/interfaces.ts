import { Maybe } from '@/interfaces';

import { CategoryRender, CategorySaveBody, CategoryUpdateBody } from '../interfaces';

export interface CategoryModalProps {
  isShow: boolean;
  editedCategory: Maybe<CategoryRender>;
  onCreate(body: CategorySaveBody): void;
  onUpdate(body: CategoryUpdateBody): void;
  onCancel(): void;
  isLoading: boolean;
}
