import { NotContent } from '@/components/NotContent';
import { Section } from '@/components/Section';
import { CATEGORIES_TYPES } from '@/constants';
import { ROUTES } from '@/constants/routes';
import React from 'react';
import { Pie } from 'react-chartjs-2';

import { FACTS_ANALYTICS_OPTIONS } from './constants';
import { useGetSumByCategories } from './hooks/useGetSumByCategories';
import { getData } from './utils/getData';

export const FactsAnalytics = () => {
  const expensesPolar = useGetSumByCategories(CATEGORIES_TYPES.EXPENSE);
  const expensesPolarData = getData(expensesPolar);

  const incomesPolar = useGetSumByCategories(CATEGORIES_TYPES.INCOME);
  const incomesPolarData = getData(incomesPolar);

  const showIncomesPolar = incomesPolar.some((item) => item.sum);
  const showExpensesPolar = expensesPolar.some((item) => item.sum);

  return (
    <>
      <Section title="Фактические расходы">
        {showExpensesPolar ? (
          <Pie data={expensesPolarData} options={FACTS_ANALYTICS_OPTIONS} />
        ) : (
          <NotContent text="Нет данных для отображения" to={ROUTES.FACTS} />
        )}
      </Section>

      <Section title="Фактические доходы">
        {showIncomesPolar ? (
          <Pie data={incomesPolarData} options={FACTS_ANALYTICS_OPTIONS} />
        ) : (
          <NotContent text="Нет данных для отображения" to={ROUTES.FACTS} />
        )}
      </Section>
    </>
  );
};
