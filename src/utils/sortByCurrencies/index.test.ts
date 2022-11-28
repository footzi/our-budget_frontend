import { CURRENCIES_TYPE } from '@/constants';

import { sortByCurrencies } from './index';

describe('sortByCurrencies', () => {
  it('Возвращает корректное значение', () => {
    const values = { [CURRENCIES_TYPE.RUB]: 1000, [CURRENCIES_TYPE.EUR]: 20, [CURRENCIES_TYPE.USD]: 100 };
    const currencies = [CURRENCIES_TYPE.USD, CURRENCIES_TYPE.RUB, CURRENCIES_TYPE.EUR];

    const expected = { [CURRENCIES_TYPE.USD]: 100, [CURRENCIES_TYPE.RUB]: 1000, [CURRENCIES_TYPE.EUR]: 20 };

    expect(sortByCurrencies(values, currencies)).toEqual(expected);
  });

  it('Возвращает корректное значение при отсутствующем значении', () => {
    const values = { [CURRENCIES_TYPE.RUB]: 1000, [CURRENCIES_TYPE.USD]: 100 };
    const currencies = [CURRENCIES_TYPE.USD, CURRENCIES_TYPE.RUB, CURRENCIES_TYPE.EUR];

    const expected = { [CURRENCIES_TYPE.USD]: 100, [CURRENCIES_TYPE.RUB]: 1000 };

    expect(sortByCurrencies(values, currencies)).toEqual(expected);
  });
});
