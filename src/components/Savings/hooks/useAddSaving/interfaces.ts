import { AddSavingBody } from '../../interfaces';

export interface UseAddSavingResult {
  isLoading: boolean;
  add: (body: AddSavingBody) => void;
}
