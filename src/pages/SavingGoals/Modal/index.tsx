import { SubmitHiddenButton } from '@/components/SubmitHiddenButton';
import { CURRENCIES_TYPE, DEFAULT_CURRENCY } from '@/constants';
import { getCurrencyInfo } from '@/utils/getCurrencyInfo';
import { getOptionsCurrencies } from '@/utils/getOptionsCurrencies';
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useCallback, useEffect, useState } from 'react';

import { SavingGoalModalProps } from './interfaces';

export const SavingGoalModal: React.FC<SavingGoalModalProps> = ({
  isShow,
  editedGoal,
  currencies,
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

  const handleSubmit = (form: { name: string; description: string; value: number; currency: CURRENCIES_TYPE }) => {
    const { name, description, value, currency } = form;

    if (isLoading) {
      return;
    }

    if (editedGoal?.id) {
      onUpdate({ name, description, value, id: editedGoal.id, currency: editedGoal.currency });
    } else {
      onAdd({ name, description, value, currency });
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
  const { symbol } = getCurrencyInfo(editedGoal?.currency);

  const currenciesOptions = getOptionsCurrencies(currencies);

  return (
    <Modal
      open={isShow}
      onOk={handleOk}
      okButtonProps={{ loading: isLoading, disabled: !isValidForm }}
      onCancel={onCancel}
      title={title}
      okText="Сохранить"
      cancelText="Закрыть"
      destroyOnClose
      className="saving-goal-modal">
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        preserve={false}
        initialValues={{ currency: DEFAULT_CURRENCY }}>
        <Form.Item label="Название" name="name" rules={[{ required: true, message: 'Введите название' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Описание" name="description">
          <Input.TextArea />
        </Form.Item>

        {!editedGoal && (
          <Form.Item name="currency" label="Валюта">
            <Select placeholder="Выберите валюту" options={currenciesOptions} />
          </Form.Item>
        )}

        <Form.Item label={valueLabel} name="value">
          <InputNumber addonAfter={editedGoal && <span>{symbol}</span>} />
        </Form.Item>

        <Form.Item hidden dependencies={['name']}>
          {({ getFieldsValue }) => {
            const values = getFieldsValue();
            const { name } = values;

            return <SubmitHiddenButton onValid={setIsValidForm} validator={() => formValidator(name)} />;
          }}
        </Form.Item>

        {editedGoal && (
          <>
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
          </>
        )}
      </Form>
    </Modal>
  );
};
