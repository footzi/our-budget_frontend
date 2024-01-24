import { ApiConfig, useQuery } from '@/api';
import { BalanceHistory } from '@/interfaces';

import { UseGetBalanceHistoryResult } from './interfases';
import { transformBalanceHistory } from './utils/transformBalanceHistory';

export const useGetBalanceHistory = (): UseGetBalanceHistoryResult => {
  const { isLoading, data } = useQuery<{ history: BalanceHistory[] }>({
    config: ApiConfig.balanceHistory,
  });

  const history = transformBalanceHistory(data?.history ?? []);

  return { isLoading, history };
};
