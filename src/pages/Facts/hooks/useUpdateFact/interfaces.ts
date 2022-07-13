import { UpdateFactBody } from '../../interfaces';

export interface UseUpdateFactResult {
  isLoading: boolean;
  update: (body: UpdateFactBody) => void;
}
