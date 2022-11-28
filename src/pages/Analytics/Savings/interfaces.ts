import { CURRENCIES_TYPE } from '@/constants';
import { CurrenciesValues } from '@/interfaces';

export interface AnalyticsSavingRender {
  key: number;
  name: string;
  income: CurrenciesValues;
  expense: CurrenciesValues;
  diff: CurrenciesValues;
  currency: CURRENCIES_TYPE;
}

export interface AnalyticsSavingTotal {
  income: CurrenciesValues;
  expense: CurrenciesValues;
  diff: CurrenciesValues;
}
