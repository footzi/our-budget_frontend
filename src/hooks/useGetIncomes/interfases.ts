import { Income } from '@/interfaces';

export interface UseGetIncomesResult {
  isLoading: boolean;
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
