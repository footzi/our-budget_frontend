import { Dayjs } from 'dayjs';

export interface IncomesProps {
  date: Dayjs;
}

export interface AddIncomeBody {
  date: string;
  categoryId: string;
  value: number;
  comment?: string;
}

export interface UpdateIncomeBody extends AddIncomeBody {
  id: number;
}
