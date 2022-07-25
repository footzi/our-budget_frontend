import { CATEGORIES_TYPES } from '@/constants';

import { CATEGORY_MODAL_TITLES } from '../constants';
import { getModalTitle } from './index';

describe('get category modal title', () => {
  it('should correct result if edited category', () => {
    const category = {
      id: 1,
      key: 1,
      name: 'Кредиты',
      type: CATEGORIES_TYPES.INCOME,
      startDate: '',
      endDate: '',
      period: '',
    };
    const result = `${CATEGORY_MODAL_TITLES.EDITED} "${category.name}"`;

    expect(getModalTitle(category, CATEGORIES_TYPES.INCOME)).toBe(result);
  });

  it('should correct result if new income category', () => {
    expect(getModalTitle(null, CATEGORIES_TYPES.INCOME)).toBe(CATEGORY_MODAL_TITLES.NEW_INCOME);
  });

  it('should correct result if new expense category', () => {
    expect(getModalTitle(null, CATEGORIES_TYPES.EXPENSE)).toBe(CATEGORY_MODAL_TITLES.NEW_EXPENSE);
  });
});
