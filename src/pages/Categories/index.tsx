import { useRefetchCategories } from '@/api';
import { Maybe } from '@/interfaces';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import { Button, Popconfirm, Table, Typography } from 'antd';
import React, { useState } from 'react';

import { CategoryModal } from './Modal';
import { useAddCategory } from './hooks/useAddCategory';
import { useDeleteCategory } from './hooks/useDeleteCategory';
import { useFilterCategories } from './hooks/useFilterCategories';
import { useUpdateCategory } from './hooks/useUpdateCategory';
import './index.less';
import { CategoryAddBody, CategoryRender, CategoryUpdateBody } from './interfaces';

/**
 * Блок с категориями
 */
export const Categories = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editedCategory, setEditedCategory] = useState<Maybe<CategoryRender>>(null);
  const refetchCategories = useRefetchCategories();

  const { expense, income } = useFilterCategories();
  const { add, isLoading: isLoadingSaveCategory } = useAddCategory();
  const { update, isLoading: isLoadingUpdateCategory } = useUpdateCategory();
  const { remove } = useDeleteCategory();

  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => {
    setIsOpenModal(false);
    setEditedCategory(null);
  };

  const handleAddModal = async (body: CategoryAddBody) => {
    await add(body);
    await refetchCategories();
    handleCloseModal();
  };

  const handleUpdateModal = async (body: CategoryUpdateBody) => {
    await update(body);
    await refetchCategories();
    handleCloseModal();
  };

  const handleEdit = (_: undefined, category: CategoryRender) => {
    setEditedCategory(category);
    setIsOpenModal(true);
  };

  const handleDelete = async (_: undefined, category: CategoryRender) => {
    await remove(category.id);
    refetchCategories();
  };

  return (
    <div className="categories">
      <Button onClick={handleOpenModal}>Создать</Button>

      <div className="categories__tables">
        <div>
          <Typography.Title level={4}>Расходы</Typography.Title>
          <Table dataSource={expense} pagination={false}>
            <Table.Column title="Название" dataIndex="name" key="name" />
            <Table.Column title="Период" dataIndex="period" key="period" />
            <Table.Column
              title="Действия"
              dataIndex="action"
              key="period"
              render={(_, category: CategoryRender) => (
                <div className="categories__table-action">
                  <Button icon={<EditOutlined />} size="small" onClick={() => handleEdit(_, category)} />
                  <Popconfirm
                    okText="Да"
                    cancelText="Отмена"
                    title="Вы уверены, что хотите удалить категорию?"
                    onConfirm={() => handleDelete(_, category)}>
                    <Button icon={<DeleteOutlined />} size="small" />
                  </Popconfirm>
                </div>
              )}
            />
          </Table>
        </div>

        <div>
          <Typography.Title level={4}>Доходы</Typography.Title>
          <Table dataSource={income} pagination={false}>
            <Table.Column title="Название" dataIndex="name" key="name" />
            <Table.Column title="Период" dataIndex="period" key="period" />
            <Table.Column
              title="Действия"
              dataIndex="action"
              key="period"
              render={(_, category: CategoryRender) => (
                <div className="categories__table-action">
                  <Button icon={<EditOutlined />} size="small" onClick={() => handleEdit(_, category)} />
                  <Popconfirm
                    okText="Да"
                    cancelText="Отмена"
                    title="Вы уверены, что хотите удалить категорию?"
                    onConfirm={() => handleDelete(_, category)}>
                    <Button icon={<DeleteOutlined />} size="small" />
                  </Popconfirm>
                </div>
              )}
            />
          </Table>
        </div>
      </div>

      <CategoryModal
        isShow={isOpenModal}
        editedCategory={editedCategory}
        onAdd={handleAddModal}
        onUpdate={handleUpdateModal}
        onCancel={handleCloseModal}
        isLoading={isLoadingUpdateCategory || isLoadingSaveCategory}
      />
    </div>
  );
};
