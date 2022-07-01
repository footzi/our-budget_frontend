import { useAppContext } from '@/context';

import { SavingGoalRender } from '../../interfaces';
import { formatSavingToTable } from './utils/formatSavingToTable';

export const useFormatSavingGoals = (): SavingGoalRender[] => {
  const { savingGoals } = useAppContext();

  return formatSavingToTable(savingGoals.value ?? []);
};
