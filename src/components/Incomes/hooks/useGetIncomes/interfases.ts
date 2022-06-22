import { Income, Maybe } from '@/interfaces';

export interface UseGetIncomesResult {
  isLoading: boolean;
  incomes: Maybe<IncomesResult>;
  refetch: () => void;
}

export interface IncomesResult {
  plan: {
    list: Income[];
    sum: number;
  };
  fact: {
    list: Income[];
    sum: number;
  };
}
