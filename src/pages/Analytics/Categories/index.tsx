import { CurrenciesList } from '@/components/CurrenciesList';
import { Section } from '@/components/Section';
import { CurrenciesValues } from '@/interfaces';
import { Empty, Table } from 'antd';
import React, { useCallback } from 'react';

import { useGetCategoriesAnalytics } from './hooks/useGetCategoriesAnalytics';
import './index.less';
import { AnalyticsCategoryRender } from './interfaces';

export const CategoriesAnalytics = () => {
  const items = useGetCategoriesAnalytics();

  const sorter = useCallback((a: CurrenciesValues, b: CurrenciesValues) => {
    const prev = Object.values(a)[0] ?? 0;
    const next = Object.values(b)[0] ?? 0;

    return prev - next;
  }, []);

  const sorterPlan = (a: AnalyticsCategoryRender, b: AnalyticsCategoryRender) => sorter(a.plan, b.plan);
  const sorterFact = (a: AnalyticsCategoryRender, b: AnalyticsCategoryRender) => sorter(a.fact, b.fact);
  const sorterDiff = (a: AnalyticsCategoryRender, b: AnalyticsCategoryRender) => sorter(a.diff, b.diff);

  return (
    <Section title="Аналитика расходов по категориям" className="analytics-categories">
      <Table
        locale={{ emptyText: <Empty description="Нет данных для отображения" /> }}
        dataSource={items}
        pagination={false}>
        <Table.Column title="Категория" dataIndex="name" key="name" className="analytics-categories__name" />
        <Table.Column
          title="План"
          dataIndex="plan"
          key="plan"
          sorter={sorterPlan}
          render={(values: CurrenciesValues) => <CurrenciesList values={values} />}
        />
        <Table.Column
          title="Факт"
          dataIndex="fact"
          key="fact"
          sorter={sorterFact}
          render={(values: CurrenciesValues) => <CurrenciesList values={values} />}
        />
        <Table.Column
          title="Разница"
          dataIndex="diff"
          sorter={sorterDiff}
          render={(values) => <CurrenciesList values={values} isDiff />}
        />
      </Table>
    </Section>
  );
};
