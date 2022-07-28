import { SAVING_ACTION_TYPE } from '@/constants';

import { formatToTableSavingsAnalytics } from './index';

describe('Analytics.Savings.useGetSavingsAnalytics.formatToTableSavingsAnalytics', () => {
  it('Возвращает корректные данные', () => {
    const goals = [
      {
        id: 1,
        name: 'Копилка 1',
        value: 0,
      },
      {
        id: 2,
        name: 'Копилка 2',
      },
    ];

    const savings = [
      {
        id: 1,
        actionType: SAVING_ACTION_TYPE.INCOME,
        value: 150,
        comment: '',
        date: '',
        goal: {
          id: 1,
          name: 'Копилка 1',
          value: 0,
        },
      },
      {
        id: 2,
        actionType: SAVING_ACTION_TYPE.INCOME,
        value: 100,
        comment: '',
        date: '',
        goal: {
          id: 1,
          name: 'Копилка 1',
          value: 0,
        },
      },
      {
        id: 3,
        actionType: SAVING_ACTION_TYPE.EXPENSE,
        value: 250,
        comment: '',
        date: '',
        goal: {
          id: 1,
          name: 'Копилка 1',
          value: 0,
        },
      },
      {
        id: 4,
        actionType: SAVING_ACTION_TYPE.EXPENSE,
        value: 200,
        comment: '',
        date: '',
        goal: {
          id: 1,
          name: 'Копилка 1',
          value: 0,
        },
      },
      {
        id: 5,
        actionType: SAVING_ACTION_TYPE.INCOME,
        value: 500,
        comment: '',
        date: '',
        goal: {
          id: 2,
          name: 'Копилка 2',
          value: 0,
        },
      },
      {
        id: 6,
        actionType: SAVING_ACTION_TYPE.EXPENSE,
        value: 350,
        comment: '',
        date: '',
        goal: {
          id: 2,
          name: 'Копилка 2',
          value: 0,
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
