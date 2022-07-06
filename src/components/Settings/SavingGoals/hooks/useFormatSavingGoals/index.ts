import { useAppSelector } from '@/store';

import { SavingGoalRender } from '../../interfaces';
import { formatSavingToTable } from './utils/formatSavingToTable';

export const useFormatSavingGoals = (): SavingGoalRender[] => {
  const { savingGoals } = useAppSelector();

  return formatSavingToTable(savingGoals.value ?? []);
};
