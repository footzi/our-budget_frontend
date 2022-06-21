import { ApiConfig, useMutation } from '@/api';
import { UseLoginQueryData } from '@/components/LoginForm/hooks/useLogin/interfaces';
import { useCallback } from 'react';

export interface UseSaveExpenseBody {
  date: string;
  categoryId: string;
  value: number;
  comment?: string;
}

export interface UseSaveExpenseResult {
  isLoading: boolean;
  save: (body: UseSaveExpenseBody) => void;
}

export const useSaveExpense = (): UseSaveExpenseResult => {
  const { isLoading, executePut } = useMutation<UseLoginQueryData>({ config: ApiConfig.saveExpensePlan });

  const save = useCallback(async (body: UseSaveExpenseBody) => {
    await executePut({
      data: {
        ...body,
      },
    });
  }, []);

  return {
    isLoading,
    save,
  };
};
