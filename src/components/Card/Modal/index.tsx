import { CARD_FORM_FIELDS, CARD_TYPES, CardUpdateBalancesBody, CardUpdateSavingBody } from '@/components/Card';
import { SubmitHiddenButton } from '@/components/SubmitHiddenButton';
import { CURRENCIES_TYPE, FORMAT_UI_DATE, SAVING_ACTION_TYPE, SAVING_ACTION_TYPES_LIST } from '@/constants';
import { Saving } from '@/interfaces';
import { getCurrencyInfo } from '@/utils/getCurrencyInfo';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';

import { getCurrencyByGoalId } from '../utils/getCurrencyByGoalId';
import './index.less';
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
      // Для факта берем goalId и actionType из редактируемого айтема
      if (type === CARD_TYPES.SAVINGS_PLAN || type === CARD_TYPES.SAVINGS_FACT) {
        const savingItem = item as Saving;

        const body: CardUpdateSavingBody = {
          id: item.id,
          currency: item.currency,
          date,
          goalId: goalId || savingItem.goal.id,
          actionType: actionType || savingItem.actionType,
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

  const cxDate = classNames('card-modal__date', {
    ['card-modal__date_long']: type === CARD_TYPES.SAVINGS_FACT,
  });

  const cxCategories = classNames('card-modal__categories', {
    ['card-modal__categories_long']: type === CARD_TYPES.EXPENSE_PLAN || type === CARD_TYPES.INCOME_PLAN,
  });

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
      onCancel={onCancel}
      className="card-modal"
      footer={
        <>
          <Popconfirm
            okText="Да"
            cancelText="Отмена"
            title="Вы уверены, что хотите удалить это значение?"
            icon={null}
            onConfirm={handleClickDelete}>
            <Button danger loading={isLoadingDelete}>
              Удалить
            </Button>
          </Popconfirm>

          <Button type="primary" loading={isLoadingUpdate} disabled={!isValidForm} onClick={handleOk}>
            Сохранить
          </Button>
        </>
      }
      destroyOnClose>
      {item && (
        <Form onFinish={handleSubmit} form={form} preserve={false} className="card-modal__form">
          {isShowDate && (
            <Form.Item
              name={CARD_FORM_FIELDS.DATE}
              rules={[{ required: true, message: 'Выберите дату' }]}
              className={cxDate}>
              <DatePicker picker="date" format={FORMAT_UI_DATE} allowClear={false} />
            </Form.Item>
          )}

          {categories && (
            <Form.Item
              name={CARD_FORM_FIELDS.CATEGORY_ID}
              rules={[{ required: true, message: 'Выберите категорию' }]}
              className={cxCategories}>
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
              className="card-modal__saving-goals"
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
              className="card-modal__saving-actions"
              name={CARD_FORM_FIELDS.ACTION_TYPE}
              rules={[{ required: true, message: 'Выберите действие' }]}>
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
                  className="card-modal__price">
                  <InputNumber addonAfter={symbol} placeholder="Сумма" />
                </Form.Item>
              );
            }}
          </Form.Item>

          <Form.Item name={CARD_FORM_FIELDS.COMMENT} className="card-modal__comment">
            <Input.TextArea placeholder="Комментарий" />
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
