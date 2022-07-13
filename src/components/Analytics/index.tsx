import { useAppSelector } from '@/store';
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import './index.less';
import { getData } from './utils/getData';
import { getOptions } from './utils/getOptions';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

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

  return (
    <div className="analytics">
      <div className="analytics__chart">
        <Bar data={expensesData} options={expensesOptions} />
      </div>
      <div className="analytics__chart">
        <Bar data={incomesData} options={incomesOptions} />
      </div>
    </div>
  );
};
