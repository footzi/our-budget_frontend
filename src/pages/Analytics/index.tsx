import { NotContent } from '@/components/NotContent';
import { Section } from '@/components/Section';
import { CATEGORIES_TYPES } from '@/constants';
import { ROUTES } from '@/constants/routes';
import { useAppSelector } from '@/store';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  RadialLinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';

import { CategoriesAnalytics } from './Categories';
import { SavingsAnalytics } from './Savings';
import { useGetSumByCategories } from './hooks/useGetSumByCategories';
import './index.less';
import { getData } from './utils/getData';
import { getDataPolar } from './utils/getDataPolar';
import { getOptions } from './utils/getOptions';
import { getOptionsPolar } from './utils/getOptionsPolar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
ChartJS.register(RadialLinearScale, ArcElement, Legend, Tooltip);

// @todo Прибраться тут, разбить на компоненты
const Analytics: React.FC = () => {
  const { incomes, expenses } = useAppSelector();

  const incomesPlan = incomes.plan.sum;
  const incomesFact = incomes.fact.sum;

  const expensesPlan = expenses.plan.sum;
  const expensesFact = expenses.fact.sum;

  // @todo заменить на константы
  const options = getOptions();
  const optionsPolar = getOptionsPolar();

  const expensesData = getData([expensesPlan, expensesFact]);
  const incomesData = getData([incomesPlan, incomesFact]);

  const expensesPolar = useGetSumByCategories(CATEGORIES_TYPES.EXPENSE);
  const expensesPolarData = getDataPolar(expensesPolar);

  const incomesPolar = useGetSumByCategories(CATEGORIES_TYPES.INCOME);
  const incomesPolarData = getDataPolar(incomesPolar);

  const showIncomesPolar = incomesPolar.some((item) => item.sum);
  const showExpensesPolar = expensesPolar.some((item) => item.sum);

  return (
    <div className="analytics">
      <div className="analytics__row">
        <Section title="Расходы">
          <Bar data={expensesData} options={options} />
        </Section>
        <Section title="Доходы">
          <Bar data={incomesData} options={options} />
        </Section>
      </div>

      <div className="analytics__row">
        <Section title="Фактические расходы">
          {showExpensesPolar ? (
            <Pie data={expensesPolarData} options={optionsPolar} />
          ) : (
            <NotContent text="Нет данных для отображения" to={ROUTES.FACTS} />
          )}
        </Section>

        <Section title="Фактические доходы">
          {showIncomesPolar ? (
            <Pie data={incomesPolarData} options={optionsPolar} />
          ) : (
            <NotContent text="Нет данных для отображения" to={ROUTES.FACTS} />
          )}
        </Section>
      </div>

      <div className="analytics__row_full">
        <CategoriesAnalytics />
      </div>

      <div className="analytics__row_full">
        <SavingsAnalytics />
      </div>
    </div>
  );
};

export default Analytics;
