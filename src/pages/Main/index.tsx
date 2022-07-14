import { PADDING_SIZE, Section } from '@/components/Section';
import { ROUTES } from '@/constants/routes';
import { useGetExpenses } from '@/hooks/useGetExpenses';
import { useGetIncomes } from '@/hooks/useGetIncomes';
import { Analytics } from '@/pages/Analytics';
import { Facts } from '@/pages/Facts';
import { Plans } from '@/pages/Plans';
import { Savings } from '@/pages/Savings';
import { DatePicker, Spin } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './index.less';

export const Main: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleChangeMonth = (date: Dayjs) => setSelectedDate(date);

  const { isLoading: isLoadingGetExpenses } = useGetExpenses(selectedDate);
  const { isLoading: isLoadingGetIncomes } = useGetIncomes(selectedDate);

  const isLoading = isLoadingGetExpenses || isLoadingGetIncomes;

  return (
    <div className="main">
      <div className="main__top">
        <Section paddingSize={PADDING_SIZE.SMALL}>
          {/*// @ts-ignore */}
          <DatePicker onChange={handleChangeMonth} picker="month" value={selectedDate} format="MM.YYYY" />
          {isLoading && <Spin size="small" />}
        </Section>
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
