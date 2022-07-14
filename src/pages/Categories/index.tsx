import { useRefetchCategories } from '@/api';
import { PADDING_SIZE, Section } from '@/components/Section';
import { Maybe } from '@/interfaces';
import { Button, Table } from 'antd';
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
  const { remove, isLoading: isLoadingDelete } = useDeleteCategory();

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

  const handleEdit = (category: CategoryRender) => {
    setEditedCategory(category);
    setIsOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    await remove(id);
    refetchCategories();
  };

  return (
    <div className="categories">
      <Section className="categories__create-button" paddingSize={PADDING_SIZE.SMALL}>
        <Button onClick={handleOpenModal}>Создать новую категорию</Button>
      </Section>

      <div className="categories__tables">
        <Section title="Расходные категории">
          <Table
            dataSource={expense}
            pagination={false}
            onRow={(record) => {
              return {
                onClick: () => handleEdit(record),
              };
            }}>
            <Table.Column title="Название" dataIndex="name" key="name" />
            <Table.Column title="Период" dataIndex="period" key="period" />
          </Table>
        </Section>

        <Section title="Доходные категории">
          <Table
            dataSource={income}
            pagination={false}
            onRow={(record) => {
              return {
                onClick: () => handleEdit(record),
              };
            }}>
            <Table.Column title="Название" dataIndex="name" key="name" />
            <Table.Column title="Период" dataIndex="period" key="period" />
          </Table>
        </Section>
      </div>

      <CategoryModal
        isShow={isOpenModal}
        editedCategory={editedCategory}
        onAdd={handleAddModal}
        onUpdate={handleUpdateModal}
        onCancel={handleCloseModal}
        onDelete={handleDelete}
        isLoading={isLoadingUpdateCategory || isLoadingSaveCategory}
        isLoadingDelete={isLoadingDelete}
      />
    </div>
  );
};
