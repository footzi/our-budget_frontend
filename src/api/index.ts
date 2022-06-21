import { LocalStorageItems } from '@/constants';
import { UserLocalStorage } from '@/interfaces';
import { LocalStorage } from '@/utils/localStorage';
import { notification } from 'antd';
import Axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import useAxios, { configure } from 'axios-hooks';
import { useEffect } from 'react';

import { UseMutationProps, UseMutationResult, UseQueryProps, UseQueryResult } from './interfaces';
import { refreshAuthLogic } from './refresh';

const USE_LOCAL_JSON = false;
const USE_LOCAL_BACKEND = true;

const axios = Axios.create();

configure({ axios });

createAuthRefreshInterceptor(axios, refreshAuthLogic);

export const useQuery = <T>({ config, params, onSuccess, onError, options }: UseQueryProps): UseQueryResult<T> => {
  const savedUser = !config.isPublic ? LocalStorage.get<UserLocalStorage>(LocalStorageItems.USER) : null;
  const accessToken = savedUser ? savedUser.tokens.accessToken : null;

  const url = USE_LOCAL_JSON ? config.json : config.url;
  // const method = USE_LOCAL_JSON ? 'GET' : config.method ? config.method : 'GET';
  const host = USE_LOCAL_BACKEND ? 'http://localhost:8888' : '';

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: host + url,
      params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `${!config.isPublic ? 'Bearer ' + accessToken : null}`,
      },
    },
    options
  );

  useEffect(() => {
    if (error) {
      onError && onError();
      notification.error({
        message: 'При получении данных произошла ошибка',
        description: error.message,
      });
    }

    if (data && !error) {
      onSuccess && onSuccess();
    }
  }, [data, error, onSuccess, onError]);

  return {
    data,
    isLoading: loading,
    error,
    refetch,
  };
};

export const useMutation = <T>({ config, onSuccess, onError }: UseMutationProps): UseMutationResult<T> => {
  const savedUser = !config.isPublic ? LocalStorage.get<UserLocalStorage>(LocalStorageItems.USER) : null;
  const accessToken = savedUser ? savedUser.tokens.accessToken : null;

  const url = USE_LOCAL_JSON ? config.json : config.url;
  const method = USE_LOCAL_JSON ? 'GET' : config.method ? config.method : 'POST';
  const host = USE_LOCAL_BACKEND ? 'http://localhost:8888' : '';

  const [{ data, loading, error }, executePut] = useAxios(
    {
      url: host + url,
      method,
      headers: {
        Authorization: `${!config.isPublic ? 'Bearer ' + accessToken : null}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    if (error) {
      onError && onError();
      notification.error({
        message: 'При получении данных произошла ошибка',
        description: error.message,
      });
    }

    if (data && !error) {
      onSuccess && onSuccess();
    }
  }, [data, error, onSuccess, onError]);

  return {
    data,
    isLoading: loading,
    error,
    errorMessage: error?.response?.data.message,
    executePut,
  };
};

export { ApiConfig } from './paths';
// export * from './types';
