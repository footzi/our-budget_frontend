import React from 'react';
import { Empty, Table } from 'antd';
import { Loader } from '@/components/Loader';
import { Section } from '@/components/Section';
import { useGetBalanceHistory } from './hooks/useGetBalanceHistory';

const BalanceHistory = () => {
  const { isLoading, history } = useGetBalanceHistory();

  if (isLoading) {
    return <Loader isInner />;
  }
  return (
    <Section>
      <Table
        dataSource={history}
        pagination={false}
        locale={{ emptyText: <Empty description="Нет данных для отображения" /> }}>
        <Table.Column title="Дата" dataIndex="date" key="createdAt" />
        <Table.Column title="Действие" dataIndex="action" key="action" />
        <Table.Column title="Старое значение" dataIndex="oldValue" key="oldValue" />
        <Table.Column title="Новое значение" dataIndex="newValue" key="newValue" />
        <Table.Column title="Разница" dataIndex="newValue" key="diff" />
      </Table>
    </Section>
  );
};

export default BalanceHistory;
