import { SAVING_ACTION_TYPE } from '@/constants';

import { calculateSumSavings } from './index';

describe('calculateSumItems', () => {
  it('Возвращает корректную сумму', () => {
    const items = [
      {
        id: 1,
        actionType: SAVING_ACTION_TYPE.INCOME,
        value: 500,
        comment: '',
        date: '',
        goal: {
          id: 1,
          name: 'Копика 1',
          value: 1,
        },
      },
      {
        id: 2,
        actionType: SAVING_ACTION_TYPE.INCOME,
        value: 1500,
        comment: '',
        date: '',
        goal: {
          id: 1,
          name: 'Копика 1',
          value: 1,
        },
      },
    ];

    expect(calculateSumSavings(items)).toBe(2000);
  });
});
