import { useAppContext } from '@/context';
import { Maybe } from '@/interfaces';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import { Button, Popconfirm, Table } from 'antd';
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

  const { savingGoals } = useAppContext();
  const goals = useFormatSavingGoals();

  const { add, isLoading: isLoadingAddGoal } = useAddSavingGoal();
  const { update, isLoading: isLoadingUpdateGoal } = useUpdateSavingGoal();
  const { remove } = useDeleteSavingGoal();

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  const handleAddModal = async (body: SavingGoalAddBody) => {
    await add(body);
    await savingGoals.refetch();
    setIsOpenModal(false);
  };

  const handleUpdateModal = async (body: SavingGoalUpdateBody) => {
    await update(body);
    await savingGoals.refetch();
    setIsOpenModal(false);
  };

  const handleDelete = async (_: undefined, goal: SavingGoalRender) => {
    await remove(goal.id);
    await savingGoals.refetch();
  };

  const handleEdit = (_: undefined, goal: SavingGoalRender) => {
    setEditedGoal(goal);
    setIsOpenModal(true);
  };

  return (
    <div className="saving-goal">
      <Button onClick={handleOpenModal}>Создать</Button>

      <Table className="saving-goal__table" dataSource={goals} pagination={false}>
        <Table.Column title="Название" dataIndex="name" key="name" />
        <Table.Column title="Описание" dataIndex="description" key="description" />
        <Table.Column title="Текущее значение" dataIndex="valueText" key="valueText" />

        <Table.Column
          title="Действия"
          dataIndex="action"
          key="period"
          render={(_, goal: SavingGoalRender) => (
            <div className="saving-goal__table-action">
              <Button icon={<EditOutlined />} size="small" onClick={() => handleEdit(_, goal)} />
              <Popconfirm
                okText="Да"
                cancelText="Отмена"
                title="Вы уверены, что хотите удалить копилку?"
                onConfirm={() => handleDelete(_, goal)}>
                <Button icon={<DeleteOutlined />} size="small" />
              </Popconfirm>
            </div>
          )}
        />
      </Table>

      <SavingGoalModal
        isShow={isOpenModal}
        editedGoal={editedGoal}
        onAdd={handleAddModal}
        onCancel={handleCloseModal}
        onUpdate={handleUpdateModal}
        isLoading={isLoadingAddGoal || isLoadingUpdateGoal}
      />
    </div>
  );
};
