import { Analytics } from '@/components/Analytics';
import { Facts } from '@/components/Facts';
import { Plans } from '@/components/Plans';
import { Savings } from '@/components/Savings';
import { useGetExpenses } from '@/hooks/useGetExpenses';
import { useGetIncomes } from '@/hooks/useGetIncomes';
import AimOutlined from '@ant-design/icons/AimOutlined';
import CreditCardOutlined from '@ant-design/icons/CreditCardOutlined';
import MoneyCollectOutlined from '@ant-design/icons/MoneyCollectOutlined';
import PieChartOutlined from '@ant-design/icons/PieChartOutlined';
import { DatePicker, Spin, Tabs } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

import './index.less';

const Content: React.FC<{ date: Dayjs }> = React.memo(({ date }) => {
  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (key: string) => {
    const link = key === '/' ? key : `/${key}`;

    navigate(link);
  };

  return (
    <Tabs defaultActiveKey={params.tab} onChange={handleChange}>
      <Tabs.TabPane
        key="/"
        tab={
          <span>
            <PieChartOutlined /> Аналитика
          </span>
        }>
        <Analytics />
      </Tabs.TabPane>
      <Tabs.TabPane
        key="plans"
        tab={
          <span>
            <AimOutlined /> Планирование
          </span>
        }>
        <Plans selectedDate={date} />
      </Tabs.TabPane>
      <Tabs.TabPane
        key="fact"
        tab={
          <span>
            <CreditCardOutlined /> Факты
          </span>
        }>
        <Facts selectedDate={date} />
      </Tabs.TabPane>
      <Tabs.TabPane
        key="savings"
        tab={
          <span>
            <MoneyCollectOutlined /> Копилки
          </span>
        }>
        {date && <Savings date={date} />}
      </Tabs.TabPane>
    </Tabs>
  );
});

export const Main: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleChangeMonth = (date: Dayjs) => setSelectedDate(date);

  const { isLoading: isLoadingGetExpenses } = useGetExpenses(selectedDate);
  const { isLoading: isLoadingGetIncomes } = useGetIncomes(selectedDate);

  const isLoading = isLoadingGetExpenses || isLoadingGetIncomes;

  return (
    <div className="main">
      <div className="main__top">
        {/*// @ts-ignore */}
        <DatePicker onChange={handleChangeMonth} picker="month" value={selectedDate} format="MM.YYYY" />
        {isLoading && <Spin size="small" />}
      </div>
      <Routes>
        <Route path="" element={<Content date={selectedDate} />}></Route>
        <Route path=":tab" element={<Content date={selectedDate} />}></Route>
      </Routes>
    </div>
  );
};
