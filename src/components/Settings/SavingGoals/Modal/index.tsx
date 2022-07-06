import { Form, Input, InputNumber, Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';

import { SavingGoalModalProps } from './interfaces';

export const SavingGoalModal: React.FC<SavingGoalModalProps> = ({
  isShow,
  editedGoal,
  onAdd,
  onUpdate,
  onCancel,
  isLoading,
}) => {
  const [form] = useForm();

  const handleOk = () => {
    form.submit();
  };

  const handleSubmit = (form: { name: string; description: string; value: number }) => {
    const { name, description, value } = form;

    if (editedGoal?.id) {
      onUpdate({ name, description, value, id: editedGoal.id });
    } else {
      onAdd({ name, description, value });
    }
  };

  useEffect(() => {
    if (editedGoal) {
      const { name, description, value } = editedGoal;

      form.setFieldsValue({
        name,
        description,
        value,
      });
    }
  }, [editedGoal, form]);

  const title = editedGoal ? `Редактирование копилки "${editedGoal.name}"` : 'Новая копилка';

  return (
    <Modal
      visible={isShow}
      onOk={handleOk}
      okButtonProps={{ loading: isLoading }}
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

        <Form.Item label="Начальное значение" name="value">
          <InputNumber addonAfter={<span>₽</span>} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
