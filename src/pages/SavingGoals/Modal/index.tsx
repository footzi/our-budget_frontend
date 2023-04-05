import { SubmitHiddenButton } from '@/components/SubmitHiddenButton';
import { CURRENCIES_TYPE, DEFAULT_CURRENCY } from '@/constants';
import { getCurrencyInfo } from '@/utils/getCurrencyInfo';
import { getOptionsCurrencies } from '@/utils/getOptionsCurrencies';
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Select, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useCallback, useEffect, useState } from 'react';

import './index.less';
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

  const handleSubmit = (form: {
    name: string;
    description: string;
    value: number;
    currency: CURRENCIES_TYPE;
    finishValue?: number;
  }) => {
    const { name, description, value, currency, finishValue } = form;

    if (isLoading) {
      return;
    }

    if (editedGoal?.id) {
      onUpdate({ name, description, value, id: editedGoal.id, currency: editedGoal.currency, finishValue });
    } else {
      onAdd({ name, description, value, currency, finishValue });
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
      const { name, description, value, finishValue } = editedGoal;

      form.setFieldsValue({
        name,
        description,
        value,
        finishValue,
      });

      const isValidForm = formValidator(name);
      setIsValidForm(isValidForm);
    }
  }, [editedGoal, form, formValidator]);

  const title = editedGoal ? `Редактирование копилки "${editedGoal.name}"` : 'Новая копилка';
  const { symbol } = getCurrencyInfo(editedGoal?.currency);

  const currenciesOptions = getOptionsCurrencies(currencies);

  return (
    <Modal
      open={isShow}
      onOk={handleOk}
      footer={
        <>
          {editedGoal && (
            <Popconfirm
              okText="Да"
              cancelText="Отмена"
              title="Вы уверены, что хотите удалить эту копилку?"
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
      destroyOnClose
      className="saving-goal-modal">
      <Form
        form={form}
        onFinish={handleSubmit}
        preserve={false}
        initialValues={{ currency: DEFAULT_CURRENCY }}
        className="saving-goal-modal__form">
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Введите название' }]}
          className="saving-goal-modal__form-name">
          <Input placeholder="Название" />
        </Form.Item>

        <Form.Item
          name="finishValue"
          colon={false}
          label={
            <Typography.Text>
              Сколько <Typography.Text strong>хочу накопить?</Typography.Text>
            </Typography.Text>
          }
          className="saving-goal-modal__form-price">
          <InputNumber
            decimalSeparator={','}
            placeholder="Сумма"
            addonAfter={
              editedGoal ? (
                symbol
              ) : (
                <Form.Item name="currency" noStyle>
                  <Select options={currenciesOptions} />
                </Form.Item>
              )
            }
          />
        </Form.Item>

        <Form.Item
          name="value"
          colon={false}
          label={
            <Typography.Text>
              Сколько <Typography.Text strong>уже накоплено?</Typography.Text>
            </Typography.Text>
          }
          className="saving-goal-modal__form-price">
          <InputNumber
            decimalSeparator={','}
            placeholder="Сумма"
            addonAfter={
              editedGoal ? (
                symbol
              ) : (
                <Form.Item name="currency" noStyle>
                  <Select options={currenciesOptions} />
                </Form.Item>
              )
            }
          />
        </Form.Item>

        <Form.Item name="description" className="saving-goal-modal__form-description">
          <Input.TextArea placeholder="Описание" />
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
