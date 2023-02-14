import { CURRENCIES_TYPE } from '@/constants';
import { CurrenciesValues } from '@/interfaces';

export interface SettingsFormBody {
  firstName: string;
  balances: CurrenciesValues;
  currencies: CURRENCIES_TYPE[];
}
