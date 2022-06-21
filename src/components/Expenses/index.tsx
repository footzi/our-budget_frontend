import { Card } from '@/components/Card';
import { useAppContext } from '@/context';
import { Row, Spin } from 'antd';
import React, { useCallback } from 'react';

import { useGetExpenses } from './hooks/useGetExpenses';
import { useSaveExpense } from './hooks/useSaveExpense';
import { ExpensesProps } from './interfaces';

export const Expenses: React.FC<ExpensesProps> = ({ date }) => {
  const { categories } = useAppContext();
  const { expenses, isLoading, refetch } = useGetExpenses(date);
  const { save, isLoading: isLoadingSave } = useSaveExpense();

  const handleSave = useCallback(
    async (categoryId: string, value: number) => {
      await save({ date: date.format('YYYY-MM-DD'), categoryId, value });
      refetch();
    },
    [date]
  );

  const plan = expenses?.plan ?? [];
  const planTotal = plan.reduce((acc, item) => acc + item.value, 0);

  return (
    <Row>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <Card
            title="План"
            categories={categories}
            list={expenses?.plan ?? []}
            total={planTotal}
            onSave={handleSave}
            isLoadingSave={isLoadingSave}></Card>

          {/*<Card title="Факт"></Card>*/}
        </>
      )}
    </Row>
  );
};
