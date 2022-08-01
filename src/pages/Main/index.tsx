import { TopDatePicker } from '@/components/TopDatePicker';
import { ROUTES } from '@/constants/routes';
import { useGetExpenses } from '@/hooks/useGetExpenses';
import { useGetIncomes } from '@/hooks/useGetIncomes';
import { useGetSavings } from '@/hooks/useGetSavings';
import { Analytics } from '@/pages/Analytics';
import { Facts } from '@/pages/Facts';
import { Plans } from '@/pages/Plans';
import { Savings } from '@/pages/Savings';
import { Spin } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './index.less';

const currentDay = dayjs();

export const Main: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(currentDay);

  const handleChangeMonth = (date: Dayjs) => setSelectedDate(date);

  const { isLoading: isLoadingGetExpenses } = useGetExpenses(selectedDate);
  const { isLoading: isLoadingGetIncomes } = useGetIncomes(selectedDate);
  const { isLoading: isLoadingGetSavings } = useGetSavings(selectedDate);

  const isLoading = isLoadingGetExpenses || isLoadingGetIncomes || isLoadingGetSavings;

  return (
    <div className="main">
      <div className="main__top">
        <TopDatePicker onChange={handleChangeMonth} selectedDate={selectedDate} />
        {isLoading && <Spin size="small" />}
      </div>

      <Routes>
        <Route path="" element={<Analytics />} />
        <Route path={ROUTES.PLANS} element={<Plans selectedDate={selectedDate ?? currentDay} />} />
        <Route path={ROUTES.FACTS} element={<Facts selectedDate={selectedDate ?? currentDay} />} />
        <Route path={ROUTES.SAVINGS} element={<Savings date={selectedDate ?? currentDay} />} />
      </Routes>
    </div>
  );
};
