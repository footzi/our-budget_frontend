import { PROFILE_ITEM_TYPES } from '../../constants';

export interface UseUpdateUserResult {
  isLoading: boolean;
  update: (value: string, type: PROFILE_ITEM_TYPES) => void;
}

export interface UseUpdateUserBody {
  firstName?: string;
}
