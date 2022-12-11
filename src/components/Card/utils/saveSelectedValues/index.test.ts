import { CURRENCIES_TYPE } from '@/constants';

import { CARD_FORM_FIELDS, CARD_TYPES } from '../../constants';
import { CardFormField, CardFormSavedValues } from './../../interfaces';
import { getValuesForSave } from './index';

describe('getValuesForSave', () => {
  it('return correct result if not saved values', () => {
    const cardType = CARD_TYPES.EXPENSE_FACT;
    const savedValues = null;
    const body = { [CARD_FORM_FIELDS.GOAL_ID]: 1 } as CardFormField;

    const expectedValue = {
      [cardType]: {
        [CARD_FORM_FIELDS.GOAL_ID]: 1,
      },
    };

    expect(getValuesForSave(cardType, body, savedValues)).toEqual(expectedValue);
  });

  it('return correct result if saved values by same card type', () => {
    const cardType = CARD_TYPES.EXPENSE_FACT;
    const savedValues = {
      [cardType]: {
        [CARD_FORM_FIELDS.GOAL_ID]: 1,
      },
    } as CardFormSavedValues;
    const body = { [CARD_FORM_FIELDS.CURRENCY]: CURRENCIES_TYPE.USD } as CardFormField;

    const expectedValue = {
      [cardType]: {
        [CARD_FORM_FIELDS.GOAL_ID]: 1,
        [CARD_FORM_FIELDS.CURRENCY]: CURRENCIES_TYPE.USD,
      },
    };

    expect(getValuesForSave(cardType, body, savedValues)).toEqual(expectedValue);
  });

  it('return correct result if saved values by not same card type', () => {
    const cardType = CARD_TYPES.EXPENSE_FACT;
    const cardTypeNew = CARD_TYPES.INCOME_FACT;
    const savedValues = {
      [cardType]: {
        [CARD_FORM_FIELDS.GOAL_ID]: 1,
      },
    } as CardFormSavedValues;
    const body = { [CARD_FORM_FIELDS.CURRENCY]: CURRENCIES_TYPE.USD } as CardFormField;

    const expectedValue = {
      [cardType]: {
        [CARD_FORM_FIELDS.GOAL_ID]: 1,
      },
      [cardTypeNew]: {
        [CARD_FORM_FIELDS.CURRENCY]: CURRENCIES_TYPE.USD,
      },
    };

    expect(getValuesForSave(cardTypeNew, body, savedValues)).toEqual(expectedValue);
  });

  it('return correct result if form field is not available', () => {
    const cardType = CARD_TYPES.EXPENSE_FACT;
    const savedValues = {
      [cardType]: {
        [CARD_FORM_FIELDS.GOAL_ID]: 1,
      },
    } as CardFormSavedValues;
    const body = { [CARD_FORM_FIELDS.COMMENT]: 'hello' } as CardFormField;

    expect(getValuesForSave(cardType, body, savedValues)).toBeNull();
  });
});
