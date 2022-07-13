import { Dayjs } from 'dayjs';

export interface FactsProps {
  selectedDate: Dayjs;
}

export interface AddFactBody {
  date: string;
  categoryId: string;
  value: number;
}

export interface UpdateFactBody extends AddFactBody {
  id: number;
}
