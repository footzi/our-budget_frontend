import { useRefetchCategories } from '@/api';
import { Section } from '@/components/Section';
import { CATEGORIES_TYPES } from '@/constants';
import { Maybe } from '@/interfaces';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Button, Empty, Table } from 'antd';
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
  const [modalType, setIsModalType] = useState<CATEGORIES_TYPES>(CATEGORIES_TYPES.INCOME);
  const [editedCategory, setEditedCategory] = useState<Maybe<CategoryRender>>(null);
  const refetchCategories = useRefetchCategories();

  const { expense, income } = useFilterCategories();
  const { add, isLoading: isLoadingSaveCategory } = useAddCategory();
  const { update, isLoading: isLoadingUpdateCategory } = useUpdateCategory();
  const { remove, isLoading: isLoadingDelete } = useDeleteCategory();

  const handleOpenModal = (type: CATEGORIES_TYPES) => {
    setIsModalType(type);
    setIsOpenModal(true);
  };

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
      <div className="categories__tables">
        <Section title="Категории расходов">
          <Button
            onClick={() => handleOpenModal(CATEGORIES_TYPES.EXPENSE)}
            type="primary"
            icon={<PlusOutlined />}
            className="categories__create-button">
            Создать категорию РАСХОДЫ
          </Button>

          <Table
            locale={{ emptyText: <Empty description="Еще нет категорий" /> }}
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

        <Section title="Категории доходов">
          <Button
            onClick={() => handleOpenModal(CATEGORIES_TYPES.INCOME)}
            icon={<PlusOutlined />}
            className="categories__create-button">
            Создать категорию ДОХОДЫ
          </Button>

          <Table
            locale={{ emptyText: <Empty description="Еще нет категорий" /> }}
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
        type={modalType}
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
