import { useRefetchBalance } from '@/api';
import {
  CARD_TYPES,
  Card,
  CardAddBalancesBody,
  CardSaveBody,
  CardUpdateBalancesBody,
  UpdateSaveBody,
} from '@/components/Card';
import { CATEGORIES_TYPES } from '@/constants';
import { useAppSelector } from '@/store';
import React, { useCallback } from 'react';

import { useAddExpense } from './hooks/useAddExpense';
import { useDeleteExpense } from './hooks/useDeleteExpense';
import { useGetExpenses } from './hooks/useGetExpenses';
import { useUpdateExpense } from './hooks/useUpdateExpense';
import './index.less';
import { ExpensesProps } from './interfaces';

export const Expenses: React.FC<ExpensesProps> = ({ date }) => {
  const { expenses, refetch } = useGetExpenses(date);
  const { categories } = useAppSelector();
  const refetchBalance = useRefetchBalance();

  const { add: addFact, isLoading: isLoadingSaveFact } = useAddExpense();
  const { add: addPlan, isLoading: isLoadingSavePlan } = useAddExpense(true);

  const { update: updateFact, isLoading: isLoadingUpdateFact } = useUpdateExpense();
  const { update: updatePlan, isLoading: isLoadingUpdatePlan } = useUpdateExpense(true);

  const { delete: deleteFact, isLoading: isLoadingDeleteFact } = useDeleteExpense();
  const { delete: deletePlan, isLoading: isLoadingDeletePlan } = useDeleteExpense(true);

  const handleAdd = useCallback(
    async (type: CARD_TYPES, body: CardSaveBody) => {
      const { value, categoryId, comment } = body as CardAddBalancesBody;

      if (type === CARD_TYPES.EXPENSE_FACT && body.date) {
        await addFact({ date: body.date.format('YYYY-MM-DD'), categoryId, comment, value });
        refetchBalance();
      } else {
        await addPlan({ date: date.format('YYYY-MM-DD'), categoryId, comment, value });
      }

      refetch();
    },
    [date, refetchBalance, addFact, addPlan, refetch]
  );

  const handleUpdate = useCallback(
    async (type: CARD_TYPES, body: UpdateSaveBody) => {
      const { id, value, categoryId, comment } = body as CardUpdateBalancesBody;

      if (type === CARD_TYPES.EXPENSE_FACT && body.date) {
        await updateFact({ date: body.date.format('YYYY-MM-DD'), id, categoryId, comment, value });
        refetchBalance();
      } else {
        await updatePlan({ date: date.format('YYYY-MM-DD'), id, categoryId, comment, value });
      }

      refetch();
    },
    [date, refetchBalance, updateFact, updatePlan, refetch]
  );

  const handleDelete = useCallback(
    async (type: CARD_TYPES, id: number) => {
      if (type === CARD_TYPES.EXPENSE_FACT) {
        await deleteFact(id);
        refetchBalance();
      } else {
        await deletePlan(id);
      }

      refetch();
    },
    [refetchBalance, deleteFact, deletePlan, refetch]
  );

  const plan = expenses?.plan?.list ?? [];
  const planTotal = expenses?.plan?.sum ?? 0;

  const fact = expenses?.fact?.list ?? [];
  const factTotal = expenses?.fact?.sum ?? 0;

  const isLoadingSave = isLoadingSaveFact || isLoadingSavePlan;
  const isLoadingUpdate = isLoadingUpdateFact || isLoadingUpdatePlan;
  const isLoadingDelete = isLoadingDeleteFact || isLoadingDeletePlan;

  const filteredCategories = categories.value.filter((category) => category.type === CATEGORIES_TYPES.EXPENSE);

  return (
    <div className="expenses">
      <Card
        title="План"
        categories={filteredCategories}
        list={plan}
        total={planTotal}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        isLoadingSave={isLoadingSave}
        isLoadingUpdate={isLoadingUpdate}
        isLoadingDelete={isLoadingDelete}
        type={CARD_TYPES.EXPENSE_PLAN}
      />

      <Card
        title="Факт"
        categories={filteredCategories}
        list={fact}
        total={factTotal}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        isLoadingSave={isLoadingSave}
        isLoadingUpdate={isLoadingUpdate}
        isLoadingDelete={isLoadingDelete}
        isShowDate
        isShowComment
        type={CARD_TYPES.EXPENSE_FACT}
      />
    </div>
  );
};
