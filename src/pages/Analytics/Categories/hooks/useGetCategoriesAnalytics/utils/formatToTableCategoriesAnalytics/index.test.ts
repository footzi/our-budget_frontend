import { CATEGORIES_TYPES } from '@/constants';

import { formatToTableCategoriesAnalytics } from './index';

describe('Analytics.Categories.useGetCategoriesAnalytics.formatToTableCategoriesAnalytics', () => {
  it('Возвращает корректные данные', () => {
    const category = [
      {
        id: 1,
        name: 'Кредит',
        type: CATEGORIES_TYPES.EXPENSE,
        startDate: '',
        endDate: '',
      },
      {
        id: 2,
        name: 'На зубы',
        type: CATEGORIES_TYPES.EXPENSE,
        startDate: '',
        endDate: '',
      },
    ];

    const itemsPlan = [
      {
        id: 1,
        category: {
          id: 1,
          name: 'Кредит',
          type: CATEGORIES_TYPES.EXPENSE,
          startDate: '',
          endDate: '',
        },
        value: 20000,
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
        value: 10000,
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
        value: 2000,
        comment: '',
        date: '',
      },
    ];

    const itemsFact = [
      {
        id: 1,
        category: {
          id: 1,
          name: 'Кредит',
          type: CATEGORIES_TYPES.EXPENSE,
          startDate: '',
          endDate: '',
        },
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
        value: 5000,
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
        value: 10000,
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
        value: 20000,
        comment: '',
        date: '',
      },
    ];

    const expectedResult = [
      {
        key: 1,
        name: 'Кредит',
        plan: 20000,
        fact: 13000,
        diff: {
          value: 7000,
          isPositive: true,
        },
      },
      {
        key: 2,
        name: 'На зубы',
        plan: 12000,
        fact: 30000,
        diff: {
          value: -18000,
          isPositive: false,
        },
      },
    ];

    expect(formatToTableCategoriesAnalytics(category, itemsPlan, itemsFact)).toEqual(expectedResult);
  });
});
