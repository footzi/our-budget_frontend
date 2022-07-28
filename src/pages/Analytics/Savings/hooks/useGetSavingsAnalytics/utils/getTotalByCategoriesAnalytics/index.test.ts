import { getTotalByCategoriesAnalytics } from './index';

describe('Analytics.Categories.useGetCategoriesAnalytics.getTotalByCategoriesAnalytics', () => {
  it('Возвращает негативные корректные данные', () => {
    const savings = [
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

    const expectedResult = {
      income: 750,
      expense: 800,
      diff: {
        value: -50,
        isPositive: false,
      },
    };

    expect(getTotalByCategoriesAnalytics(savings)).toEqual(expectedResult);
  });

  it('Возвращает позитивные корректные данные', () => {
    const savings = [
      {
        key: 1,
        name: 'Копилка 1',
        income: 1000,
        expense: 100,
        diff: {
          value: -200,
          isPositive: false,
        },
      },
      {
        key: 2,
        name: 'Копилка 2',
        income: 2000,
        expense: 50,
        diff: {
          value: 150,
          isPositive: true,
        },
      },
    ];

    const expectedResult = {
      income: 3000,
      expense: 150,
      diff: {
        value: 2850,
        isPositive: true,
      },
    };

    expect(getTotalByCategoriesAnalytics(savings)).toEqual(expectedResult);
  });
});
