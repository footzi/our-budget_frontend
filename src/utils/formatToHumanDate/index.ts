import dayjs from 'dayjs';

/**
 * Форматирует дату с бэка в дату которая используется на фронте
 *  2021-07-01 в 01.07.2021
 */
export const formatToHumanDate = (date: string, useTime?: boolean): string => {
  if (useTime) {
    return new Date(date).toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return dayjs.utc(date).format('DD.MM.YYYY');
};
