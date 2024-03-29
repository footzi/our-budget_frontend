import { CATEGORIES_TYPES, CURRENCIES_TYPE } from '@/constants';

import { calculateSumByCategory } from './index';

describe('calculateSumByCategory', () => {
  it('Возвращает корректную сумму', () => {
    const category = {
      id: 1,
      name: 'Кредит',
      type: CATEGORIES_TYPES.EXPENSE,
      startDate: '',
      endDate: '',
    };

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
        value: 1000,
        comment: '',
        date: '',
      },
      {
        id: 2,
        category: {
          id: 2,
          name: 'На зубы',
          type: CATEGORIES_TYPES.EXPENSE,
          startDate: '',
          endDate: '',
        },
        currency: CURRENCIES_TYPE.RUB,
        value: 1000,
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
        value: 8000,
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
        currency: CURRENCIES_TYPE.USD,
        value: 100,
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
        currency: CURRENCIES_TYPE.USD,
        value: 200,
        comment: '',
        date: '',
      },
      {
        id: 3,
        category: {
          id: 5,
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
    ];

    const expected = {
      [CURRENCIES_TYPE.RUB]: 9000,
      [CURRENCIES_TYPE.USD]: 300,
    };

    expect(calculateSumByCategory(category, items)).toEqual(expected);
  });
});
