import { SubmitHiddenButton } from '@/components/SubmitHiddenButton';
import { OPTIONS_CURRENCIES } from '@/constants';
import { ProfileEditableValue } from '@/pages/Settings/interfaces';
import { Form, Input, InputNumber, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useCallback, useEffect, useState } from 'react';

import { PROFILE_ITEM_TYPES } from '../constants';
import { ProfileModalProps } from './interfaces';

export const ProfileModal: React.FC<ProfileModalProps> = ({ item, onCancel, onSubmit, isLoading }) => {
  const [form] = useForm();

  const [isValidForm, setIsValidForm] = useState(false);

  const formValidator = useCallback((value: ProfileEditableValue): boolean => {
    if (Array.isArray(value)) {
      return Boolean(value.length);
    }
    return Boolean(value);
  }, []);

  const handleOk = useCallback(() => form.submit(), [form]);

  const handleSubmit = useCallback(
    async (form: { value: ProfileEditableValue }) => {
      if (item) {
        await onSubmit(form.value, item.type);
      }

      onCancel();
    },
    [item, onCancel, onSubmit]
  );

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        value: item.value,
      });

      const isValidForm = formValidator(item.value);

      setIsValidForm(isValidForm);
    }
  }, [item, form, formValidator]);

  return (
    <Modal
      open={Boolean(item)}
      onOk={handleOk}
      onCancel={onCancel}
      okButtonProps={{ loading: isLoading, disabled: !isValidForm }}
      title="Редактирование"
      okText="Сохранить"
      cancelText="Закрыть"
      destroyOnClose>
      {item && (
        <Form layout="vertical" form={form} preserve={false} onFinish={handleSubmit}>
          {item.type === PROFILE_ITEM_TYPES.FIRST_NAME && (
            <Form.Item name="value" rules={[{ required: true, message: 'Введите имя' }]} label="Имя:">
              <Input />
            </Form.Item>
          )}

          {item.type === PROFILE_ITEM_TYPES.BALANCE && (
            <Form.Item name="value" rules={[{ required: true, message: 'Введите новый баланс' }]} label="Баланс:">
              <InputNumber />
            </Form.Item>
          )}

          {item.type === PROFILE_ITEM_TYPES.CURRENCY && (
            <Form.Item name="value" rules={[{ required: true, message: 'Выберите валюту' }]} label="Валюты:">
              <Select mode="multiple" placeholder="Выберите валюту" options={OPTIONS_CURRENCIES} />
            </Form.Item>
          )}

          <Form.Item hidden dependencies={['value', 'date', 'currency']}>
            {({ getFieldsValue }) => {
              const values = getFieldsValue();

              return <SubmitHiddenButton onValid={setIsValidForm} validator={() => formValidator(values.value)} />;
            }}
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
