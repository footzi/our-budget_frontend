import { useCallback } from 'react';

import { REFETCHES_LIST } from './constants';
import { RefetchValues } from './interfaces';

class Refetches {
  values: RefetchValues;

  constructor() {
    // @ts-ignore
    this.values = {};
  }

  add(key: REFETCHES_LIST, refetch: () => void) {
    this.values[key] = refetch;
  }

  call(key: REFETCHES_LIST) {
    const refetch = this.values[key];

    if (refetch) {
      refetch();
    } else {
      console.error('В Refetches нет такого ключа');
    }
  }
}

export const refetches = new Refetches();

export const useRefetch = (type: REFETCHES_LIST): (() => void) => {
  return useCallback(() => {
    refetches.call(type);
  }, [type]);
};

export const useRefetchBalance = () => useRefetch(REFETCHES_LIST.BALANCES);
export const useRefetchSavingGoals = () => useRefetch(REFETCHES_LIST.SAVING_GOALS);
export const useRefetchCategories = () => useRefetch(REFETCHES_LIST.CATEGORIES);
