import { CATEGORIES_TYPES, CURRENCIES_TYPE } from '@/constants';

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

    const currencies = [CURRENCIES_TYPE.USD, CURRENCIES_TYPE.RUB];

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
        currency: CURRENCIES_TYPE.RUB,
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
        currency: CURRENCIES_TYPE.RUB,
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
        currency: CURRENCIES_TYPE.RUB,
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
        value: 10,
        currency: CURRENCIES_TYPE.USD,
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
        currency: CURRENCIES_TYPE.RUB,
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
        currency: CURRENCIES_TYPE.RUB,
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
        currency: CURRENCIES_TYPE.RUB,
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
        currency: CURRENCIES_TYPE.RUB,
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
        value: 30,
        currency: CURRENCIES_TYPE.USD,
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
        value: 70,
        currency: CURRENCIES_TYPE.USD,
        comment: '',
        date: '',
      },
    ];

    const expectedResult = [
      {
        key: 1,
        name: 'Кредит',
        plan: {
          [CURRENCIES_TYPE.RUB]: 20000,
        },
        fact: {
          [CURRENCIES_TYPE.RUB]: 13000,
        },
        diff: {
          [CURRENCIES_TYPE.RUB]: 7000,
        },
      },
      {
        key: 2,
        name: 'На зубы',
        plan: {
          [CURRENCIES_TYPE.RUB]: 12000,
          [CURRENCIES_TYPE.USD]: 10,
        },
        fact: {
          [CURRENCIES_TYPE.RUB]: 30000,
          [CURRENCIES_TYPE.USD]: 100,
        },
        diff: {
          [CURRENCIES_TYPE.RUB]: -18000,
          [CURRENCIES_TYPE.USD]: -90,
        },
      },
    ];

    expect(formatToTableCategoriesAnalytics(category, itemsPlan, itemsFact, currencies)).toEqual(expectedResult);
  });
});
