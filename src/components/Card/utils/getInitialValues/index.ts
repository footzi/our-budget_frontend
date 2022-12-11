import { CARD_FORM_FIELDS } from '@/components/Card';
import { CURRENCIES_TYPE, LOCAL_STORAGE_ITEMS } from '@/constants';
import { Category, CurrencyOption, Maybe, SavingGoal } from '@/interfaces';
import { LocalStorage } from '@/utils/localStorage';
import dayjs, { Dayjs } from 'dayjs';

import { CardFormField, CardFormSavedValues } from './../../interfaces';
import { GetInitialValuesProps, GetInitialValuesResult } from './interfaces';

const getInitialDate = (selectedDay: Maybe<Dayjs>, values: Maybe<CardFormField>): Dayjs => {
  const savedDay = (values ? values[CARD_FORM_FIELDS.DATE] : '') as string;

  if (savedDay) {
    return dayjs(savedDay);
  }

  if (selectedDay) {
    return dayjs(selectedDay);
  }

  return dayjs();
};

const getInitialCurrency = (
  currenciesOptions: CurrencyOption[],
  values: Maybe<CardFormField>
): Maybe<CURRENCIES_TYPE> => {
  const savedCurrency = (values ? values[CARD_FORM_FIELDS.CURRENCY] : null) as CURRENCIES_TYPE | null;

  if (savedCurrency) {
    return savedCurrency;
  }

  return currenciesOptions.length > 0 ? currenciesOptions[0].value : null;
};

const getInitialCategory = (categories: Category[], values: Maybe<CardFormField>): Maybe<number> => {
  const savedCategory = (values ? values[CARD_FORM_FIELDS.CATEGORY_ID] : null) as number | null;

  if (savedCategory) {
    return savedCategory;
  }

  return categories.length > 0 ? categories[0].id : null;
};

const getInitialGoal = (goals: SavingGoal[], values: Maybe<CardFormField>): Maybe<number> => {
  const savedGoal = (values ? values[CARD_FORM_FIELDS.GOAL_ID] : null) as number | null;

  if (savedGoal) {
    return savedGoal;
  }

  return goals.length > 0 ? goals[0].id : null;
};

export const getInitialValues = ({
  cardType,
  selectedDate,
  currenciesOptions = [],
  categories = [],
  savingGoals = [],
}: GetInitialValuesProps): GetInitialValuesResult => {
  const cardValues = LocalStorage.get<CardFormSavedValues>(LOCAL_STORAGE_ITEMS.CARD_VALUES);
  const values = cardValues ? cardValues[cardType] : null;

  return {
    date: getInitialDate(selectedDate, values),
    currency: getInitialCurrency(currenciesOptions, values),
    categoryId: getInitialCategory(categories, values),
    goalId: getInitialGoal(savingGoals, values),
  };
};
