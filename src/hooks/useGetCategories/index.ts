import { setCategories, useAppContext } from '@/context';
import { ApiConfig, useQuery } from '@/api';
import { UseGetCategoriesResult } from '@/hooks/useGetCategories/interfaces';
import { Category, Maybe } from '@/interfaces';
import { useEffect } from 'react';

export const useGetCategories = (): UseGetCategoriesResult => {
  const { dispatch, user } = useAppContext();

  const { isLoading, data } = useQuery<{ categories: Maybe<Category[]> }>({
    config: ApiConfig.categories,
    isSkip: !user,
  });

  useEffect(() => {
    if (data?.categories) {
      dispatch(setCategories(data.categories));
    }
  }, [data]);

  return { isLoading };
};
