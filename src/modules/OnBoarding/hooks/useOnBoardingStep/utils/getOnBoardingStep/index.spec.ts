import { CATEGORIES_TYPES, ON_BOARDING_STATUSES, ON_BOARDING_STEPS } from '@/constants';
import { Category, Item } from '@/interfaces';

import { getOnBoardingStep } from './index';

describe('getOnBoardingStep', () => {
  it('Возвращает шаг категорий', () => {
    const categories: Category[] = [];
    const plans: Item[] = [];
    const facts: Item[] = [];
    const state = {};

    expect(getOnBoardingStep(categories, plans, facts, state)).toBe(ON_BOARDING_STEPS.CATEGORIES);
  });

  it('Возвращает шаг плана', () => {
    const categories = [
      {
        id: 1,
        name: 'Категория расходов',
        type: CATEGORIES_TYPES.EXPENSE,
        startDate: '',
        endDate: '',
      },
    ];
    const plans: Item[] = [];
    const facts: Item[] = [];
    const state = { [ON_BOARDING_STEPS.BALANCE]: { state: ON_BOARDING_STATUSES.CLOSED } };

    expect(getOnBoardingStep(categories, plans, facts, state)).toBe(ON_BOARDING_STEPS.PLANS);
  });

  it('Возвращает шаг баланса', () => {
    const categories: Category[] = [
      {
        id: 1,
        name: 'Категория расходов',
        type: CATEGORIES_TYPES.EXPENSE,
        startDate: '',
        endDate: '',
      },
    ];
    const plans: Item[] = [
      {
        id: 1,
        date: '',
        comment: '',
        value: 100,
        category: {
          id: 1,
          name: 'Категория расходов',
          type: CATEGORIES_TYPES.EXPENSE,
          startDate: '',
          endDate: '',
        },
      },
    ];
    const facts: Item[] = [];
    const state = { [ON_BOARDING_STEPS.PLANS]: { state: ON_BOARDING_STATUSES.CLOSED } };

    expect(getOnBoardingStep(categories, plans, facts, state)).toBe(ON_BOARDING_STEPS.BALANCE);
  });

  it('Возвращает шаг факта', () => {
    const categories = [
      {
        id: 1,
        name: 'Категория расходов',
        type: CATEGORIES_TYPES.EXPENSE,
        startDate: '',
        endDate: '',
      },
    ];
    const plans: Item[] = [
      {
        id: 1,
        date: '',
        comment: '',
        value: 100,
        category: {
          id: 1,
          name: 'Категория расходов',
          type: CATEGORIES_TYPES.EXPENSE,
          startDate: '',
          endDate: '',
        },
      },
    ];
    const facts: Item[] = [];
    const state = { [ON_BOARDING_STEPS.BALANCE]: { state: ON_BOARDING_STATUSES.CLOSED } };

    expect(getOnBoardingStep(categories, plans, facts, state)).toBe(ON_BOARDING_STEPS.FACTS);
  });

  it('Пропускает шаги если все пройдено', () => {
    const categories = [
      {
        id: 1,
        name: 'Категория расходов',
        type: CATEGORIES_TYPES.EXPENSE,
        startDate: '',
        endDate: '',
      },
    ];
    const plans: Item[] = [
      {
        id: 1,
        date: '',
        comment: '',
        value: 100,
        category: {
          id: 1,
          name: 'Категория расходов',
          type: CATEGORIES_TYPES.EXPENSE,
          startDate: '',
          endDate: '',
        },
      },
    ];
    const facts: Item[] = [
      {
        id: 1,
        date: '',
        comment: '',
        value: 100,
        category: {
          id: 1,
          name: 'Категория расходов',
          type: CATEGORIES_TYPES.EXPENSE,
          startDate: '',
          endDate: '',
        },
      },
    ];
    const state = {
      [ON_BOARDING_STEPS.CATEGORIES]: { state: ON_BOARDING_STATUSES.CLOSED },
      [ON_BOARDING_STEPS.PLANS]: { state: ON_BOARDING_STATUSES.CLOSED },
      [ON_BOARDING_STEPS.FACTS]: { state: ON_BOARDING_STATUSES.CLOSED },
      [ON_BOARDING_STEPS.BALANCE]: { state: ON_BOARDING_STATUSES.CLOSED },
    };

    expect(getOnBoardingStep(categories, plans, facts, state)).toBe(null);
  });
});
