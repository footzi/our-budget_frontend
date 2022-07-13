import { useRefetchBalance, useRefetchSavingGoals } from '@/api';
import {
  CARD_TYPES,
  Card,
  CardAddSavingBody,
  CardSaveBody,
  CardUpdateSavingBody,
  UpdateSaveBody,
} from '@/components/Card';
import { useAppSelector } from '@/store';
import React, { useCallback } from 'react';

import { Goals } from './Goals';
import { useAddSaving } from './hooks/useAddSaving';
import { useDeleteSaving } from './hooks/useDeleteSaving';
import { useGetSavings } from './hooks/useGetSavings';
import { useUpdateSaving } from './hooks/useUpdateSaving';
import './index.less';
import { SavingsProps } from './interfaces';

export const Savings: React.FC<SavingsProps> = ({ date }) => {
  const { savingGoals } = useAppSelector();
  const { savings, refetch } = useGetSavings(date);
  const refetchSavingGoals = useRefetchSavingGoals();
  const refetchBalance = useRefetchBalance();

  const { add: addFact, isLoading: isLoadingAddFact } = useAddSaving();
  const { add: addPlan, isLoading: isLoadingAddPlan } = useAddSaving(true);

  const { update: updateFact, isLoading: isLoadingUpdateFact } = useUpdateSaving();
  const { update: updatePlan, isLoading: isLoadingUpdatePlan } = useUpdateSaving(true);

  const { delete: deleteFact, isLoading: isLoadingDeleteFact } = useDeleteSaving();
  const { delete: deletePlan, isLoading: isLoadingDeletePlan } = useDeleteSaving(true);

  const handleAdd = useCallback(
    async (type: CARD_TYPES, body: CardSaveBody) => {
      const { value, goalId, comment, actionType } = body as CardAddSavingBody;

      if (type === CARD_TYPES.SAVINGS_FACT && body.date) {
        await addFact({ date: body.date.format('YYYY-MM-DD'), goalId, comment, value, actionType });
        refetchSavingGoals();
        refetchBalance();
      } else {
        await addPlan({ date: date.format('YYYY-MM-DD'), goalId, comment, value, actionType });
      }

      refetch();
    },
    [date, refetchSavingGoals, addFact, addPlan, refetch, refetchBalance]
  );

  const handleUpdate = useCallback(
    async (type: CARD_TYPES, body: UpdateSaveBody) => {
      const { id, value, goalId, comment, actionType } = body as CardUpdateSavingBody;

      if (type === CARD_TYPES.SAVINGS_FACT && body.date) {
        await updateFact({ date: body.date.format('YYYY-MM-DD'), id, value, goalId, comment, actionType });
        refetchSavingGoals();
        refetchBalance();
      } else {
        await updatePlan({ date: date.format('YYYY-MM-DD'), id, value, goalId, comment, actionType });
      }

      refetch();
    },
    [date, refetchSavingGoals, refetch, updateFact, updatePlan, refetchBalance]
  );

  const handleDelete = useCallback(
    async (type: CARD_TYPES, id: number) => {
      if (type === CARD_TYPES.SAVINGS_FACT) {
        await deleteFact(id);
        refetchSavingGoals();
        refetchBalance();
      } else {
        await deletePlan(id);
      }

      refetch();
    },
    [refetchSavingGoals, refetch, deleteFact, deletePlan, refetchBalance]
  );

  const plan = savings?.plan?.list ?? [];
  const planTotal = savings?.plan?.sum ?? 0;

  const fact = savings?.fact?.list ?? [];
  const factTotal = savings?.fact?.sum ?? 0;

  const isLoadingAdd = isLoadingAddFact || isLoadingAddPlan;
  const isLoadingUpdate = isLoadingUpdateFact || isLoadingUpdatePlan;
  const isLoadingDelete = isLoadingDeleteFact || isLoadingDeletePlan;

  return (
    <>
      <Goals />

      <div className="savings">
        <Card
          title="План"
          savingGoals={savingGoals.value ?? []}
          list={plan}
          total={planTotal}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          isLoadingSave={isLoadingAdd}
          isLoadingUpdate={isLoadingUpdate}
          isLoadingDelete={isLoadingDelete}
          type={CARD_TYPES.SAVINGS_PLAN}
        />

        <Card
          title="Факт"
          savingGoals={savingGoals.value ?? []}
          list={fact}
          total={factTotal}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          isLoadingSave={isLoadingAdd}
          isLoadingUpdate={isLoadingUpdate}
          isLoadingDelete={isLoadingDelete}
          type={CARD_TYPES.SAVINGS_FACT}
        />
      </div>
    </>
  );
};