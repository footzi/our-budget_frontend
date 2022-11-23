import { CURRENCIES_TYPE } from '@/constants';
import { Maybe } from '@/interfaces';

import { SavingGoalAddBody, SavingGoalRender, SavingGoalUpdateBody } from '../interfaces';

export interface SavingGoalModalProps {
  isShow: boolean;
  editedGoal: Maybe<SavingGoalRender>;
  currencies: CURRENCIES_TYPE[];
  onAdd(body: SavingGoalAddBody): void;
  onUpdate(body: SavingGoalUpdateBody): void;
  onCancel(): void;
  onDelete(id: number): void;
  isLoading: boolean;
  isLoadingDelete: boolean;
}
