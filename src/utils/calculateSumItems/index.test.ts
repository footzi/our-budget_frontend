import { CATEGORIES_TYPES, CURRENCIES_TYPE } from '@/constants';

import { calculateSumItems } from './index';

describe('calculateSumItems', () => {
  it('Возвращает корректную сумму', () => {
    const items = [
      {
        id: 1,
        category: {
          id: 1,
          name: 'Кредит',
          type: CATEGORIES_TYPES.EXPENSE,
          startDate: '',
          endDate: '',
        },
        currency: CURRENCIES_TYPE.RUB,
        value: 500,
        comment: '',
        date: '',
      },
      {
        id: 3,
        category: {
          id: 1,
          name: 'Кредит',
          type: CATEGORIES_TYPES.EXPENSE,
          startDate: '',
          endDate: '',
        },
        currency: CURRENCIES_TYPE.RUB,
        value: 1500,
        comment: '',
        date: '',
      },
      {
        id: 3,
        category: {
          id: 1,
          name: 'Продукты',
          type: CATEGORIES_TYPES.EXPENSE,
          startDate: '',
          endDate: '',
        },
        currency: CURRENCIES_TYPE.USD,
        value: 10,
        comment: '',
        date: '',
      },
      {
        id: 3,
        category: {
          id: 1,
          name: 'Продукты',
          type: CATEGORIES_TYPES.EXPENSE,
          startDate: '',
          endDate: '',
        },
        currency: CURRENCIES_TYPE.USD,
        value: 15,
        comment: '',
        date: '',
      },
    ];

    const expected = {
      [CURRENCIES_TYPE.RUB]: 2000,
      [CURRENCIES_TYPE.USD]: 25,
    };

    expect(calculateSumItems(items)).toEqual(expected);
  });
});
