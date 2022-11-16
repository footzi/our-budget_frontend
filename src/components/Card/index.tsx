import { NotCategory } from '@/components/Card/NotCategory';
import { CARD_TYPES } from '@/components/Card/constants';
import { Section } from '@/components/Section';
import { FORMAT_UI_SHORT_DATE, SAVING_ACTION_TYPE, SAVING_ACTION_TYPES_LIST } from '@/constants';
import { CURRENCIES_TYPE } from '@/constants';
import { setCardEditedDate, useAppDispatch, useAppSelector } from '@/store';
import { formatPrice } from '@/utils/formatPrice';
import { formatToHumanDate } from '@/utils/formatToHumanDate';
import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined';
import CaretUpOutlined from '@ant-design/icons/CaretUpOutlined';
import { Button, DatePicker, Empty, Form, Input, InputNumber, List, Radio, Select, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import cx from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { CardModal } from './Modal';
import './index.less';
import { CardAddBalancesBody, CardAddSavingBody, CardItem, CardProps } from './interfaces';
import { getInitialDate } from './utils/getInitialDate';
import { getOptionsCurrencies } from './utils/getOptionsCurrencies';

/**
 * Компонент отрисовки списка расходов / доходов
 */
export const Card: React.FC<CardProps> = ({
  categories,
  currencies,
  savingGoals,
  type,
  selectedDate,
  onAdd,
  onUpdate,
  onDelete,
  isLoadingSave,
  isLoadingDelete,
  list,
  title,
  total,
  isLoadingUpdate,
}) => {
  const [form] = useForm();
  const [editedItem, setEditedItem] = useState<CardItem | null>(null);

  const { cardEditedDates } = useAppSelector();
  const dispatch = useAppDispatch();

  const editedDate = cardEditedDates && cardEditedDates[type];

  const handleFinish = useCallback(
    (formBody: {
      date: Dayjs;
      categoryId?: string;
      value: number;
      comment: string;
      goalId?: number;
      actionType?: SAVING_ACTION_TYPE;
      currency: CURRENCIES_TYPE;
    }) => {
      if (isLoadingSave) {
        return;
      }

      const { date, categoryId, value, comment, goalId, actionType, currency } = formBody;

      // Сохранение доходов / расходов
      if (categoryId) {
        const body: CardAddBalancesBody = {
          date,
          categoryId,
          value,
          comment,
          currency,
        };

        onAdd(type, body);
      }

      // Сохранение копилки
      if (goalId && actionType) {
        const body: CardAddSavingBody = {
          date,
          goalId,
          actionType,
          value,
          comment,
          currency,
        };

        onAdd(type, body);
      }

      setEditedItem(null);

      form.setFieldsValue({
        comment: '',
        value: '',
      });
    },
    [form, isLoadingSave, onAdd, type]
  );

  const handleItemClick = useCallback((item: CardItem) => setEditedItem(item), [setEditedItem]);

  const handleModalCancel = useCallback(() => setEditedItem(null), [setEditedItem]);

  const handleChangeDate = useCallback(
    //@ts-ignore
    //@todo исправить типы Moment
    (event) => {
      dispatch(
        setCardEditedDate({
          [type]: dayjs(event).toString(),
        })
      );
    },
    [dispatch, type]
  );

  const currenciesOptions = useMemo(() => getOptionsCurrencies(currencies), [currencies]);

  useEffect(() => {
    const date = getInitialDate(selectedDate, editedDate);

    form.setFieldsValue({
      date,
      currency: currencies && currencies[0],
      actionType: SAVING_ACTION_TYPES_LIST[0].type,
      categoryId: categories && categories.length > 0 ? categories[0].id : null,
      goalId: savingGoals && savingGoals.length > 0 ? savingGoals[0].id : null,
    });
  }, [form, categories, savingGoals, selectedDate, editedDate, currencies]);

  useEffect(() => {
    if (selectedDate && editedDate) {
      dispatch(setCardEditedDate(null));
    }
  }, [selectedDate, editedDate, dispatch]);

  const isShowDate =
    type === CARD_TYPES.INCOME_FACT || type === CARD_TYPES.SAVINGS_FACT || type === CARD_TYPES.EXPENSE_FACT;

  const isShowNotContent = (categories && !categories.length) || (savingGoals && !savingGoals.length);

  const cxCard = cx('card', {
    ['card_savings-layout']: type === CARD_TYPES.SAVINGS_PLAN || type === CARD_TYPES.SAVINGS_FACT,
  });

  const cxTotalValue = cx('card__sum-value', {
    ['card__sum-value_positive']: total > 0,
  });

  if (isShowNotContent) {
    return (
      <Section title={title}>
        <NotCategory type={type} />
      </Section>
    );
  }

  return (
    <>
      <Section title={title} className={cxCard}>
        <Form className="card__form" onFinish={handleFinish} form={form} layout="vertical">
          {isShowDate && (
            <Form.Item
              name="date"
              rules={[{ required: true, message: 'Выберите дату' }]}
              className="card__form-date-picker">
              <DatePicker picker="date" format={FORMAT_UI_SHORT_DATE} allowClear={false} onChange={handleChangeDate} />
            </Form.Item>
          )}

          {categories && categories?.length > 0 && (
            <Form.Item
              name="categoryId"
              rules={[{ required: true, message: 'Выберите категорию' }]}
              className="card__form-select">
              <Select>
                {categories.map((category) => (
                  <Select.Option value={category.id} key={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {savingGoals && savingGoals?.length > 0 && (
            <Form.Item
              name="goalId"
              rules={[{ required: true, message: 'Выберите копилку' }]}
              className="card__form-select">
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
              className="card__form-radio">
              <Radio.Group>
                <Radio value={SAVING_ACTION_TYPES_LIST[0].type}>{SAVING_ACTION_TYPES_LIST[0].text}</Radio>
                <Radio value={SAVING_ACTION_TYPES_LIST[1].type}>{SAVING_ACTION_TYPES_LIST[1].text}</Radio>
              </Radio.Group>
            </Form.Item>
          )}

          <div className="card__form-price-container">
            <Form.Item name="value" rules={[{ required: true, message: 'Введите сумму' }]} className="card__form-price">
              <InputNumber />
            </Form.Item>

            <Form.Item name="currency" className="card__form-currency">
              <Select options={currenciesOptions} />
            </Form.Item>
          </div>

          <Form.Item name="comment" className="card__form-comment">
            <Input.TextArea placeholder="Комментарий" />
          </Form.Item>

          <Form.Item dependencies={['value', 'date']} className="card__form-button">
            {({ getFieldsValue }) => {
              const values = getFieldsValue();
              const isValid = values.value && (isShowDate ? values.date : true);

              return (
                <Button htmlType="submit" loading={isLoadingSave} disabled={!isValid} type="primary">
                  Добавить
                </Button>
              );
            }}
          </Form.Item>
        </Form>

        <List
          locale={{ emptyText: <Empty description="Записи отсутствуют" /> }}
          dataSource={list}
          renderItem={(item) => (
            <List.Item onClick={() => handleItemClick(item)} className="card__list-item">
              <div className="card__list-item-row">
                {isShowDate && (
                  <Typography.Text className="card__list-item-date" strong>
                    {formatToHumanDate(item.date)}
                  </Typography.Text>
                )}

                {'category' in item && <Typography.Text>{item.category.name}</Typography.Text>}

                {'goal' in item && <Typography.Text>{item.goal.name}</Typography.Text>}

                {'actionType' in item && (
                  <div
                    className={cx('card__list-item-action-type', {
                      'card__list-item-action-type_income': item.actionType === SAVING_ACTION_TYPE.INCOME,
                    })}>
                    {item.actionType === SAVING_ACTION_TYPE.INCOME ? <CaretDownOutlined /> : <CaretUpOutlined />}
                  </div>
                )}

                <Typography.Text className="card__list-item-value">{formatPrice(item.value)}</Typography.Text>
              </div>

              {item.comment && (
                <Typography.Paragraph type="secondary" className="card__list-item-comment">
                  {item.comment}
                </Typography.Paragraph>
              )}
            </List.Item>
          )}
        />

        {total !== 0 && (
          <div className="card__sum">
            <Typography.Title level={4}>Итого</Typography.Title>
            <Typography.Title level={4} className={cxTotalValue}>
              {formatPrice(total)}
            </Typography.Title>
          </div>
        )}
      </Section>

      <CardModal
        item={editedItem}
        type={type}
        onCancel={handleModalCancel}
        onSubmit={onUpdate}
        onDelete={onDelete}
        isShowDate={isShowDate ?? false}
        isLoadingUpdate={isLoadingUpdate}
        isLoadingDelete={isLoadingDelete}
        categories={categories}
        savingGoals={savingGoals}
      />
    </>
  );
};

export * from './interfaces';
export * from './constants';
