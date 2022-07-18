import { CARD_TYPES, CardUpdateBalancesBody, CardUpdateSavingBody } from '@/components/Card';
import { SubmitHiddenButton } from '@/components/SubmitHiddenButton';
import { FORMAT_UI_DATE, SAVING_ACTION_TYPE, SAVING_ACTION_TYPES_LIST } from '@/constants';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';

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

  const [isValidForm, setIsValidForm] = useState(false);

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
    if (item?.id && isValidForm && !isLoadingUpdate && !isLoadingDelete) {
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
      }

      onCancel();
    }
  };

  const handleClickDelete = async () => {
    if (item?.id) {
      await onDelete(type, item.id);
      onCancel();
    }
  };

  const formValidator = useCallback(
    (date: string, value: number): boolean => {
      return (isShowDate ? Boolean(date) : true) && Boolean(value);
    },
    [isShowDate]
  );

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        date: dayjs(item.date),
        categoryId: 'category' in item ? item.category.id : null,
        goalId: 'goal' in item ? item.goal.id : null,
        actionType: 'actionType' in item ? item.actionType : null,
        value: item.value,
        comment: item.comment,
      });

      const isValidForm = formValidator(item.date, item.value);

      setIsValidForm(isValidForm);
    }
  }, [item, form, formValidator]);

  return (
    <Modal
      title="Редактирование"
      visible={Boolean(item)}
      onOk={handleOk}
      onCancel={onCancel}
      className="card-modal"
      okButtonProps={{ loading: isLoadingUpdate, disabled: !isValidForm }}
      okText="Сохранить"
      cancelText="Закрыть"
      destroyOnClose>
      {item && (
        <Form layout="vertical" onFinish={handleSubmit} form={form} preserve={false}>
          {isShowDate && (
            <Form.Item name="date" label="Дата" rules={[{ required: true, message: 'Выберите дату' }]}>
              <DatePicker picker="date" format={FORMAT_UI_DATE} />
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
            <Popconfirm
              okText="Да"
              cancelText="Отмена"
              title="Вы уверены, что хотите удалить?"
              onConfirm={handleClickDelete}>
              <Button danger loading={isLoadingDelete}>
                Удалить
              </Button>
            </Popconfirm>
          </Form.Item>

          <Form.Item hidden dependencies={['value', 'date']}>
            {({ getFieldsValue }) => {
              const values = getFieldsValue();

              return (
                <SubmitHiddenButton
                  onValid={setIsValidForm}
                  validator={() => formValidator(values.date, values.value)}
                />
              );
            }}
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
