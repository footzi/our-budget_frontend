import { CARD_TYPES } from '@/components/Card';
import { NotContent } from '@/components/NotContent';
import { ROUTES } from '@/constants/routes';
import React from 'react';

import { NotCategoryProps } from './interfaces';

const getText = (type: CARD_TYPES): string => {
  if (type === CARD_TYPES.SAVINGS_FACT || type === CARD_TYPES.SAVINGS_PLAN) {
    return 'Создайте свою первую копилку';
  } else {
    return 'Создайте свою первую категорию';
  }
};

const getLink = (type: CARD_TYPES): string => {
  if (type === CARD_TYPES.SAVINGS_FACT || type === CARD_TYPES.SAVINGS_PLAN) {
    return ROUTES.SAVING_GOALS;
  } else {
    return ROUTES.CATEGORIES;
  }
};

export const NotCategory: React.FC<NotCategoryProps> = ({ type }) => {
  const text = getText(type);
  const to = getLink(type);

  return <NotContent text={text} to={to} />;
};
