import { CategorySaveBody } from '../../interfaces';

export interface UseSaveCategoryResult {
  isLoading: boolean;
  save: (body: CategorySaveBody) => void;
}
