import { CURRENCIES_TYPE, SAVING_ACTION_TYPE } from '@/constants';

import { calculateSumSavings } from './index';

describe('calculateSumItems', () => {
  it('Возвращает корректную сумму', () => {
    const items = [
      {
        id: 1,
        actionType: SAVING_ACTION_TYPE.INCOME,
        currency: CURRENCIES_TYPE.RUB,
        value: 500,
        comment: '',
        date: '',
        goal: {
          id: 1,
          name: 'Копика 1',
          value: 1,
          currency: CURRENCIES_TYPE.RUB,
          order: 0,
        },
      },
      {
        id: 2,
        actionType: SAVING_ACTION_TYPE.INCOME,
        currency: CURRENCIES_TYPE.RUB,
        value: 1500,
        comment: '',
        date: '',
        goal: {
          id: 1,
          name: 'Копика 1',
          value: 1,
          currency: CURRENCIES_TYPE.RUB,
          order: 0,
        },
      },
      {
        id: 3,
        actionType: SAVING_ACTION_TYPE.INCOME,
        currency: CURRENCIES_TYPE.USD,
        value: 20,
        comment: '',
        date: '',
        goal: {
          id: 2,
          name: 'Копика 5',
          value: 1,
          currency: CURRENCIES_TYPE.USD,
          order: 0,
        },
      },
      {
        id: 4,
        actionType: SAVING_ACTION_TYPE.INCOME,
        currency: CURRENCIES_TYPE.USD,
        value: 15,
        comment: '',
        date: '',
        goal: {
          id: 2,
          name: 'Копика 5',
          value: 1,
          currency: CURRENCIES_TYPE.USD,
          order: 0,
        },
      },
    ];

    const expected = {
      [CURRENCIES_TYPE.RUB]: 2000,
      [CURRENCIES_TYPE.USD]: 35,
    };

    expect(calculateSumSavings(items)).toEqual(expected);
  });
});
