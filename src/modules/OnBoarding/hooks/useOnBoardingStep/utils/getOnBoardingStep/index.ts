import { CATEGORIES_TYPES, ON_BOARDING_STATUSES, ON_BOARDING_STEPS } from '@/constants';
import { Category, Item, Maybe, OnBoardingItemsLS } from '@/interfaces';

export const getOnBoardingStep = (
  categories: Category[],
  plans: Item[],
  facts: Item[],
  state: OnBoardingItemsLS
): Maybe<ON_BOARDING_STEPS> => {
  // Категории
  const isCategories = categories.some(
    (category) => category.type === CATEGORIES_TYPES.INCOME || category.type === CATEGORIES_TYPES.EXPENSE
  );
  const isPlans = plans.length > 0;
  const isFacts = facts.length > 0;

  if (!isCategories) {
    return ON_BOARDING_STEPS.CATEGORIES;
  }

  // План
  const isClosedPlans = state[ON_BOARDING_STEPS.PLANS]
    ? state[ON_BOARDING_STEPS.PLANS].state === ON_BOARDING_STATUSES.CLOSED
    : false;

  if (!isPlans && !isClosedPlans) {
    return ON_BOARDING_STEPS.PLANS;
  }

  // Баланс
  const isClosedBalance = state[ON_BOARDING_STEPS.BALANCE]
    ? state[ON_BOARDING_STEPS.BALANCE].state === ON_BOARDING_STATUSES.CLOSED
    : false;

  if (isClosedPlans && !isClosedBalance) {
    return ON_BOARDING_STEPS.BALANCE;
  }

  // Факт
  const isClosedFacts = state[ON_BOARDING_STEPS.FACTS]
    ? state[ON_BOARDING_STEPS.FACTS].state === ON_BOARDING_STATUSES.CLOSED
    : false;

  if (!isFacts && !isClosedFacts && isClosedBalance) {
    return ON_BOARDING_STEPS.FACTS;
  }

  return null;
};
