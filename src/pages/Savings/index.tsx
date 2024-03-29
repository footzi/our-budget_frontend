import { useRefetchBalance, useRefetchSavingGoals, useRefetchSavings } from '@/api';
import {
  CARD_TYPES,
  Card,
  CardAddSavingBody,
  CardSaveBody,
  CardUpdateSavingBody,
  UpdateSaveBody,
} from '@/components/Card';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SavingFactHelpContent } from '@/components/HelpContents/SavingFactHelpContent';
import { HelpHint } from '@/components/HelpHint';
import { LOCAL_STORAGE_ITEMS } from '@/constants';
import { useAppSelector } from '@/store';
import { formatToBackendDate } from '@/utils/formatToBackendDate';
import React, { useCallback, useMemo } from 'react';

import { Goals } from './Goals';
import { useAddSaving } from './hooks/useAddSaving';
import { useDeleteSaving } from './hooks/useDeleteSaving';
import { useUpdateSaving } from './hooks/useUpdateSaving';
import './index.less';
import { SavingsProps } from './interfaces';

const Savings: React.FC<SavingsProps> = ({ selectedDate }) => {
  const { savingGoals, savings } = useAppSelector();

  const refetchSavings = useRefetchSavings();
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
      const { value, goalId, comment, actionType, currency } = body as CardAddSavingBody;

      if (type === CARD_TYPES.SAVINGS_FACT && body.date) {
        await addFact({ date: formatToBackendDate(body.date), goalId, comment, value, actionType, currency });
        refetchSavingGoals();
        refetchBalance();
      } else {
        await addPlan({ date: formatToBackendDate(selectedDate), goalId, comment, value, actionType, currency });
      }

      refetchSavings();
    },
    [selectedDate, refetchSavingGoals, addFact, addPlan, refetchSavings, refetchBalance]
  );

  const handleUpdate = useCallback(
    async (type: CARD_TYPES, body: UpdateSaveBody) => {
      const { id, value, goalId, comment, actionType, currency } = body as CardUpdateSavingBody;

      if (type === CARD_TYPES.SAVINGS_FACT && body.date) {
        await updateFact({ date: formatToBackendDate(body.date), id, value, goalId, comment, actionType, currency });
        refetchSavingGoals();
        refetchBalance();
      } else {
        await updatePlan({ date: formatToBackendDate(selectedDate), id, value, goalId, comment, actionType, currency });
      }

      refetchSavings();
    },
    [selectedDate, refetchSavingGoals, refetchSavings, updateFact, updatePlan, refetchBalance]
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

      refetchSavings();
    },
    [refetchSavingGoals, refetchSavings, deleteFact, deletePlan, refetchBalance]
  );

  const plan = savings?.plan?.list ?? [];
  const planTotal = savings?.plan?.sum ?? 0;

  const fact = savings?.fact?.list ?? [];
  const factTotal = savings?.fact?.sum ?? 0;

  // избавляемся от обновления формы при обновлении значений копилок
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const goals = useMemo(() => savingGoals?.value ?? [], []);

  const isLoadingAdd = isLoadingAddFact || isLoadingAddPlan;
  const isLoadingUpdate = isLoadingUpdateFact || isLoadingUpdatePlan;
  const isLoadingDelete = isLoadingDeleteFact || isLoadingDeletePlan;

  return (
    <div className="savings">
      <ErrorBoundary>
        <Goals />
      </ErrorBoundary>

      <div className="savings__cards">
        <ErrorBoundary>
          <Card
            title="План"
            savingGoals={goals}
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
        </ErrorBoundary>

        <ErrorBoundary>
          <Card
            title="Факт"
            hint={
              <HelpHint
                localStorageKey={LOCAL_STORAGE_ITEMS.SHOW_SAVING_FACT_HELP_HINT}
                content={<SavingFactHelpContent />}
              />
            }
            savingGoals={goals}
            list={fact}
            total={factTotal}
            selectedDate={selectedDate}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            isLoadingSave={isLoadingAdd}
            isLoadingUpdate={isLoadingUpdate}
            isLoadingDelete={isLoadingDelete}
            type={CARD_TYPES.SAVINGS_FACT}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Savings;
