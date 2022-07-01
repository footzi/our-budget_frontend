import { ApiConfig, useQuery } from '@/api';
import { setCategories, useAppContext } from '@/context';
import { Category, Maybe } from '@/interfaces';
import { useEffect } from 'react';

import { UseGetCategoriesResult } from './interfaces';

export const useGetCategories = (): UseGetCategoriesResult => {
  const { dispatch, user } = useAppContext();

  const { isLoading, data, refetch } = useQuery<{ categories: Maybe<Category[]> }>({
    config: ApiConfig.categories,
    isSkip: !user,
  });

  useEffect(() => {
    if (data?.categories) {
      dispatch(setCategories(data.categories, refetch, isLoading));
    }
  }, [data]);

  return { isLoading };
};
