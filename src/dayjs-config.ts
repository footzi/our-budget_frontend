import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';

dayjs.locale('ru_RU');
dayjs.extend(updateLocale);
dayjs.extend(utc);

dayjs.updateLocale('ru', {
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Maй',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthsShort: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Мaй',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
});
