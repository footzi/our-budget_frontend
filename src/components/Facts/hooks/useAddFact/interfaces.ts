import { AddFactBody } from '../../interfaces';

export interface UseAddFactResult {
  isLoading: boolean;
  add: (body: AddFactBody) => void;
}
