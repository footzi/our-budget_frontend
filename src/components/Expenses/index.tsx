import { CARD_TYPES, Card, CardSaveBody, UpdateSaveBody } from '@/components/Card';
import { useAppContext } from '@/context';
import { Spin } from 'antd';
import React, { useCallback } from 'react';

import { useDeleteExpense } from './hooks/useDeleteExpense';
import { useGetExpenses } from './hooks/useGetExpenses';
import { useSaveExpense } from './hooks/useSaveExpense';
import { useUpdateExpense } from './hooks/useUpdateExpense';
import './index.less';
import { ExpensesProps } from './interfaces';

export const Expenses: React.FC<ExpensesProps> = ({ date }) => {
  const { categories, balance } = useAppContext();
  const { expenses, isLoading, refetch } = useGetExpenses(date);
  const { save: saveFact, isLoading: isLoadingSaveFact } = useSaveExpense();
  const { save: savePlan, isLoading: isLoadingSavePlan } = useSaveExpense(true);

  const { update: updateFact, isLoading: isLoadingUpdateFact } = useUpdateExpense();
  const { update: updatePlan, isLoading: isLoadingUpdatePlan } = useUpdateExpense(true);

  const { delete: deleteFact, isLoading: isLoadingDeleteFact } = useDeleteExpense();
  const { delete: deletePlan, isLoading: isLoadingDeletePlan } = useDeleteExpense(true);

  const handleSave = useCallback(
    async (type: CARD_TYPES, body: CardSaveBody) => {
      const { value, categoryId, comment } = body;

      if (type === CARD_TYPES.EXPENSE_FACT && body.date) {
        await saveFact({ date: body.date.format('YYYY-MM-DD'), categoryId, comment, value });
        balance.refetch();
      } else {
        await savePlan({ date: date.format('YYYY-MM-DD'), categoryId, comment, value });
      }

      refetch();
    },
    [date, balance]
  );

  const handleUpdate = useCallback(
    async (type: CARD_TYPES, body: UpdateSaveBody) => {
      const { id, value, categoryId, comment } = body;

      if (type === CARD_TYPES.EXPENSE_FACT && body.date) {
        await updateFact({ date: body.date.format('YYYY-MM-DD'), id, categoryId, comment, value });
        balance.refetch();
      } else {
        await updatePlan({ date: date.format('YYYY-MM-DD'), id, categoryId, comment, value });
      }

      refetch();
    },
    [date, balance]
  );

  const handleDelete = useCallback(
    async (type: CARD_TYPES, id: number) => {
      if (type === CARD_TYPES.EXPENSE_FACT) {
        await deleteFact(id);
        balance.refetch();
      } else {
        await deletePlan(id);
      }

      refetch();
    },
    [balance]
  );

  const plan = expenses?.plan?.list ?? [];
  const planTotal = expenses?.plan?.sum ?? 0;

  const fact = expenses?.fact?.list ?? [];
  const factTotal = expenses?.fact?.sum ?? 0;

  const isLoadingSave = isLoadingSaveFact || isLoadingSavePlan;
  const isLoadingUpdate = isLoadingUpdateFact || isLoadingUpdatePlan;
  const isLoadingDelete = isLoadingDeleteFact || isLoadingDeletePlan;

  return (
    <>
      {false ? (
        <Spin />
      ) : (
        <div className="expenses">
          <Card
            title="План"
            categories={categories}
            list={plan}
            total={planTotal}
            onSave={handleSave}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            isLoadingSave={isLoadingSave}
            isLoadingUpdate={isLoadingUpdate}
            isLoadingDelete={isLoadingDelete}
            type={CARD_TYPES.EXPENSE_PLAN}
          />

          <Card
            title="Факт"
            categories={categories}
            list={fact}
            total={factTotal}
            onSave={handleSave}
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
      )}
    </>
  );
};
