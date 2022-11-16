import { Section } from '@/components/Section';
import { useAppSelector } from '@/store';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import { CURRENT_ANALYTICS_OPTIONS } from './constants';
import { getData } from './utils/getData';

export const CurrentAnalytics = () => {
  const { incomes, expenses } = useAppSelector();

  const incomesPlan = incomes.plan.sum;
  const incomesFact = incomes.fact.sum;

  const expensesPlan = expenses.plan.sum;
  const expensesFact = expenses.fact.sum;

  // @todo сделать позже
  // @ts-ignore
  const expensesData = getData([expensesPlan, expensesFact]);
  // @ts-ignore
  const incomesData = getData([incomesPlan, incomesFact]);

  return (
    <>
      <Section title="Расходы">
        <Bar data={expensesData} options={CURRENT_ANALYTICS_OPTIONS} />
      </Section>
      <Section title="Доходы">
        <Bar data={incomesData} options={CURRENT_ANALYTICS_OPTIONS} />
      </Section>
    </>
  );
};
