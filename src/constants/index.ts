import { Currency, CurrencyOption } from '@/interfaces';

export enum LOCAL_STORAGE_ITEMS {
  USER = 'USER',
  ON_BOARDING_STATUSES = 'ON_BOARDING_STATUSES',
  CARD_VALUES = 'CARD_VALUES',
  SHOW_HOW_IT_WORK_MODAL = 'SHOW_HOW_IT_WORK_MODAL',
  SHOW_BALANCE_HELP_HINT = 'SHOW_BALANCE_HELP_HINT',
  SHOW_INCOME_FACT_HELP_HINT = 'SHOW_INCOME_FACT_HELP_HINT',
  SHOW_EXPENSE_FACT_HELP_HINT = 'SHOW_EXPENSE_FACT_HELP_HINT',
  SHOW_SAVING_FACT_HELP_HINT = 'SHOW_SAVING_FACT_HELP_HINT',
}

export enum SESSION_STORAGE_ITEMS {
  USER = 'USER',
  ON_BOARDING_STATUSES = 'ON_BOARDING_STATUSES',
  CARD_VALUES = 'CARD_VALUES',
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

export enum BALANCE_HISTORY_ACTION {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  MANUAL = 'MANUAL',
}

export const BALANCE_HISTORY_ACTION_TEXT = {
  [BALANCE_HISTORY_ACTION.INCREMENT]: '⬆️ Увеличение',
  [BALANCE_HISTORY_ACTION.DECREMENT]: '⬇️ Уменьшение',
  [BALANCE_HISTORY_ACTION.MANUAL]: '🔄 Ручное изменение',
};

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
  EUR = 'EUR',
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
  [CURRENCIES_TYPE.EUR]: {
    name: CURRENCIES_TYPE.EUR,
    symbol: '€',
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
  {
    label: CURRENCIES.EUR.symbol,
    value: CURRENCIES.EUR.name,
  },
];

export const DEFAULT_CURRENCY = CURRENCIES_TYPE.RUB;

export const EMAIL_REGEXP = '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$';
export const PASSWORD_MIN_LENGTH = 5;

export * from './link';
export * from './routes';
