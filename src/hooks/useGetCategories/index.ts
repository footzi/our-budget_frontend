import { ApiConfig, useQuery } from '@/api';
import { Category, Maybe } from '@/interfaces';
import { setCategories, useAppDispatch, useAppSelector } from '@/store';
import { useEffect } from 'react';

import { UseGetCategoriesResult } from './interfaces';

export const useGetCategories = (): UseGetCategoriesResult => {
  const { user } = useAppSelector();
  const dispatch = useAppDispatch();

  const { isLoading, data } = useQuery<{ categories: Maybe<Category[]> }>({
    config: ApiConfig.categories,
    isSkip: !user,
  });

  useEffect(() => {
    if (data?.categories) {
      dispatch(setCategories({ value: data.categories, isLoading }));
    }
  }, [data, dispatch, isLoading]);

  return { isLoading };
};
