import { ErrorBoundary } from '@/components/ErrorBoundary';
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

import { CategoriesAnalytics } from './Categories';
import { CurrentAnalytics } from './Current';
import { FactsAnalytics } from './Facts';
import { SavingsAnalytics } from './Savings';
import './index.less';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
ChartJS.register(RadialLinearScale, ArcElement, Legend, Tooltip);

const Analytics: React.FC = () => {
  return (
    <div className="analytics">
      <div className="analytics__row">
        <ErrorBoundary>
          <CurrentAnalytics />
        </ErrorBoundary>
      </div>

      <div className="analytics__row">
        <ErrorBoundary>
          <FactsAnalytics />
        </ErrorBoundary>
      </div>

      <div className="analytics__row_full">
        <ErrorBoundary>
          <CategoriesAnalytics />
        </ErrorBoundary>
      </div>

      <div className="analytics__row_full">
        <ErrorBoundary>
          <SavingsAnalytics />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Analytics;
