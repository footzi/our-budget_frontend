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

  const expensesOptions = getOptions('Расходы');
  const incomesOptions = getOptions('Доходы');

  const expensesData = getData([expensesPlan, expensesFact]);
  const incomesData = getData([incomesPlan, incomesFact]);

  const expensesPolar = useGetSumByCategories(CATEGORIES_TYPES.EXPENSE);
  const expensesPolarData = getDataPolar(expensesPolar);
  const expensesPolarOptions = getOptionsPolar('Расходы');

  const incomesPolar = useGetSumByCategories(CATEGORIES_TYPES.INCOME);
  const incomesPolarData = getDataPolar(incomesPolar);
  const incomesPolarOptions = getOptionsPolar('Доходы');

  return (
    <div className="analytics">
      <div className="analytics__row">
        <div className="analytics__chart-bar">
          <Bar data={expensesData} options={expensesOptions} />
        </div>
        <div className="analytics__chart-bar">
          <Bar data={incomesData} options={incomesOptions} />
        </div>
      </div>

      <div className="analytics__row">
        <div className="analytics__chart-polar">
          <Pie data={expensesPolarData} options={expensesPolarOptions} />
        </div>

        <div className="analytics__chart-polar">
          <Pie data={incomesPolarData} options={incomesPolarOptions} />
        </div>
      </div>
    </div>
  );
};
