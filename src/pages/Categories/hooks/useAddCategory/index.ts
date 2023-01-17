import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { CategoryAddBody } from '../../interfaces';
import { UseAddCategoryResult } from './interfaces';

export const useAddCategory = (): UseAddCategoryResult => {
  const { isLoading, executePut } = useMutation({ config: ApiConfig.saveCategory });

  const add = useCallback(
    async (body: CategoryAddBody) => {
      await executePut({
        data: {
          name: body.name,
          type: body.type,
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
