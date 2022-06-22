import { CARD_TYPES, Card, CardSaveBody, UpdateSaveBody } from '@/components/Card';
import { useAppContext } from '@/context';
import { Spin } from 'antd';
import React, { useCallback } from 'react';

import { useDeleteIncome } from './hooks/useDeleteIncome';
import { useGetIncomes } from './hooks/useGetIncomes';
import { useSaveIncome } from './hooks/useSaveIncome';
import { useUpdateIncome } from './hooks/useUpdateIncome';
import './index.less';
import { IncomesProps } from './interfaces';

export const Incomes: React.FC<IncomesProps> = ({ date }) => {
  const { categories } = useAppContext();
  const { incomes, isLoading, refetch } = useGetIncomes(date);
  const { save: saveFact, isLoading: isLoadingSaveFact } = useSaveIncome();
  const { save: savePlan, isLoading: isLoadingSavePlan } = useSaveIncome(true);

  const { update: updateFact, isLoading: isLoadingUpdateFact } = useUpdateIncome();
  const { update: updatePlan, isLoading: isLoadingUpdatePlan } = useUpdateIncome(true);

  const { delete: deleteFact, isLoading: isLoadingDeleteFact } = useDeleteIncome();
  const { delete: deletePlan, isLoading: isLoadingDeletePlan } = useDeleteIncome(true);

  const handleSave = useCallback(
    async (type: CARD_TYPES, body: CardSaveBody) => {
      const { value, categoryId, comment } = body;

      if (type === CARD_TYPES.INCOME_FACT && body.date) {
        await saveFact({ date: body.date.format('YYYY-MM-DD'), categoryId, comment, value });
      } else {
        await savePlan({ date: date.format('YYYY-MM-DD'), categoryId, comment, value });
      }

      refetch();
    },
    [date]
  );

  const handleUpdate = useCallback(
    async (type: CARD_TYPES, body: UpdateSaveBody) => {
      const { id, value, categoryId, comment } = body;

      if (type === CARD_TYPES.INCOME_FACT && body.date) {
        await updateFact({ date: body.date.format('YYYY-MM-DD'), id, categoryId, comment, value });
      } else {
        await updatePlan({ date: date.format('YYYY-MM-DD'), id, categoryId, comment, value });
      }

      refetch();
    },
    [date]
  );

  const handleDelete = useCallback(async (type: CARD_TYPES, id: number) => {
    if (type === CARD_TYPES.INCOME_FACT) {
      await deleteFact(id);
    } else {
      await deletePlan(id);
    }

    refetch();
  }, []);

  const plan = incomes?.plan?.list ?? [];
  const planTotal = incomes?.plan?.sum ?? 0;

  const fact = incomes?.fact?.list ?? [];
  const factTotal = incomes?.fact?.sum ?? 0;

  const isLoadingSave = isLoadingSaveFact || isLoadingSavePlan;
  const isLoadingUpdate = isLoadingUpdateFact || isLoadingUpdatePlan;
  const isLoadingDelete = isLoadingDeleteFact || isLoadingDeletePlan;

  return (
    <>
      {false ? (
        <Spin />
      ) : (
        <div className="incomes">
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
            type={CARD_TYPES.INCOME_PLAN}
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
            type={CARD_TYPES.INCOME_FACT}
          />
        </div>
      )}
    </>
  );
};
