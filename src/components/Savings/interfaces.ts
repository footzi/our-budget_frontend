import { SAVING_ACTION_TYPE } from '@/constants';
import { Dayjs } from 'dayjs';

export interface SavingsProps {
  date: Dayjs;
}

export interface AddSavingBody {
  date: string;
  goalId: number;
  actionType: SAVING_ACTION_TYPE;
  value: number;
  comment?: string;
}

export interface UpdateSavingBody extends AddSavingBody {
  id: number;
}
