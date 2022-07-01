import { CARD_TYPES, CardUpdateBalancesBody, CardUpdateSavingBody } from '@/components/Card';
import { SAVING_ACTION_TYPE, SAVING_ACTION_TYPES_LIST } from '@/constants';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

import { CardModalProps } from './interfaces';

/**
 * Модальное окно редактирования трат
 */
export const CardModal: React.FC<CardModalProps> = ({
  item,
  type,
  onCancel,
  onSubmit,
  onDelete,
  categories,
  savingGoals,
  isShowDate,
  isShowComment,
  isLoadingUpdate,
  isLoadingDelete,
}) => {
  const [form] = useForm();

  const initialValues = item
    ? {
        date: dayjs(item.date),
        categoryId: 'category' in item ? item.category.id : null,
        goalId: 'goal' in item ? item.goal.id : null,
        actionType: 'actionType' in item ? item.actionType : null,
        value: item.value,
        comment: item.comment,
      }
    : undefined;

  const handleOk = () => {
    form.submit();
  };

  const handleSubmit = async (form: {
    date: Dayjs;
    categoryId?: string;
    value: number;
    comment: string;
    goalId?: number;
    actionType?: SAVING_ACTION_TYPE;
  }) => {
    if (item?.id) {
      const { date, categoryId, value, comment, goalId, actionType } = form;

      if (categoryId) {
        const body: CardUpdateBalancesBody = {
          id: item.id,
          date,
          categoryId,
          value,
          comment,
        };
        await onSubmit(type, body);
      }

      if (goalId && actionType) {
        const body: CardUpdateSavingBody = {
          id: item.id,
          date,
          goalId,
          actionType,
          value,
          comment,
        };

        await onSubmit(type, body);

        onCancel();
      }
    }
  };

  const handleClickDelete = async () => {
    if (item?.id) {
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

          {categories && (
            <Form.Item name="categoryId" label="Категория" rules={[{ required: true, message: 'Выберите категорию' }]}>
              <Select>
                {categories.map((category) => (
                  <Select.Option value={category.id} key={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {savingGoals && (
            <Form.Item name="goalId" label="Копилка" rules={[{ required: true, message: 'Выберите копилку' }]}>
              <Select>
                {savingGoals.map((goal) => (
                  <Select.Option value={goal.id} key={goal.id}>
                    {goal.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {(type === CARD_TYPES.SAVINGS_FACT || type === CARD_TYPES.SAVINGS_PLAN) && (
            <Form.Item
              name="actionType"
              rules={[{ required: true, message: 'Выберите действие' }]}
              label="Что сделать?">
              <Select>
                {SAVING_ACTION_TYPES_LIST.map((type) => (
                  <Select.Option value={type.type} key={type.type}>
                    {type.text}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item name="value" label="Сумма" rules={[{ required: true, message: 'Введите сумму' }]}>
            <InputNumber className="card-modal__price" addonAfter={<span>₽</span>} />
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
