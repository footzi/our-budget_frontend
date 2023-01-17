import { SubmitHiddenButton } from '@/components/SubmitHiddenButton';
import { getModalTitle } from '@/pages/Categories/Modal/utils/getModalTitle';
import { Button, Form, Input, Modal, Popconfirm } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useCallback, useEffect, useState } from 'react';

import { CategoryModalProps } from './interfaces';

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isShow,
  editedCategory,
  type,
  onAdd,
  onUpdate,
  onCancel,
  onDelete,
  isLoading,
  isLoadingDelete,
}) => {
  const [form] = useForm();

  const [isValidForm, setIsValidForm] = useState(false);

  const handleOk = () => {
    form.submit();
  };

  const handleSubmit = (form: { name: string }) => {
    const { name } = form;

    if (isLoading) {
      return;
    }

    if (editedCategory?.id) {
      onUpdate({ name, id: editedCategory.id });
    } else {
      onAdd({ name, type });
    }
  };

  const handleClickDelete = async () => {
    if (editedCategory?.id) {
      await onDelete(editedCategory.id);
      onCancel();
    }
  };

  const formValidator = useCallback((name: string): boolean => {
    return Boolean(name);
  }, []);

  useEffect(() => {
    if (editedCategory) {
      const { name } = editedCategory;

      form.setFieldsValue({
        name,
      });

      const isValidForm = formValidator(name);
      setIsValidForm(isValidForm);
    }
  }, [editedCategory, form, formValidator]);

  const title = getModalTitle(editedCategory, type);

  return (
    <Modal
      open={isShow}
      onOk={handleOk}
      footer={
        <>
          {editedCategory && (
            <Popconfirm
              okText="Да"
              cancelText="Отмена"
              title="Вы уверены, что хотите удалить эту категорию?"
              icon={null}
              onConfirm={handleClickDelete}>
              <Button danger loading={isLoadingDelete}>
                Удалить
              </Button>
            </Popconfirm>
          )}

          <Button type="primary" loading={isLoading} disabled={!isValidForm} onClick={handleOk}>
            Сохранить
          </Button>
        </>
      }
      onCancel={onCancel}
      title={title}
      destroyOnClose>
      <Form form={form} onFinish={handleSubmit} preserve={false}>
        <Form.Item name="name" rules={[{ required: true, message: 'Введите название' }]}>
          <Input placeholder="Название" />
        </Form.Item>

        <Form.Item hidden dependencies={['name']}>
          {({ getFieldsValue }) => {
            const values = getFieldsValue();
            const { name } = values;

            return <SubmitHiddenButton onValid={setIsValidForm} validator={() => formValidator(name)} />;
          }}
        </Form.Item>
      </Form>
    </Modal>
  );
};
