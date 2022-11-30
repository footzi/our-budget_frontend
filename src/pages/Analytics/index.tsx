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
import { SavingsAnalytics } from './Savings';
import './index.less';
import { CurrentAndFactContainer } from './СurrentAndFactContainer';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
ChartJS.register(RadialLinearScale, ArcElement, Legend, Tooltip);

const Analytics: React.FC = () => {
  return (
    <div className="analytics">
      <CurrentAndFactContainer />

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
