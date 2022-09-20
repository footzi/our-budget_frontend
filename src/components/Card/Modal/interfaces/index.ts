import { CARD_TYPES } from '@/components/Card';
import { Category, Maybe, SavingGoal } from '@/interfaces';

import { CardItem, UpdateSaveBody } from '../../interfaces';

export interface CardModalProps {
  item: Maybe<CardItem>;
  type: CARD_TYPES;
  onOk?: () => void;
  onCancel: () => void;
  onSubmit: (type: CARD_TYPES, body: UpdateSaveBody) => void;
  onDelete: (type: CARD_TYPES, id: number) => void;
  isShowDate: boolean;
  categories?: Category[];
  savingGoals?: SavingGoal[];
  isLoadingUpdate: boolean;
  isLoadingDelete: boolean;
}
