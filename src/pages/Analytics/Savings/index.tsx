import { CurrenciesList } from '@/components/CurrenciesList';
import { Section } from '@/components/Section';
import { CurrenciesValues } from '@/interfaces';
import { getIsEmptyObject } from '@/utils/getIsEmptyObject';
import { Empty, Table } from 'antd';
import React, { useCallback } from 'react';

import { useGetSavingsAnalytics } from './hooks/useGetSavingsAnalytics';
import './index.less';
import { AnalyticsSavingRender } from './interfaces';

export const SavingsAnalytics: React.FC = () => {
  const { savings, total } = useGetSavingsAnalytics();

  const sorter = useCallback((a: CurrenciesValues, b: CurrenciesValues) => {
    const prev = Object.values(a)[0] ?? 0;
    const next = Object.values(b)[0] ?? 0;

    return prev - next;
  }, []);

  const sorterIncome = (a: AnalyticsSavingRender, b: AnalyticsSavingRender) => sorter(a.income, b.income);
  const sorterExpense = (a: AnalyticsSavingRender, b: AnalyticsSavingRender) => sorter(a.expense, b.expense);
  const sorterDiff = (a: AnalyticsSavingRender, b: AnalyticsSavingRender) => sorter(a.diff, b.diff);

  const isShowDiff = !getIsEmptyObject(total.diff);

  return (
    <Section title="Аналитика копилок" className="analytics-savings">
      {/* // @todo Сделать перенос diff */}
      <div className="analytics-savings__content">
        <Table
          locale={{ emptyText: <Empty description="Нет данных для отображения" /> }}
          dataSource={savings}
          pagination={false}>
          <Table.Column title="Копилка" dataIndex="name" key="name" className="analytics-savings__name" />
          <Table.Column
            title="Положили"
            dataIndex="income"
            key="income"
            className="analytics-savings__cell"
            sorter={sorterIncome}
            render={(values: CurrenciesValues) => <CurrenciesList values={values} />}
          />
          <Table.Column
            title="Вынули"
            dataIndex="expense"
            key="expense"
            className="analytics-savings__cell"
            sorter={sorterExpense}
            render={(values: CurrenciesValues) => <CurrenciesList values={values} />}
          />
          <Table.Column
            title="Итого"
            dataIndex="diff"
            key="diff"
            className="analytics-savings__cell"
            sorter={sorterDiff}
            render={(values: CurrenciesValues) => <CurrenciesList values={values} isDiff />}
          />
        </Table>

        {isShowDiff && (
          <div className="analytics-savings__total">
            <span className="analytics-savings__total-name">Итого:</span>
            <span className="analytics-savings__total-value">
              <CurrenciesList values={total.income} />
            </span>
            <span className="analytics-savings__total-value">
              <CurrenciesList values={total.expense} />
            </span>
            <span className="analytics-savings__total-value">
              <CurrenciesList values={total.diff} isDiff />
            </span>
          </div>
        )}
      </div>
    </Section>
  );
};
