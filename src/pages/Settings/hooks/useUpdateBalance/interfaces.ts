import { CURRENCIES_TYPE } from '@/constants';

export interface UseUpdateBalanceResult {
  isLoading: boolean;
  update: (currency: CURRENCIES_TYPE, value: number) => void;
}
