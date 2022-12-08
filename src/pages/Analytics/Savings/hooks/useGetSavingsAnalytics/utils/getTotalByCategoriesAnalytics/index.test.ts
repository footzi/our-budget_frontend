import { CURRENCIES_TYPE, SAVING_ACTION_TYPE } from '@/constants';

import { getTotalByCategoriesAnalytics } from './index';

describe('Analytics.Categories.useGetCategoriesAnalytics.getTotalByCategoriesAnalytics', () => {
  it('Возвращает корректные данные', () => {
    const savings = [
      {
        id: 1,
        actionType: SAVING_ACTION_TYPE.INCOME,
        value: 150,
        currency: CURRENCIES_TYPE.RUB,
        comment: '',
        date: '',
        goal: {
          id: 1,
          name: 'Копилка 1',
          value: 0,
          currency: CURRENCIES_TYPE.RUB,
          order: 0,
        },
      },
      {
        id: 2,
        actionType: SAVING_ACTION_TYPE.INCOME,
        value: 100,
        currency: CURRENCIES_TYPE.RUB,
        comment: '',
        date: '',
        goal: {
          id: 1,
          name: 'Копилка 1',
          value: 0,
          currency: CURRENCIES_TYPE.RUB,
          order: 0,
        },
      },
      {
        id: 2,
        actionType: SAVING_ACTION_TYPE.INCOME,
        value: 100,
        currency: CURRENCIES_TYPE.USD,
        comment: '',
        date: '',
        goal: {
          id: 1,
          name: 'Копилка 2',
          value: 0,
          currency: CURRENCIES_TYPE.USD,
          order: 0,
        },
      },
      {
        id: 3,
        actionType: SAVING_ACTION_TYPE.EXPENSE,
        value: 1000,
        currency: CURRENCIES_TYPE.RUB,
        comment: '',
        date: '',
        goal: {
          id: 1,
          name: 'Копилка 1',
          value: 0,
          currency: CURRENCIES_TYPE.RUB,
          order: 0,
        },
      },
      {
        id: 4,
        actionType: SAVING_ACTION_TYPE.EXPENSE,
        value: 15,
        currency: CURRENCIES_TYPE.USD,
        comment: '',
        date: '',
        goal: {
          id: 1,
          name: 'Копилка 2',
          value: 0,
          currency: CURRENCIES_TYPE.USD,
          order: 0,
        },
      },
      {
        id: 5,
        actionType: SAVING_ACTION_TYPE.EXPENSE,
        value: 50,
        currency: CURRENCIES_TYPE.USD,
        comment: '',
        date: '',
        goal: {
          id: 2,
          name: 'Копилка 2',
          value: 0,
          currency: CURRENCIES_TYPE.USD,
          order: 0,
        },
      },
    ];

    const currencies = [CURRENCIES_TYPE.USD, CURRENCIES_TYPE.RUB];

    const expectedResult = {
      income: { [CURRENCIES_TYPE.RUB]: 250, [CURRENCIES_TYPE.USD]: 100 },
      expense: { [CURRENCIES_TYPE.RUB]: 1000, [CURRENCIES_TYPE.USD]: 65 },
      diff: { [CURRENCIES_TYPE.RUB]: -750, [CURRENCIES_TYPE.USD]: 35 },
    };

    expect(getTotalByCategoriesAnalytics(savings, currencies)).toEqual(expectedResult);
  });
});
