import { useRefetchCategories } from '@/api';
import { AddButton } from '@/components/AddButton';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Section } from '@/components/Section';
import { CATEGORIES_TYPES } from '@/constants';
import { Maybe } from '@/interfaces';
import { Empty, Table } from 'antd';
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
const Categories = () => {
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
        <ErrorBoundary>
          <Section title="Категории расходов">
            <div className="categories__create-button">
              <AddButton onClick={() => handleOpenModal(CATEGORIES_TYPES.EXPENSE)}>Создать новую категорию</AddButton>
            </div>

            <Table
              locale={{ emptyText: <Empty description="Категории отсутствуют" /> }}
              dataSource={expense}
              pagination={false}
              onRow={(record) => {
                return {
                  onClick: () => handleEdit(record),
                };
              }}>
              <Table.Column title="Название" dataIndex="name" key="name" />
            </Table>
          </Section>
        </ErrorBoundary>

        <ErrorBoundary>
          <Section title="Категории доходов">
            <div className="categories__create-button">
              <AddButton onClick={() => handleOpenModal(CATEGORIES_TYPES.INCOME)}>Создать новую категорию</AddButton>
            </div>

            <Table
              locale={{ emptyText: <Empty description="Категории отсутствуют" /> }}
              dataSource={income}
              pagination={false}
              onRow={(record) => {
                return {
                  onClick: () => handleEdit(record),
                };
              }}>
              <Table.Column title="Название" dataIndex="name" key="name" />
            </Table>
          </Section>
        </ErrorBoundary>
      </div>

      <ErrorBoundary>
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
      </ErrorBoundary>
    </div>
  );
};

export default Categories;
