import { CURRENCIES_TYPE } from '@/constants';

import { ProfileEditableValue } from '../../interfaces';

export interface UseUpdateBalanceResult {
  isLoading: boolean;
  update: (value: ProfileEditableValue, currency: CURRENCIES_TYPE) => void;
}
