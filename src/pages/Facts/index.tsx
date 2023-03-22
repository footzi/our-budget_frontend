import { useRefetchBalance, useRefetchExpenses, useRefetchIncomes } from '@/api';
import {
  CARD_TYPES,
  Card,
  CardAddBalancesBody,
  CardSaveBody,
  CardUpdateBalancesBody,
  CardUpdateSaveBody,
} from '@/components/Card';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ExpenseFactHelpContent } from '@/components/HelpContents/ExpenseFactHelpContent';
import { IncomeFactHelpContent } from '@/components/HelpContents/IncomeFactHelpContent';
import { HelpHint } from '@/components/HelpHint';
import { CATEGORIES_TYPES, LOCAL_STORAGE_ITEMS } from '@/constants';
import { useAppSelector } from '@/store';
import { formatToBackendDate } from '@/utils/formatToBackendDate';
import React, { useCallback, useMemo } from 'react';

import { useAddFact } from './hooks/useAddFact';
import { useDeleteFact } from './hooks/useDeleteFact';
import { useUpdateFact } from './hooks/useUpdateFact';
import './index.less';
import { FactsProps } from './interfaces';

const Facts: React.FC<FactsProps> = ({ selectedDate }) => {
  const { categories, incomes, expenses, user } = useAppSelector();

  const refetchIncomes = useRefetchIncomes();
  const refetchExpenses = useRefetchExpenses();
  const refetchBalance = useRefetchBalance();

  const { add: addExpense, isLoading: isLoadingAddExpense } = useAddFact();
  const { add: addIncome, isLoading: isLoadingAddIncome } = useAddFact(true);

  const { update: updateExpense, isLoading: isLoadingUpdateExpense } = useUpdateFact();
  const { update: updateIncome, isLoading: isLoadingUpdateIncome } = useUpdateFact(true);

  const { delete: deleteExpense, isLoading: isLoadingDeleteExpense } = useDeleteFact();
  const { delete: deleteIncome, isLoading: isLoadingDeleteIncome } = useDeleteFact(true);

  const expensesList = expenses.fact.list;
  const incomesList = incomes.fact.list;
  const expensesSum = expenses.fact.sum;
  const incomesSum = incomes.fact.sum;
  const currencies = user?.currencies ?? [];

  const handleAdd = useCallback(
    async (type: CARD_TYPES, formBody: CardSaveBody) => {
      const date = formBody.date ? formatToBackendDate(formBody.date) : formatToBackendDate(selectedDate);
      const { value, categoryId, comment, currency } = formBody as CardAddBalancesBody;
      const body = { date, value, categoryId, comment, currency };

      if (type === CARD_TYPES.INCOME_FACT) {
        await addIncome(body);
        refetchIncomes();
      } else {
        await addExpense(body);
        refetchExpenses();
      }

      refetchBalance();
    },
    [addExpense, addIncome, selectedDate, refetchIncomes, refetchExpenses, refetchBalance]
  );

  const handleUpdate = useCallback(
    async (type: CARD_TYPES, formBody: CardUpdateSaveBody) => {
      const date = formBody.date ? formatToBackendDate(formBody.date) : formatToBackendDate(selectedDate);
      const { id, value, categoryId, comment, currency } = formBody as CardUpdateBalancesBody;
      const body = { id, date, value, categoryId, comment, currency };

      if (type === CARD_TYPES.INCOME_FACT) {
        await updateIncome(body);
        refetchIncomes();
      } else {
        await updateExpense(body);
        refetchExpenses();
      }

      refetchBalance();
    },
    [updateIncome, updateExpense, selectedDate, refetchIncomes, refetchExpenses, refetchBalance]
  );

  const handleDelete = useCallback(
    async (type: CARD_TYPES, id: number) => {
      if (type === CARD_TYPES.INCOME_FACT) {
        await deleteIncome(id);
        refetchIncomes();
      } else {
        await deleteExpense(id);
        refetchExpenses();
      }

      refetchBalance();
    },
    [deleteIncome, deleteExpense, refetchIncomes, refetchExpenses, refetchBalance]
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
    <div className="facts">
      <ErrorBoundary>
        <Card
          title="Фактические расходы"
          hint={
            <HelpHint
              localStorageKey={LOCAL_STORAGE_ITEMS.SHOW_EXPENSE_FACT_HELP_HINT}
              content={<ExpenseFactHelpContent />}
            />
          }
          categories={categoriesExpenses}
          currencies={currencies}
          list={expensesList}
          total={expensesSum}
          selectedDate={selectedDate}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          isLoadingSave={isLoadingAddExpense}
          isLoadingUpdate={isLoadingUpdateExpense}
          isLoadingDelete={isLoadingDeleteExpense}
          type={CARD_TYPES.EXPENSE_FACT}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <Card
          title="Фактические доходы"
          hint={
            <HelpHint
              localStorageKey={LOCAL_STORAGE_ITEMS.SHOW_INCOME_FACT_HELP_HINT}
              content={<IncomeFactHelpContent />}
            />
          }
          currencies={currencies}
          categories={categoriesIncomes}
          list={incomesList}
          total={incomesSum}
          selectedDate={selectedDate}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          isLoadingSave={isLoadingAddIncome}
          isLoadingUpdate={isLoadingUpdateIncome}
          isLoadingDelete={isLoadingDeleteIncome}
          type={CARD_TYPES.INCOME_FACT}
        />
      </ErrorBoundary>
    </div>
  );
};

export default Facts;
