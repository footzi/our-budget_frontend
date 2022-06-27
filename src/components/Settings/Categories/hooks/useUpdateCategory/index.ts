import { ApiConfig, useMutation } from '@/api';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import { CategoryUpdateBody } from '../../interfaces';
import { UseUpdateCategoryResult } from './interfaces';

export const useUpdateCategory = (): UseUpdateCategoryResult => {
  const { isLoading, executePut } = useMutation({ config: ApiConfig.updateCategory });

  const update = useCallback(async (body: CategoryUpdateBody) => {
    const startDate = body?.period ? dayjs(body.period[0]).format('YYYY-MM-DD') : null;
    const endDate = body?.period ? dayjs(body.period[1]).format('YYYY-MM-DD') : null;

    await executePut({
      data: {
        id: body.id,
        name: body.name,
        type: body.type,
        startDate,
        endDate,
      },
    });
  }, []);

  return {
    isLoading,
    update,
  };
};
