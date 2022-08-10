import { ROUTES } from '@/constants/routes';
import { TopDatePicker } from '@/modules/TopDatePicker';
import { Analytics } from '@/pages/Analytics';
import { Facts } from '@/pages/Facts';
import { Plans } from '@/pages/Plans';
import { Savings } from '@/pages/Savings';
import { Spin } from 'antd';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './index.less';
import { MainProps } from './interfaces';

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
        <Route path={ROUTES.SAVINGS} element={<Savings date={selectedDate} />} />
      </Routes>
    </div>
  );
};
