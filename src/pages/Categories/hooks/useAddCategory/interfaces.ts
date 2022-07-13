import { CategoryAddBody } from '../../interfaces';

export interface UseAddCategoryResult {
  isLoading: boolean;
  add: (body: CategoryAddBody) => void;
}
