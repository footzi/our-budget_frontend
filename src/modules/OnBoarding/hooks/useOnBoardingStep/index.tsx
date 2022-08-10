import { LocalStorageItems, ON_BOARDING_STATUSES } from '@/constants';
import { OnBoardingItemsLS } from '@/interfaces';
import { setOnBoardingStep, useAppDispatch, useAppSelector } from '@/store';
import { LocalStorage } from '@/utils/localStorage';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { UseOnBoardingStepResult } from './interfaces';
import { getOnBoardingStep } from './utils/getOnBoardingStep';

export const useOnBoardingStep = (): UseOnBoardingStepResult => {
  const [isVisible, setIsVisible] = useState(false);
  const { categories, incomes, expenses } = useAppSelector();
  const dispatch = useAppDispatch();

  const step = useMemo(() => {
    const plans = [...incomes.plan.list, ...expenses.plan.list];
    const facts = [...incomes.fact.list, ...expenses.fact.list];
    const state = LocalStorage.get<OnBoardingItemsLS>(LocalStorageItems.ON_BOARDING_STATUSES) ?? {};

    return getOnBoardingStep(categories.value, plans, facts, state);
  }, [categories.value, incomes, expenses]);

  const update = useCallback(() => {
    setIsVisible(false);

    if (step) {
      const statuses = LocalStorage.get<OnBoardingItemsLS>(LocalStorageItems.ON_BOARDING_STATUSES) ?? {};

      const newState = {
        ...statuses,
        [step]: {
          state: ON_BOARDING_STATUSES.CLOSED,
        },
      };

      LocalStorage.set(LocalStorageItems.ON_BOARDING_STATUSES, newState);
    }
  }, [step]);

  useEffect(() => {
    dispatch(setOnBoardingStep(step));
    setIsVisible(Boolean(step));
  }, [dispatch, step]);

  return { step, update, isVisible };
};
