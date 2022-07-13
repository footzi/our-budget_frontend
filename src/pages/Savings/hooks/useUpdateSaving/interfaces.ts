import { UpdateSavingBody } from '../../interfaces';

export interface UseUpdateSavingResult {
  isLoading: boolean;
  update: (body: UpdateSavingBody) => void;
}
