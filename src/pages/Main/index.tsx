import { ROUTES } from '@/constants/routes';
import { TopDatePicker } from '@/modules/TopDatePicker';
import Analytics from '@/pages/Analytics';
import { Spin } from 'antd';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './index.less';
import { MainProps } from './interfaces';

const Facts = React.lazy(() => import(/* webpackPrefetch: true */ '../Facts'));
const Plans = React.lazy(() => import(/* webpackPrefetch: true */ '../Plans'));
const Savings = React.lazy(() => import(/* webpackPrefetch: true */ '../Savings'));

export const Main: React.FC<MainProps> = ({ selectedDate, isLoading, onChangeDate }) => {
  return (
    <div className="main">
      <div className="main__top">
        <TopDatePicker onChange={onChangeDate} selectedDate={selectedDate} />
        {isLoading && <Spin size="small" />}
      </div>

      <Routes>
        <Route path="" element={<Analytics />} />
        <Route path={ROUTES.PLANS} element={<Plans selectedDate={selectedDate} />} />
        <Route path={ROUTES.FACTS} element={<Facts selectedDate={selectedDate} />} />
        <Route path={ROUTES.SAVINGS} element={<Savings selectedDate={selectedDate} />} />
      </Routes>
    </div>
  );
};
