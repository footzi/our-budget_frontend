import { CATEGORIES_TYPES, CATEGORIES_TYPES_LIST } from '@/constants';
import { DatePicker, Form, Input, Modal, Select, Switch } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect } from 'react';

import { CategoryModalProps } from './interfaces';

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isShow,
  editedCategory,
  onCreate,
  onUpdate,
  onCancel,
  isLoading,
}) => {
  const [form] = useForm();

  const handleOk = () => {
    form.submit();
  };

  const handleSubmit = (form: { name: string; type: CATEGORIES_TYPES; period: [Dayjs, Dayjs] }) => {
    const { name, type, period } = form;

    if (editedCategory?.id) {
      onUpdate({ name, type, period, id: editedCategory.id });
    } else {
      onCreate({ name, type, period });
    }
  };

  useEffect(() => {
    if (editedCategory) {
      const { name, type, startDate, endDate } = editedCategory;

      form.setFieldsValue({
        name,
        type,
        period: startDate && endDate ? [dayjs(startDate), dayjs(endDate)] : [],
        isCustomPeriod: Boolean(startDate),
      });
    }
  }, [editedCategory, form]);

  return (
    <Modal
      visible={isShow}
      onOk={handleOk}
      okButtonProps={{ loading: isLoading }}
      onCancel={onCancel}
      title="Новая категория"
      okText="Сохранить"
      destroyOnClose
      cancelText="Закрыть">
      <Form layout="vertical" form={form} onFinish={handleSubmit} preserve={false}>
        <Form.Item label="Название" name="name" rules={[{ required: true, message: 'Введите название' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Тип" name="type" rules={[{ required: true, message: 'Выберите тип' }]}>
          <Select>
            {CATEGORIES_TYPES_LIST.map((item) => (
              <Select.Option value={item.type} key={item.type}>
                {item.text}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Временная категория" name="isCustomPeriod" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item dependencies={['isCustomPeriod']}>
          {({ getFieldValue }) => {
            const value = getFieldValue('isCustomPeriod');

            return (
              value && (
                <Form.Item label="Период" name="period" rules={[{ required: true, message: 'Выберите даты' }]}>
                  <DatePicker.RangePicker picker="month" format="MM.YYYY" />
                </Form.Item>
              )
            );
          }}
        </Form.Item>
      </Form>
    </Modal>
  );
};
