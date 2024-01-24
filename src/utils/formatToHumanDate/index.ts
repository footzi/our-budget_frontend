import dayjs from 'dayjs';

/**
 * Форматирует дату с бэка в дату которая используется на фронте
 *  2021-07-01 в 01.07.2021
 */
export const formatToHumanDate = (date: string, useTime?: boolean): string => {
  const template = useTime ? 'DD.MM.YYYY HH:MM ' : 'DD.MM.YYYY';

  return dayjs.utc(date).format(template);
};
