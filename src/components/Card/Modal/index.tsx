import { CARD_FORM_FIELDS, CARD_TYPES, CardUpdateBalancesBody, CardUpdateSavingBody } from '@/components/Card';
import { SubmitHiddenButton } from '@/components/SubmitHiddenButton';
import { CURRENCIES_TYPE, FORMAT_UI_DATE, SAVING_ACTION_TYPE, SAVING_ACTION_TYPES_LIST } from '@/constants';
import { getCurrencyInfo } from '@/utils/getCurrencyInfo';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';

import { getCurrencyByGoalId } from '../utils/getCurrencyByGoalId';
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
  isLoadingUpdate,
  isLoadingDelete,
}) => {
  const [form] = useForm();

  const [isValidForm, setIsValidForm] = useState(false);

  const handleOk = useCallback(() => form.submit(), [form]);

  const handleSubmit = async (form: {
    date: Dayjs;
    categoryId?: string;
    value: number;
    comment: string;
    currency: CURRENCIES_TYPE;
    goalId?: number;
    actionType?: SAVING_ACTION_TYPE;
  }) => {
    if (item?.id && isValidForm && !isLoadingUpdate && !isLoadingDelete) {
      const { date, categoryId, value, comment, goalId, actionType } = form;

      // План/Факт
      if (categoryId) {
        const body: CardUpdateBalancesBody = {
          id: item.id,
          currency: item.currency,
          date,
          categoryId,
          value,
          comment,
        };

        await onSubmit(type, body);
      }

      // Копилки
      // Для факта actionType === undefined, поэтому устанавливаем дефолтный
      if (goalId) {
        const body: CardUpdateSavingBody = {
          id: item.id,
          currency: item.currency,
          date,
          goalId,
          actionType: actionType || SAVING_ACTION_TYPE.INCOME,
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
        date: dayjs.utc(item.date),
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
      open={Boolean(item)}
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
            <Form.Item name={CARD_FORM_FIELDS.DATE} label="Дата" rules={[{ required: true, message: 'Выберите дату' }]}>
              <DatePicker picker="date" format={FORMAT_UI_DATE} allowClear={false} />
            </Form.Item>
          )}

          {categories && (
            <Form.Item
              name={CARD_FORM_FIELDS.CATEGORY_ID}
              label="Категория"
              rules={[{ required: true, message: 'Выберите категорию' }]}>
              <Select>
                {categories.map((category) => (
                  <Select.Option value={category.id} key={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {savingGoals && type === CARD_TYPES.SAVINGS_PLAN && (
            <Form.Item
              name={CARD_FORM_FIELDS.GOAL_ID}
              label="Копилка"
              rules={[{ required: true, message: 'Выберите копилку' }]}>
              <Select>
                {savingGoals.map((goal) => (
                  <Select.Option value={goal.id} key={goal.id}>
                    {goal.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {type === CARD_TYPES.SAVINGS_PLAN && (
            <Form.Item
              name={CARD_FORM_FIELDS.ACTION_TYPE}
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

          <Form.Item dependencies={[CARD_FORM_FIELDS.GOAL_ID]} noStyle>
            {({ getFieldsValue }) => {
              const values = getFieldsValue();
              const goalId = values?.goalId;
              const currency = goalId ? getCurrencyByGoalId(values?.goalId, savingGoals) : item.currency;
              const symbol = currency ? getCurrencyInfo(currency).symbol : null;

              return (
                <Form.Item
                  name={CARD_FORM_FIELDS.VALUE}
                  rules={[{ required: true, message: 'Введите сумму' }]}
                  label="Сумма">
                  <InputNumber addonAfter={symbol} className="card-modal__price" />
                </Form.Item>
              );
            }}
          </Form.Item>

          <Form.Item name={CARD_FORM_FIELDS.COMMENT} label="Комментарий">
            <Input.TextArea />
          </Form.Item>

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

          <Form.Item hidden dependencies={[CARD_FORM_FIELDS.VALUE, CARD_FORM_FIELDS.DATE]}>
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
