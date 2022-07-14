import { Section } from '@/components/Section';
import { CATEGORIES_TYPES } from '@/constants';
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

import { useGetSumByCategories } from './hooks/useGetSumByCategories';
import './index.less';
import { getData } from './utils/getData';
import { getDataPolar } from './utils/getDataPolar';
import { getOptions } from './utils/getOptions';
import { getOptionsPolar } from './utils/getOptionsPolar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
ChartJS.register(RadialLinearScale, ArcElement, Legend, Tooltip);

// @todo Прибраться тут, разбить на компоненты
export const Analytics: React.FC = () => {
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

  return (
    <div className="analytics">
      <div className="analytics__row">
        <div className="analytics__chart-bar">
          <Section title="Расходы">
            <Bar data={expensesData} options={options} />
          </Section>
        </div>
        <div className="analytics__chart-bar">
          <Section title="Доходы">
            <Bar data={incomesData} options={options} />
          </Section>
        </div>
      </div>

      <div className="analytics__row">
        <div className="analytics__chart-polar">
          <Section title="Расходы">
            <Pie data={expensesPolarData} options={optionsPolar} />
          </Section>
        </div>

        <div className="analytics__chart-polar">
          <Section title="Доходы">
            <Pie data={incomesPolarData} options={optionsPolar} />
          </Section>
        </div>
      </div>
    </div>
  );
};
