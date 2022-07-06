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

import { useAddIncome } from './hooks/useAddIncome';
import { useDeleteIncome } from './hooks/useDeleteIncome';
import { useGetIncomes } from './hooks/useGetIncomes';
import { useUpdateIncome } from './hooks/useUpdateIncome';
import './index.less';
import { IncomesProps } from './interfaces';

export const Incomes: React.FC<IncomesProps> = React.memo(({ date }) => {
  const { incomes, refetch } = useGetIncomes(date);
  const refetchBalance = useRefetchBalance();
  const { categories } = useAppSelector();

  const { add: addFact, isLoading: isLoadingSaveFact } = useAddIncome();
  const { add: addPlan, isLoading: isLoadingSavePlan } = useAddIncome(true);

  const { update: updateFact, isLoading: isLoadingUpdateFact } = useUpdateIncome();
  const { update: updatePlan, isLoading: isLoadingUpdatePlan } = useUpdateIncome(true);

  const { delete: deleteFact, isLoading: isLoadingDeleteFact } = useDeleteIncome();
  const { delete: deletePlan, isLoading: isLoadingDeletePlan } = useDeleteIncome(true);

  const handleAdd = useCallback(
    async (type: CARD_TYPES, body: CardSaveBody) => {
      const { value, categoryId, comment } = body as CardAddBalancesBody;

      if (type === CARD_TYPES.INCOME_FACT && body.date) {
        await addFact({ date: body.date.format('YYYY-MM-DD'), categoryId, comment, value });
        refetchBalance();
      } else {
        await addPlan({ date: date.format('YYYY-MM-DD'), categoryId, comment, value });
      }

      refetch();
    },
    [date, addFact, addPlan, refetch, refetchBalance]
  );

  const handleUpdate = useCallback(
    async (type: CARD_TYPES, body: UpdateSaveBody) => {
      const { id, value, categoryId, comment } = body as CardUpdateBalancesBody;

      if (type === CARD_TYPES.INCOME_FACT && body.date) {
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
      if (type === CARD_TYPES.INCOME_FACT) {
        await deleteFact(id);
        refetchBalance();
      } else {
        await deletePlan(id);
      }

      refetch();
    },
    [refetchBalance, deleteFact, deletePlan, refetch]
  );

  const plan = incomes?.plan?.list ?? [];
  const planTotal = incomes?.plan?.sum ?? 0;

  const fact = incomes?.fact?.list ?? [];
  const factTotal = incomes?.fact?.sum ?? 0;

  const isLoadingSave = isLoadingSaveFact || isLoadingSavePlan;
  const isLoadingUpdate = isLoadingUpdateFact || isLoadingUpdatePlan;
  const isLoadingDelete = isLoadingDeleteFact || isLoadingDeletePlan;

  const filteredCategories = categories.value.filter((category) => category.type === CATEGORIES_TYPES.INCOME);

  return (
    <div className="incomes">
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
        type={CARD_TYPES.INCOME_PLAN}
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
        type={CARD_TYPES.INCOME_FACT}
      />
    </div>
  );
});
