import { Section } from '@/components/Section';
import { formatPrice } from '@/utils/formatPrice';
import { Empty, Table } from 'antd';
import cx from 'classnames';
import React, { useCallback } from 'react';

import { useGetSavingsAnalytics } from './hooks/useGetSavingsAnalytics';
import './index.less';
import { AnalyticsSavingRender } from './interfaces';

export const SavingsAnalytics: React.FC = () => {
  const { savings, total } = useGetSavingsAnalytics();

  const cxTotal = cx('analytics-savings__total-value analytics-savings__total-value-all', {
    'analytics-savings__total-value-all_positive': total.diff.isPositive,
  });

  const sorterIncome = useCallback((a: AnalyticsSavingRender, b: AnalyticsSavingRender) => a.income - b.income, []);
  const sorterExpense = useCallback((a: AnalyticsSavingRender, b: AnalyticsSavingRender) => a.expense - b.expense, []);
  const sorterDiff = useCallback(
    (a: AnalyticsSavingRender, b: AnalyticsSavingRender) => a.diff.value - b.diff.value,
    []
  );

  return (
    <Section title="Аналитика копилок" className="analytics-savings">
      <Table locale={{ emptyText: <Empty description="Еще нет копилок" /> }} dataSource={savings} pagination={false}>
        <Table.Column title="Копилка" dataIndex="name" key="name" className="analytics-savings__name" />
        <Table.Column
          title="Положили"
          dataIndex="income"
          key="income"
          className="analytics-savings__cell"
          sorter={sorterIncome}
          render={(value) => formatPrice(value)}
        />
        <Table.Column
          title="Вынули"
          dataIndex="expense"
          key="expense"
          className="analytics-savings__cell"
          sorter={sorterExpense}
          render={(value) => formatPrice(value)}
        />
        <Table.Column
          title="Итого"
          dataIndex="diff"
          key="diff"
          className="analytics-savings__cell"
          sorter={sorterDiff}
          render={(diff) => {
            const cxDiff = cx('analytics-savings__diff', {
              'analytics-savings__diff_positive': diff.isPositive,
            });
            return <span className={cxDiff}>{formatPrice(diff.value)}</span>;
          }}
        />
      </Table>
      <div className="analytics-savings__total">
        <span className="analytics-savings__total-name">Итого:</span>
        <span className="analytics-savings__total-value">{formatPrice(total.income)}</span>
        <span className="analytics-savings__total-value">{formatPrice(total.expense)}</span>
        <span className={cxTotal}>{formatPrice(total.diff.value)}</span>
      </div>
    </Section>
  );
};
