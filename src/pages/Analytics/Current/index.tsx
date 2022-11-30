import { Section } from '@/components/Section';
import { CurrentAnalyticsProps } from '@/pages/Analytics/Current/interfaces';
import { getOptions } from '@/pages/Analytics/Current/utils/getOptions';
import { useAppSelector } from '@/store';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import { getData } from './utils/getData';

export const CurrentAnalytics: React.FC<CurrentAnalyticsProps> = ({ currency }) => {
  const { incomes, expenses } = useAppSelector();

  const incomesPlan = incomes.plan.sum;
  const incomesFact = incomes.fact.sum;

  const expensesPlan = expenses.plan.sum;
  const expensesFact = expenses.fact.sum;

  const expensesData = getData([expensesPlan, expensesFact], currency);
  const incomesData = getData([incomesPlan, incomesFact], currency);

  const options = getOptions(currency);

  return (
    <>
      <Section title="Расходы">
        <Bar data={expensesData} options={options} />
      </Section>
      <Section title="Доходы">
        <Bar data={incomesData} options={options} />
      </Section>
    </>
  );
};
