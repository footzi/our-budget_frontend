import { useRefetchExpenses, useRefetchIncomes } from '@/api';
import {
  CARD_TYPES,
  Card,
  CardAddBalancesBody,
  CardSaveBody,
  CardUpdateBalancesBody,
  CardUpdateSaveBody,
} from '@/components/Card';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { CATEGORIES_TYPES } from '@/constants';
import { useAppSelector } from '@/store';
import { formatToBackendDate } from '@/utils/formatToBackendDate';
import React, { useCallback, useMemo } from 'react';

import { useAddPlan } from './hooks/useAddPlan';
import { useDeletePlan } from './hooks/useDeletePlan';
import { useUpdatePlan } from './hooks/useUpdatePlan';
import './index.less';
import { PlansProps } from './interfaces';

const Plans: React.FC<PlansProps> = ({ selectedDate }) => {
  const { categories, incomes, expenses } = useAppSelector();

  const refetchIncomes = useRefetchIncomes();
  const refetchExpenses = useRefetchExpenses();

  const { add: addExpense, isLoading: isLoadingAddExpense } = useAddPlan();
  const { add: addIncome, isLoading: isLoadingAddIncome } = useAddPlan(true);

  const { update: updateExpense, isLoading: isLoadingUpdateExpense } = useUpdatePlan();
  const { update: updateIncome, isLoading: isLoadingUpdateIncome } = useUpdatePlan(true);

  const { delete: deleteExpense, isLoading: isLoadingDeleteExpense } = useDeletePlan();
  const { delete: deleteIncome, isLoading: isLoadingDeleteIncome } = useDeletePlan(true);

  const expensesList = expenses.plan.list;
  const incomesList = incomes.plan.list;

  const expensesSum = expenses.plan.sum;
  const incomesSum = incomes.plan.sum;

  const handleAdd = useCallback(
    async (type: CARD_TYPES, formBody: CardSaveBody) => {
      const date = formatToBackendDate(selectedDate);
      const { value, categoryId, comment } = formBody as CardAddBalancesBody;
      const body = { date, value, categoryId, comment };

      if (type === CARD_TYPES.INCOME_PLAN) {
        await addIncome(body);
        refetchIncomes();
      } else {
        await addExpense(body);
        refetchExpenses();
      }
    },
    [addExpense, addIncome, selectedDate, refetchIncomes, refetchExpenses]
  );

  const handleUpdate = useCallback(
    async (type: CARD_TYPES, formBody: CardUpdateSaveBody) => {
      const date = formatToBackendDate(selectedDate);
      const { id, value, categoryId, comment } = formBody as CardUpdateBalancesBody;
      const body = { id, date, value, categoryId, comment };

      if (type === CARD_TYPES.INCOME_PLAN) {
        await updateIncome(body);
        refetchIncomes();
      } else {
        await updateExpense(body);
        refetchExpenses();
      }
    },
    [updateIncome, updateExpense, selectedDate, refetchIncomes, refetchExpenses]
  );

  const handleDelete = useCallback(
    async (type: CARD_TYPES, id: number) => {
      if (type === CARD_TYPES.INCOME_PLAN) {
        await deleteIncome(id);
        refetchIncomes();
      } else {
        await deleteExpense(id);
        refetchExpenses();
      }
    },
    [deleteIncome, deleteExpense, refetchIncomes, refetchExpenses]
  );

  const categoriesExpenses = useMemo(
    () => categories.value.filter((category) => category.type === CATEGORIES_TYPES.EXPENSE),
    [categories]
  );
  const categoriesIncomes = useMemo(
    () => categories.value.filter((category) => category.type === CATEGORIES_TYPES.INCOME),
    [categories]
  );

  return (
    <div className="plans">
      <ErrorBoundary>
        <Card
          title="Планируемые расходы"
          categories={categoriesExpenses}
          list={expensesList}
          total={expensesSum}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          isLoadingSave={isLoadingAddIncome}
          isLoadingUpdate={isLoadingUpdateExpense}
          isLoadingDelete={isLoadingDeleteExpense}
          type={CARD_TYPES.EXPENSE_PLAN}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <Card
          title="Планируемые доходы"
          categories={categoriesIncomes}
          list={incomesList}
          total={incomesSum}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          isLoadingSave={isLoadingAddExpense}
          isLoadingUpdate={isLoadingUpdateIncome}
          isLoadingDelete={isLoadingDeleteIncome}
          type={CARD_TYPES.INCOME_PLAN}
        />
      </ErrorBoundary>
    </div>
  );
};

export default Plans;
