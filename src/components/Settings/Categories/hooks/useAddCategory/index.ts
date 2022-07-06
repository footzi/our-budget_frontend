import { ApiConfig, useMutation } from '@/api';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import { CategoryAddBody } from '../../interfaces';
import { UseAddCategoryResult } from './interfaces';

export const useAddCategory = (): UseAddCategoryResult => {
  const { isLoading, executePut } = useMutation({ config: ApiConfig.saveCategory });

  const add = useCallback(
    async (body: CategoryAddBody) => {
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
    },
    [executePut]
  );

  return {
    isLoading,
    add,
  };
};
