import { ProfileEditableValue } from '../../interfaces';

export interface UseUpdateBalanceResult {
  isLoading: boolean;
  update: (value: ProfileEditableValue) => void;
}
