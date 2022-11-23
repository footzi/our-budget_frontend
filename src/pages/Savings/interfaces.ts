import { CURRENCIES_TYPE, SAVING_ACTION_TYPE } from '@/constants';
import { Dayjs } from 'dayjs';

export interface SavingsProps {
  selectedDate: Dayjs;
}

export interface AddSavingBody {
  date: string;
  goalId: number;
  actionType: SAVING_ACTION_TYPE;
  value: number;
  comment?: string;
  currency: CURRENCIES_TYPE;
}

export interface UpdateSavingBody extends AddSavingBody {
  id: number;
}
