import { Maybe } from '@/interfaces';
import dayjs, { Dayjs } from 'dayjs';

/**
 * Возвращает начальное состояние даты
 * @param selectedDate - выбранный месяц
 * @param editableDate - ранее сохраненная дата если изменялась
 */
export const getInitialDate = (selectedDate?: Dayjs, editableDate?: Maybe<string>): Dayjs => {
  if (editableDate) {
    return dayjs(editableDate);
  }

  if (selectedDate) {
    return selectedDate;
  }

  return dayjs();
};
