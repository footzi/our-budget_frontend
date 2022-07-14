import { Maybe } from '@/interfaces';

import { SavingGoalAddBody, SavingGoalRender, SavingGoalUpdateBody } from '../interfaces';

export interface SavingGoalModalProps {
  isShow: boolean;
  editedGoal: Maybe<SavingGoalRender>;
  onAdd(body: SavingGoalAddBody): void;
  onUpdate(body: SavingGoalUpdateBody): void;
  onCancel(): void;
  onDelete(id: number): void;
  isLoading: boolean;
  isLoadingDelete: boolean;
}
