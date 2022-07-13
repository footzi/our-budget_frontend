import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UpdateFactBody } from '../../interfaces';
import { UseUpdateFactResult } from './interfaces';

export const useUpdateFact = (isIncome = false): UseUpdateFactResult => {
  const config = isIncome ? ApiConfig.updateIncomeFact : ApiConfig.updateExpenseFact;
  const { isLoading, executePut } = useMutation({ config });

  const update = useCallback(
    async (body: UpdateFactBody) => {
      await executePut({
        data: {
          ...body,
        },
      });
    },
    [executePut]
  );

  return {
    isLoading,
    update,
  };
};
