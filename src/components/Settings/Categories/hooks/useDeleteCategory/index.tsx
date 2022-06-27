import { ApiConfig, useMutation } from '@/api';
import { useCallback } from 'react';

import { UseDeleteCategoryResult } from './interfaces';

export const useDeleteCategory = (): UseDeleteCategoryResult => {
  const { isLoading, executePut } = useMutation({ config: ApiConfig.deleteCategory });

  const remove = useCallback(async (id: number) => {
    await executePut({
      data: {
        id,
      },
    });
  }, []);

  return {
    isLoading,
    remove,
  };
};
