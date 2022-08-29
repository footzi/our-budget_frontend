import { CARD_TYPES } from '@/components/Card';

export const getText = (type: CARD_TYPES): string => {
  switch (type) {
    case CARD_TYPES.INCOME_PLAN:
    case CARD_TYPES.INCOME_FACT:
      return 'Ой!\n Прежде чем заполнять этот раздел, создайте свои категории доходов.';
    case CARD_TYPES.EXPENSE_FACT:
    case CARD_TYPES.EXPENSE_PLAN:
      return 'Ой!\n Прежде чем заполнять этот раздел, создайте свои категории расходов.';
    case CARD_TYPES.SAVINGS_FACT:
    case CARD_TYPES.SAVINGS_PLAN:
      return 'Ой!\n Прежде чем заполнять этот раздел, создайте свою первую копилку.';

    default:
      return 'DEFAULT';
  }
};
