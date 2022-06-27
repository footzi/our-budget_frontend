import { ApiConfig, useMutation } from '@/api';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import { CategorySaveBody } from '../../interfaces';
import { UseSaveCategoryResult } from './interfaces';

export const useSaveCategory = (): UseSaveCategoryResult => {
  const { isLoading, executePut } = useMutation({ config: ApiConfig.saveCategory });

  const save = useCallback(async (body: CategorySaveBody) => {
    const startDate = body?.period ? dayjs(body.period[0]).format('YYYY-MM-DD') : null;
    const endDate = body?.period ? dayjs(body.period[1]).format('YYYY-MM-DD') : null;

    await executePut({
      data: {
        name: body.name,
        type: body.type,
        startDate,
        endDate,
      },
    });
  }, []);

  return {
    isLoading,
    save,
  };
};
