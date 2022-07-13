import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { AddFactBody } from '../../interfaces';
import { UseAddFactResult } from './interfaces';

export const useAddFact = (isIncome = false): UseAddFactResult => {
  const config = isIncome ? ApiConfig.addIncomeFact : ApiConfig.addExpenseFact;

  const { isLoading, executePut } = useMutation({ config });

  const add = useCallback(
    async (body: AddFactBody) => {
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
    add,
  };
};
