import { Maybe } from '@/interfaces';

import { PROFILE_ITEM_TYPES } from '../constants';
import { ProfileEditableItem, ProfileEditableValue } from '../interfaces';

export interface ProfileModalProps {
  item: Maybe<ProfileEditableItem>;
  onCancel: () => void;
  onSubmit: (value: ProfileEditableValue, type: PROFILE_ITEM_TYPES) => void;
  isLoading: boolean;
}
