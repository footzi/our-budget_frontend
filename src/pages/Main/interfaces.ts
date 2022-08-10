import { Dayjs } from 'dayjs';

export interface MainProps {
  selectedDate: Dayjs;
  isLoading: boolean;
  onChangeDate: (date: Dayjs) => void;
}
