import { CURRENCIES_TYPE, SAVING_ACTION_TYPE } from '@/constants';

import { formatToTableSavingsAnalytics } from './index';

describe('Analytics.Savings.useGetSavingsAnalytics.formatToTableSavingsAnalytics', () => {
  it('Возвращает корректные данные', () => {
    const goals = [
      {
        id: 1,
        name: 'Копилка 1',
        value: 0,
        currency: CURRENCIES_TYPE.RUB,
      },
      {
        id: 2,
        name: 'Копилка 2',
        currency: CURRENCIES_TYPE.RUB,
      },
    ];

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
        },
      },
      {
        id: 3,
        actionType: SAVING_ACTION_TYPE.EXPENSE,
        value: 250,
        currency: CURRENCIES_TYPE.RUB,
        comment: '',
        date: '',
        goal: {
          id: 1,
          name: 'Копилка 1',
          value: 0,
          currency: CURRENCIES_TYPE.RUB,
        },
      },
      {
        id: 4,
        actionType: SAVING_ACTION_TYPE.EXPENSE,
        value: 200,
        currency: CURRENCIES_TYPE.RUB,
        comment: '',
        date: '',
        goal: {
          id: 1,
          name: 'Копилка 1',
          value: 0,
          currency: CURRENCIES_TYPE.RUB,
        },
      },
      {
        id: 5,
        actionType: SAVING_ACTION_TYPE.INCOME,
        value: 500,
        currency: CURRENCIES_TYPE.RUB,
        comment: '',
        date: '',
        goal: {
          id: 2,
          name: 'Копилка 2',
          value: 0,
          currency: CURRENCIES_TYPE.RUB,
        },
      },
      {
        id: 6,
        actionType: SAVING_ACTION_TYPE.EXPENSE,
        value: 350,
        currency: CURRENCIES_TYPE.RUB,
        comment: '',
        date: '',
        goal: {
          id: 2,
          name: 'Копилка 2',
          value: 0,
          currency: CURRENCIES_TYPE.RUB,
        },
      },
    ];

    const expectedResult = [
      {
        key: 1,
        name: 'Копилка 1',
        income: 250,
        expense: 450,
        diff: {
          value: -200,
          isPositive: false,
        },
      },
      {
        key: 2,
        name: 'Копилка 2',
        income: 500,
        expense: 350,
        diff: {
          value: 150,
          isPositive: true,
        },
      },
    ];

    expect(formatToTableSavingsAnalytics(goals, savings)).toEqual(expectedResult);
  });
});
