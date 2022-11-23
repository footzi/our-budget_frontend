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
        },
      },
    ];

    expect(calculateSumSavings(items)).toBe(2000);
  });
});
