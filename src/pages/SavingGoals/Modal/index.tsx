import { SubmitHiddenButton } from '@/components/SubmitHiddenButton';
import { Button, Form, Input, InputNumber, Modal, Popconfirm } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useCallback, useEffect, useState } from 'react';

import { SavingGoalModalProps } from './interfaces';

export const SavingGoalModal: React.FC<SavingGoalModalProps> = ({
  isShow,
  editedGoal,
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

  const handleSubmit = (form: { name: string; description: string; value: number }) => {
    const { name, description, value } = form;

    if (isLoading) {
      return;
    }

    if (editedGoal?.id) {
      onUpdate({ name, description, value, id: editedGoal.id });
    } else {
      onAdd({ name, description, value });
    }
  };

  const handleClickDelete = async () => {
    if (editedGoal?.id) {
      await onDelete(editedGoal.id);
      onCancel();
    }
  };

  const formValidator = useCallback((name: string): boolean => {
    return Boolean(name);
  }, []);

  useEffect(() => {
    if (editedGoal) {
      const { name, description, value } = editedGoal;

      form.setFieldsValue({
        name,
        description,
        value,
      });

      const isValidForm = formValidator(name);
      setIsValidForm(isValidForm);
    }
  }, [editedGoal, form, formValidator]);

  const title = editedGoal ? `Редактирование копилки "${editedGoal.name}"` : 'Новая копилка';
  const valueLabel = editedGoal ? 'Текущее значение' : 'Начальное значение';

  return (
    <Modal
      visible={isShow}
      onOk={handleOk}
      okButtonProps={{ loading: isLoading, disabled: !isValidForm }}
      onCancel={onCancel}
      title={title}
      okText="Сохранить"
      cancelText="Закрыть"
      destroyOnClose
      className="saving-goal-modal">
      <Form layout="vertical" form={form} onFinish={handleSubmit} preserve={false}>
        <Form.Item label="Название" name="name" rules={[{ required: true, message: 'Введите название' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Описание" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label={valueLabel} name="value">
          <InputNumber addonAfter={<span>₽</span>} />
        </Form.Item>

        <Form.Item hidden dependencies={['name']}>
          {({ getFieldsValue }) => {
            const values = getFieldsValue();
            const { name } = values;

            return <SubmitHiddenButton onValid={setIsValidForm} validator={() => formValidator(name)} />;
          }}
        </Form.Item>

        {editedGoal && (
          <Form.Item>
            <Popconfirm
              okText="Да"
              cancelText="Отмена"
              title="Вы уверены, что хотите удалить копилку?"
              onConfirm={handleClickDelete}>
              <Button danger loading={isLoadingDelete}>
                Удалить
              </Button>
            </Popconfirm>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
