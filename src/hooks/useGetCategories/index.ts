import { ApiConfig, useQuery } from '@/api';
import { Category, Maybe } from '@/interfaces';
import { setCategories, useAppDispatch } from '@/store';
import { useEffect } from 'react';

import { UseGetCategoriesResult } from './interfaces';

export const useGetCategories = (): UseGetCategoriesResult => {
  const dispatch = useAppDispatch();

  const { isLoading, data } = useQuery<{ categories: Maybe<Category[]> }>({
    config: ApiConfig.categories,
  });

  useEffect(() => {
    if (data?.categories) {
      dispatch(setCategories({ value: data.categories, isLoading }));
    }
  }, [data, dispatch, isLoading]);

  return { isLoading };
};
