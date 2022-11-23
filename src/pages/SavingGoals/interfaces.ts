import { CURRENCIES_TYPE } from '@/constants';

export interface SavingGoalAddBody {
  name: string;
  description?: string;
  value?: number;
  currency: CURRENCIES_TYPE;
}

export interface SavingGoalUpdateBody {
  id: number;
  name: string;
  description?: string;
  value?: number;
  currency: CURRENCIES_TYPE;
}

export interface SavingGoalRender {
  id: number;
  name: string;
  description?: string;
  value: number;
  currency: CURRENCIES_TYPE;
  key: number;
  valueText: string;
}
