import { CARD_TYPES } from '@/components/Card';
import { ROUTES } from '@/constants/routes';

export const getLink = (type: CARD_TYPES): string => {
  if (type === CARD_TYPES.SAVINGS_FACT || type === CARD_TYPES.SAVINGS_PLAN) {
    return ROUTES.SAVING_GOALS;
  } else {
    return ROUTES.CATEGORIES;
  }
};
