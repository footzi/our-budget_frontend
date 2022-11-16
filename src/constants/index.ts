import { Currency, CurrencyOption } from '@/interfaces';

export enum LocalStorageItems {
  USER = 'USER',
  ON_BOARDING_STATUSES = 'ON_BOARDING_STATUSES',
}

export enum CATEGORIES_TYPES {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export const CATEGORIES_TYPES_LIST = [
  { type: CATEGORIES_TYPES.INCOME, text: 'Доходы' },
  {
    type: CATEGORIES_TYPES.EXPENSE,
    text: 'Расходы',
  },
];

export enum SAVING_ACTION_TYPE {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export const SAVING_ACTION_TYPES_LIST = [
  { type: SAVING_ACTION_TYPE.INCOME, text: 'Положить' },
  {
    type: SAVING_ACTION_TYPE.EXPENSE,
    text: 'Вынуть',
  },
];

export const FORMAT_UI_DATE = 'DD.MM.YYYY';
export const FORMAT_UI_SHORT_DATE = 'DD.MM';
export const FORMAT_BACKEND_DATE = 'YYYY-MM-DDTHH:mm:ss';

export enum ON_BOARDING_STEPS {
  CATEGORIES = 'CATEGORIES',
  BALANCE = 'BALANCE',
  PLANS = 'PLANS',
  FACTS = 'FACTS',
}

export enum ON_BOARDING_STATUSES {
  INITIAL = 'INITIAL',
  CLOSED = 'CLOSED',
}

// Currencies
export enum CURRENCIES_TYPE {
  RUB = 'RUB',
  USD = 'USD',
}

export const CURRENCIES: Record<keyof typeof CURRENCIES_TYPE, Currency> = {
  [CURRENCIES_TYPE.RUB]: {
    name: CURRENCIES_TYPE.RUB,
    symbol: '₽',
  },
  [CURRENCIES_TYPE.USD]: {
    name: CURRENCIES_TYPE.USD,
    symbol: '$',
  },
};

export const OPTIONS_CURRENCIES: CurrencyOption[] = [
  {
    label: CURRENCIES.RUB.symbol,
    value: CURRENCIES.RUB.name,
  },
  {
    label: CURRENCIES.USD.symbol,
    value: CURRENCIES.USD.name,
  },
];
