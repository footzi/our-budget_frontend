import { FORMAT_BACKEND_DATE } from '@/constants';
import dayjs, { Dayjs } from 'dayjs';

/**
 * Форматирует дату в формат для бэкенда
 */
export const formatToBackendDate = (date: Dayjs): string => {
  const now = dayjs();
  // Обновляем текущее время, т.к в DatePicker залипают секунды
  const hours = now.get('hours');
  const minutes = now.get('minutes');
  const seconds = now.get('seconds');

  const result = date.set('hour', hours).set('minute', minutes).set('second', seconds);

  return result.format(FORMAT_BACKEND_DATE);
};
