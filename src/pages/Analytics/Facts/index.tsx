import { NotContent } from '@/components/NotContent';
import { Section } from '@/components/Section';
import { CATEGORIES_TYPES } from '@/constants';
import { ROUTES } from '@/constants/routes';
import { getOptions } from '@/pages/Analytics/Facts/utils/getOptions';
import React from 'react';
import { Pie } from 'react-chartjs-2';

import { useGetSumByCategories } from './hooks/useGetSumByCategories';
import { FactAnalyticsProps } from './interfaces';
import { getData } from './utils/getData';

export const FactsAnalytics: React.FC<FactAnalyticsProps> = ({ currency }) => {
  const expensesPolar = useGetSumByCategories(CATEGORIES_TYPES.EXPENSE, currency);
  const expensesPolarData = getData(expensesPolar);

  const incomesPolar = useGetSumByCategories(CATEGORIES_TYPES.INCOME, currency);
  const incomesPolarData = getData(incomesPolar);

  const showIncomesPolar = incomesPolar.some((item) => item.sum);
  const showExpensesPolar = expensesPolar.some((item) => item.sum);

  const options = getOptions(currency);

  return (
    <>
      <Section title="Фактические расходы">
        {showExpensesPolar ? (
          <Pie data={expensesPolarData} options={options} />
        ) : (
          <NotContent text="Нет данных для отображения" to={ROUTES.FACTS} />
        )}
      </Section>

      <Section title="Фактические доходы">
        {showIncomesPolar ? (
          <Pie data={incomesPolarData} options={options} />
        ) : (
          <NotContent text="Нет данных для отображения" to={ROUTES.FACTS} />
        )}
      </Section>
    </>
  );
};
