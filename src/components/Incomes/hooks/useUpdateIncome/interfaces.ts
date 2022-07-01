import { UpdateIncomeBody } from '../../interfaces';

export interface UseUpdateIncomeResult {
  isLoading: boolean;
  update: (body: UpdateIncomeBody) => void;
}
