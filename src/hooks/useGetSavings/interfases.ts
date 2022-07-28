import { Saving } from '@/interfaces';

export interface UseGetIncomesResult {
  isLoading: boolean;
}

export interface SavingsResult {
  plan: {
    list: Saving[];
    sum: number;
  };
  fact: {
    list: Saving[];
    sum: number;
  };
}
