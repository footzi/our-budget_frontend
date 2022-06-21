import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

import './index.less';
import { CardModalProps } from './interfaces';

/**
 * Модальное окно редактирования трат
 */
export const CardModal: React.FC<CardModalProps> = ({
  item,
  type,
  // onOk,
  onCancel,
  onSubmit,
  onDelete,
  categories,
  isShowDate,
  isShowComment,
  isLoadingUpdate,
  isLoadingDelete,
}) => {
  const [form] = useForm();

  const initialValues = item
    ? { date: dayjs(item.date), categoryId: item.category.id, value: item.value, comment: item.comment }
    : undefined;

  const handleOk = () => {
    form.submit();
  };

  const handleSubmit = async (form: { date: Dayjs; categoryId: string; value: number; comment: string }) => {
    if (item) {
      const body = {
        id: item.id,
        date: form.date,
        categoryId: form.categoryId,
        value: form.value,
        comment: form.comment,
      };
      await onSubmit(type, body);
      onCancel();
    }
  };

  const handleClickDelete = async () => {
    if (item) {
      await onDelete(type, item.id);
      onCancel();
    }
  };

  return (
    <Modal
      title="Редактирование"
      visible={Boolean(item)}
      onOk={handleOk}
      onCancel={onCancel}
      className="card-modal"
      okButtonProps={{ loading: isLoadingUpdate }}>
      {item && (
        <Form layout="vertical" initialValues={initialValues} onFinish={handleSubmit} form={form}>
          {isShowDate && (
            <Form.Item name="date" label="Дата" rules={[{ required: true, message: 'Выберите дату' }]}>
              <DatePicker picker="date" />
            </Form.Item>
          )}

          <Form.Item name="categoryId" label="Категория" rules={[{ required: true, message: 'Выберите категорию' }]}>
            <Select>
              {categories.map((category) => (
                <Select.Option value={category.id} key={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="value" label="Сумма" rules={[{ required: true, message: 'Введите сумму' }]}>
            <InputNumber className="card-modal__price" />
          </Form.Item>

          {isShowComment && (
            <Form.Item name="comment" label="Комментарий">
              <Input.TextArea />
            </Form.Item>
          )}

          <Form.Item>
            <Button danger onClick={handleClickDelete} loading={isLoadingDelete}>
              Удалить
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
