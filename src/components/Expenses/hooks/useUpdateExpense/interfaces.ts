import { UpdateExpenseBody } from '../../interfaces';

export interface UseUpdateExpenseResult {
  isLoading: boolean;
  update: (body: UpdateExpenseBody) => void;
}
