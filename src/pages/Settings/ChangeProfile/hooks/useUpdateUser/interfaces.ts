import { CURRENCIES_TYPE } from '@/constants';

export interface UseUpdateUserResult {
  isLoading: boolean;
  update: (body: UseUpdateUserBody) => void;
}

export interface UseUpdateUserBody {
  firstName?: string;
  currencies?: CURRENCIES_TYPE[];
}
