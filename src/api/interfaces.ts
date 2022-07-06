import { Maybe } from '@/interfaces';
import { AxiosError, AxiosPromise } from 'axios';
import { Options } from 'axios-hooks';

import { REFETCHES_LIST } from './constants';

export interface UseQueryProps {
  config: ApiConfigItem;
  params?: unknown;
  options?: Options;
  isSkip?: boolean;
  onSuccess?(): void;
  onError?(): void;
}

export interface UseQueryResult<T> {
  data: T;
  isLoading: boolean;
  error: Maybe<AxiosError>;
  refetch(params?: unknown): AxiosPromise<T>;
}

export interface UseMutationProps {
  config: ApiConfigItem;
  params?: unknown;
  onSuccess?(): void;
  onError?(): void;
}

export interface UseMutationResult<T> {
  data: T;
  isLoading: boolean;
  error: Maybe<AxiosError>;
  errorMessage?: string;
  executePut(params?: unknown): AxiosPromise<T>;
}

export interface ApiConfigItem {
  url: string;
  json?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  isPublic?: false;
  refetch?: REFETCHES_LIST;
  successMessage?: string;
}

export type RefetchValues = Record<REFETCHES_LIST, () => void>;
