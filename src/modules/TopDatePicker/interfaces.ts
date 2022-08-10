import { Dayjs } from 'dayjs';

export interface TopDatePickerProps {
  onChange: (date: Dayjs) => void;
  selectedDate: Dayjs;
}
