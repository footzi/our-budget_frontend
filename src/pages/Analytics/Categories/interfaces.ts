import { CurrenciesValues } from '@/interfaces';

export interface AnalyticsCategoryRender {
  key: number;
  name: string;
  plan: CurrenciesValues;
  fact: CurrenciesValues;
  diff: CurrenciesValues;
}
