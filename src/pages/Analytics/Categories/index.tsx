import { Section } from '@/components/Section';
import { formatPrice } from '@/utils/formatPrice';
import { Empty, Table } from 'antd';
import cx from 'classnames';
import React, { useCallback } from 'react';

import { useGetCategoriesAnalytics } from './hooks/useGetCategoriesAnalytics';
import './index.less';
import { AnalyticsCategoryRender } from './interfaces';

export const CategoriesAnalytics = () => {
  const items = useGetCategoriesAnalytics();

  const sorterPlan = useCallback((a: AnalyticsCategoryRender, b: AnalyticsCategoryRender) => a.plan - b.plan, []);
  const sorterFact = useCallback((a: AnalyticsCategoryRender, b: AnalyticsCategoryRender) => a.fact - b.fact, []);
  const sorterDiff = useCallback(
    (a: AnalyticsCategoryRender, b: AnalyticsCategoryRender) => a.diff.value - b.diff.value,
    []
  );

  return (
    <Section title="Аналитика расходов по категориям" className="analytics-categories">
      <Table locale={{ emptyText: <Empty description="Еще нет категорий" /> }} dataSource={items} pagination={false}>
        <Table.Column title="Категория" dataIndex="name" key="name" className="analytics-categories__name" />
        <Table.Column
          title="План"
          dataIndex="plan"
          key="plan"
          sorter={sorterPlan}
          render={(value) => formatPrice(value)}
        />
        <Table.Column
          title="Факт"
          dataIndex="fact"
          key="fact"
          sorter={sorterFact}
          render={(value) => formatPrice(value)}
        />
        <Table.Column
          title="Разница"
          dataIndex="diff"
          key="diff"
          sorter={sorterDiff}
          render={(diff) => {
            const cxDiff = cx('analytics-categories__diff', {
              'analytics-categories__diff_positive': diff.isPositive,
            });
            return <span className={cxDiff}>{formatPrice(diff.value)}</span>;
          }}
        />
      </Table>
    </Section>
  );
};
