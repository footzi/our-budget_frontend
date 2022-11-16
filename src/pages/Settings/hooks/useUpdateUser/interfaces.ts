import { CURRENCIES_TYPE } from '@/interfaces';

import { PROFILE_ITEM_TYPES } from '../../constants';
import { ProfileEditableValue } from '../../interfaces';

export interface UseUpdateUserResult {
  isLoading: boolean;
  update: (value: ProfileEditableValue, type: PROFILE_ITEM_TYPES) => void;
}

export interface UseUpdateUserBody {
  firstName?: string;
  currencies?: CURRENCIES_TYPE[];
}
