import ArrowDownOutlined from '@ant-design/icons/ArrowDownOutlined';
import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import MoneyCollectOutlined from '@ant-design/icons/MoneyCollectOutlined';
import PieChartOutlined from '@ant-design/icons/PieChartOutlined';
import { DatePicker } from 'antd';
import { Tabs } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';

import { Expenses } from '../Expenses';
import './index.less';

export const Layout = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleChangeMonth = (date: Dayjs) => setSelectedDate(date);

  return (
    <div className="layout">
      <aside className="layout__sidebar">Cайдбар</aside>
      <div className="layout__content">
        <header className="layout__header">
          {/*// @ts-ignore */}
          <DatePicker onChange={handleChangeMonth} picker="month" value={selectedDate} />
        </header>
        <main>
          <Tabs defaultActiveKey="0">
            <Tabs.TabPane
              key="1"
              tab={
                <span>
                  <PieChartOutlined /> Аналитика
                </span>
              }>
              {selectedDate && <Expenses date={selectedDate} />}
            </Tabs.TabPane>
            <Tabs.TabPane
              key="2"
              tab={
                <span>
                  <ArrowDownOutlined />
                  Доходы
                </span>
              }>
              Доходы
            </Tabs.TabPane>
            <Tabs.TabPane
              key="3"
              tab={
                <span>
                  <ArrowUpOutlined />
                  Расходы
                </span>
              }>
              {/*<Expenses />*/}
            </Tabs.TabPane>
            <Tabs.TabPane
              key="4"
              tab={
                <span>
                  <MoneyCollectOutlined /> Сбережения
                </span>
              }>
              Сбережения
            </Tabs.TabPane>
          </Tabs>
        </main>
      </div>
    </div>
  );
};
