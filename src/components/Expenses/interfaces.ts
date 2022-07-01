import { Dayjs } from 'dayjs';

export interface ExpensesProps {
  date: Dayjs;
}

export interface AddExpenseBody {
  date: string;
  categoryId: string;
  value: number;
  comment?: string;
}

export interface UpdateExpenseBody extends AddExpenseBody {
  id: number;
}
