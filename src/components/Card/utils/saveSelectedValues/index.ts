import { LOCAL_STORAGE_ITEMS } from '@/constants';
import { Maybe } from '@/interfaces';
import { LocalStorage } from '@/utils/localStorage';

import { AVAILABLE_FIELDS_FOR_SAVE, CARD_TYPES } from '../../constants';
import { CardFormField, CardFormFieldValue, CardFormSavedValues } from '../../interfaces';

export const getValuesForSave = (cardType: CARD_TYPES, body: CardFormField, savedValues: CardFormSavedValues) => {
  let result = null;

  const name = Object.keys(body)[0] as Maybe<CardFormFieldValue>;

  if (name && AVAILABLE_FIELDS_FOR_SAVE.includes(name)) {
    const value = body[name];

    if (!savedValues) {
      result = {
        [cardType]: {
          [name]: value,
        },
      };

      return result;
    }

    const current = savedValues[cardType];

    if (current) {
      result = {
        ...savedValues,
        [cardType]: {
          ...current,
          [name]: value,
        },
      };
    } else {
      result = {
        ...savedValues,
        [cardType]: {
          [name]: value,
        },
      };
    }
  }

  return result;
};

export const saveSelectedValues = (cardType: CARD_TYPES, body: CardFormField) => {
  const savedValues = LocalStorage.get<CardFormSavedValues>(LOCAL_STORAGE_ITEMS.CARD_VALUES);

  const result = getValuesForSave(cardType, body, savedValues);

  if (result) {
    LocalStorage.set(LOCAL_STORAGE_ITEMS.CARD_VALUES, result);
  }
};
