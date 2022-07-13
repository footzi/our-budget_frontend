import { Income, Maybe } from '@/interfaces';

export interface UseGetIncomesResult {
  isLoading: boolean;
  savings: Maybe<SavingsResult>;
  refetch: () => void;
}

export interface SavingsResult {
  plan: {
    list: Income[];
    sum: number;
  };
  fact: {
    list: Income[];
    sum: number;
  };
}
