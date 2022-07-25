import { CATEGORIES_TYPES } from '@/constants';
import { Maybe } from '@/interfaces';

import { CategoryRender } from '../../../interfaces';
import { CATEGORY_MODAL_TITLES } from '../constants';

/**
 * Формируем текст заголовка для модкалки категорий
 */
export const getModalTitle = (category: Maybe<CategoryRender>, type: CATEGORIES_TYPES) => {
  if (category) {
    return `${CATEGORY_MODAL_TITLES.EDITED} "${category.name}"`;
  }

  if (type === CATEGORIES_TYPES.INCOME) {
    return CATEGORY_MODAL_TITLES.NEW_INCOME;
  }

  if (type === CATEGORIES_TYPES.EXPENSE) {
    return CATEGORY_MODAL_TITLES.NEW_EXPENSE;
  }
};
