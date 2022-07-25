import { CATEGORIES_TYPES } from '@/constants';

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
        value: 1500,
        comment: '',
        date: '',
      },
    ];

    expect(calculateSumItems(items)).toBe(2000);
  });
});
