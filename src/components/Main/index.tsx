import { Expenses } from '@/components/Expenses';
import { Incomes } from '@/components/Incomes';
import { Savings } from '@/components/Savings';
import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import MoneyCollectOutlined from '@ant-design/icons/MoneyCollectOutlined';
import PieChartOutlined from '@ant-design/icons/PieChartOutlined';
import { DatePicker, Tabs } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

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
            <ArrowDownOutlined />
            Доходы
          </span>
        }>
        {date && <Incomes date={date} />}
      </Tabs.TabPane>
      <Tabs.TabPane
        key="income"
        tab={
          <span>
            <ArrowUpOutlined />
            Расходы
          </span>
        }>
        {date && <Expenses date={date} />}
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
      <Tabs.TabPane
        key="analytics"
        tab={
          <span>
            <PieChartOutlined /> Аналитика
          </span>
        }>
        Аналитика
      </Tabs.TabPane>
    </Tabs>
  );
});

export const Main: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleChangeMonth = (date: Dayjs) => setSelectedDate(date);

  return (
    <>
      <div className="layout__header">
        {/*// @ts-ignore */}
        <DatePicker onChange={handleChangeMonth} picker="month" value={selectedDate} format="MM.YYYY" />
      </div>
      <Routes>
        <Route path="" element={<Content date={selectedDate} />}></Route>
        <Route path=":tab" element={<Content date={selectedDate} />}></Route>
      </Routes>
    </>
  );
};
