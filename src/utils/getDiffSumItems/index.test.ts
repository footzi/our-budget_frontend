import { CURRENCIES_TYPE } from '@/constants';

import { getDiffSumItems } from './index';

describe('Analytics.Categories.useGetCategoriesAnalytics.getDiffSumItems', () => {
  it('Возвращает корректные данные только по существующим валютам', () => {
    const plan = {
      [CURRENCIES_TYPE.USD]: 1000,
      [CURRENCIES_TYPE.RUB]: 2000,
    };

    const fact = {
      [CURRENCIES_TYPE.USD]: 1500,
      [CURRENCIES_TYPE.RUB]: 800,
    };

    const currencies = [CURRENCIES_TYPE.USD, CURRENCIES_TYPE.RUB, CURRENCIES_TYPE.EUR];

    const expected = {
      [CURRENCIES_TYPE.USD]: -500,
      [CURRENCIES_TYPE.RUB]: 1200,
    };

    expect(getDiffSumItems(plan, fact, currencies)).toEqual(expected);
  });

  it('возвращает корректные данные если нет записей по плану', () => {
    const plan = {
      [CURRENCIES_TYPE.USD]: 2000,
    };

    const fact = {
      [CURRENCIES_TYPE.USD]: 1300,
      [CURRENCIES_TYPE.RUB]: 800,
    };

    const currencies = [CURRENCIES_TYPE.USD, CURRENCIES_TYPE.RUB, CURRENCIES_TYPE.EUR];

    const expected = {
      [CURRENCIES_TYPE.USD]: 700,
      [CURRENCIES_TYPE.RUB]: -800,
    };

    expect(getDiffSumItems(plan, fact, currencies)).toEqual(expected);
  });

  it('возвращает корректные данные если нет записей по факту', () => {
    const plan = {
      [CURRENCIES_TYPE.USD]: 1000,
      [CURRENCIES_TYPE.RUB]: 2000,
    };

    const fact = {
      [CURRENCIES_TYPE.RUB]: 2500,
    };

    const currencies = [CURRENCIES_TYPE.USD, CURRENCIES_TYPE.RUB, CURRENCIES_TYPE.EUR];

    const expected = {
      [CURRENCIES_TYPE.USD]: 1000,
      [CURRENCIES_TYPE.RUB]: -500,
    };

    expect(getDiffSumItems(plan, fact, currencies)).toEqual(expected);
  });
});
