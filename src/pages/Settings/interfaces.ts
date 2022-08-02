import { PROFILE_ITEM_TYPES } from './constants';

export interface ProfileEditableItem {
  type: PROFILE_ITEM_TYPES;
  value: string;
}
