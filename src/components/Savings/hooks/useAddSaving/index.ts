import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { AddSavingBody } from '../../interfaces';
import { UseAddSavingResult } from './interfaces';

export const useAddSaving = (isPlan = false): UseAddSavingResult => {
  const config = isPlan ? ApiConfig.addSavingPlan : ApiConfig.addSavingFact;
  const { isLoading, executePut } = useMutation({ config });

  const add = useCallback(
    async (body: AddSavingBody) => {
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
