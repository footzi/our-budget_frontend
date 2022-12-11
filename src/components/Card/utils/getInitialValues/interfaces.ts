import { CURRENCIES_TYPE } from '@/constants';
import { Category, CurrencyOption, SavingGoal } from '@/interfaces';
import { Dayjs } from 'dayjs';

import { CARD_TYPES } from '../../constants';
import { Maybe } from './../../../../interfaces/index';

export interface GetInitialValuesProps {
  cardType: CARD_TYPES;
  selectedDate: Maybe<Dayjs>;
  currenciesOptions: CurrencyOption[];
  categories?: Category[];
  savingGoals?: SavingGoal[];
}

export interface GetInitialValuesResult {
  date: Dayjs;
  currency: Maybe<CURRENCIES_TYPE>;
  categoryId: Maybe<number>;
  goalId: Maybe<number>;
}
