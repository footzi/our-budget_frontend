import { Dayjs } from 'dayjs';

export interface PlansProps {
  selectedDate: Dayjs;
}

export interface AddPlanBody {
  date: string;
  categoryId: string;
  value: number;
}

export interface UpdatePlanBody extends AddPlanBody {
  id: number;
}
