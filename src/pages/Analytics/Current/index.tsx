import { NotContent } from '@/components/NotContent';
import { Section } from '@/components/Section';
import { ROUTES } from '@/constants/routes';
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

  const isShowIncomes = Boolean(incomesPlan[currency] || incomesFact[currency]);
  const isShowExpenses = Boolean(expensesPlan[currency] || expensesFact[currency]);

  const options = getOptions(currency);

  return (
    <>
      <Section title="Расходы">
        {isShowExpenses ? (
          <Bar data={expensesData} options={options} />
        ) : (
          <NotContent text="Нет данных для отображения" to={ROUTES.FACTS} />
        )}
      </Section>
      <Section title="Доходы">
        {isShowIncomes ? (
          <Bar data={incomesData} options={options} />
        ) : (
          <NotContent text="Нет данных для отображения" to={ROUTES.FACTS} />
        )}
      </Section>
    </>
  );
};
