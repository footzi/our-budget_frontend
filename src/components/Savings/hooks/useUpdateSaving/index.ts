import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UpdateSavingBody } from '../../interfaces';
import { UseUpdateSavingResult } from './interfaces';

export const useUpdateSaving = (isPlan: boolean = false): UseUpdateSavingResult => {
  const config = isPlan ? ApiConfig.updateSavingPlan : ApiConfig.updateSavingFact;
  const { isLoading, executePut } = useMutation({ config });

  const update = useCallback(async (body: UpdateSavingBody) => {
    await executePut({
      data: {
        ...body,
      },
    });
  }, []);

  return {
    isLoading,
    update,
  };
};
