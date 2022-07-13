import { CategoryUpdateBody } from '../../interfaces';

export interface UseUpdateCategoryResult {
  isLoading: boolean;
  update: (body: CategoryUpdateBody) => void;
}
