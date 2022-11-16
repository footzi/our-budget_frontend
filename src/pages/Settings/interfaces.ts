import { CURRENCIES_TYPE } from '@/interfaces';

import { PROFILE_ITEM_TYPES } from './constants';

export interface ProfileEditableItem {
  type: PROFILE_ITEM_TYPES;
  value: ProfileEditableValue;
}

export type ProfileEditableValue = string | CURRENCIES_TYPE[];
