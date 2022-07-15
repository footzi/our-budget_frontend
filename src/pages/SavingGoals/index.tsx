import { useRefetchSavingGoals } from '@/api';
import { PADDING_SIZE, Section } from '@/components/Section';
import { Maybe } from '@/interfaces';
import { Button, Empty, Table } from 'antd';
import React, { useState } from 'react';

import { SavingGoalModal } from './Modal';
import { useAddSavingGoal } from './hooks/useAddSavingGoal';
import { useDeleteSavingGoal } from './hooks/useDeleteSavingGoal';
import { useFormatSavingGoals } from './hooks/useFormatSavingGoals';
import { useUpdateSavingGoal } from './hooks/useUpdateSavingGoal';
import './index.less';
import { SavingGoalAddBody, SavingGoalRender, SavingGoalUpdateBody } from './interfaces';

export const SavingGoals = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editedGoal, setEditedGoal] = useState<Maybe<SavingGoalRender>>(null);

  const goals = useFormatSavingGoals();
  const refetchSavings = useRefetchSavingGoals();

  const { add, isLoading: isLoadingAddGoal } = useAddSavingGoal();
  const { update, isLoading: isLoadingUpdateGoal } = useUpdateSavingGoal();
  const { remove, isLoading: isLoadingDelete } = useDeleteSavingGoal();

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => {
    setIsOpenModal(false);
    setEditedGoal(null);
  };

  const handleAddModal = async (body: SavingGoalAddBody) => {
    await add(body);
    await refetchSavings();
    handleCloseModal();
  };

  const handleUpdateModal = async (body: SavingGoalUpdateBody) => {
    await update(body);
    await refetchSavings();
    handleCloseModal();
  };

  const handleDelete = async (id: number) => {
    await remove(id);
    refetchSavings();
  };

  const handleEdit = (goal: SavingGoalRender) => {
    setEditedGoal(goal);
    setIsOpenModal(true);
  };

  return (
    <div className="saving-goal">
      <Section className="saving-goal__create-button" paddingSize={PADDING_SIZE.SMALL}>
        <Button onClick={handleOpenModal}>Создать новую копилку</Button>
      </Section>

      <Section className="saving-goal__table">
        <Table
          locale={{ emptyText: <Empty description="Еще нет копилок" /> }}
          dataSource={goals}
          pagination={false}
          onRow={(record) => {
            return {
              onClick: () => handleEdit(record),
            };
          }}>
          <Table.Column title="Название" dataIndex="name" key="name" />
          <Table.Column title="Описание" dataIndex="description" key="description" />
          <Table.Column title="Текущее значение" dataIndex="valueText" key="valueText" />
        </Table>
      </Section>

      <SavingGoalModal
        isShow={isOpenModal}
        editedGoal={editedGoal}
        onAdd={handleAddModal}
        onCancel={handleCloseModal}
        onUpdate={handleUpdateModal}
        onDelete={handleDelete}
        isLoading={isLoadingAddGoal || isLoadingUpdateGoal}
        isLoadingDelete={isLoadingDelete}
      />
    </div>
  );
};
