import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { CategoryUpdateBody } from '../../interfaces';
import { UseUpdateCategoryResult } from './interfaces';

export const useUpdateCategory = (): UseUpdateCategoryResult => {
  const { isLoading, executePut } = useMutation({ config: ApiConfig.updateCategory });

  const update = useCallback(
    async (body: CategoryUpdateBody) => {
      await executePut({
        data: {
          id: body.id,
          name: body.name,
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
