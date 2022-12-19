import { getInitialValues } from '@/components/Card/utils/getInitialValues';
import { Section } from '@/components/Section';
import {
  CURRENCIES_TYPE,
  DEFAULT_CURRENCY,
  FORMAT_UI_SHORT_DATE,
  SAVING_ACTION_TYPE,
  SAVING_ACTION_TYPES_LIST,
} from '@/constants';
import { formatPrice } from '@/utils/formatPrice';
import { formatToHumanDate } from '@/utils/formatToHumanDate';
import { getCurrencyInfo } from '@/utils/getCurrencyInfo';
import { getOptionsCurrencies } from '@/utils/getOptionsCurrencies';
import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined';
import CaretUpOutlined from '@ant-design/icons/CaretUpOutlined';
import { Button, DatePicker, Empty, Form, Input, InputNumber, List, Radio, Select, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import cx from 'classnames';
import { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';

import { CardModal } from './Modal';
import { NotCategory } from './NotCategory';
import { CARD_FORM_FIELDS, CARD_TYPES } from './constants';
import './index.less';
import { CardAddBalancesBody, CardAddSavingBody, CardFormField, CardItem, CardProps } from './interfaces';
import { getCurrencyByGoalId } from './utils/getCurrencyByGoalId';
import { saveSelectedValues } from './utils/saveSelectedValues';

/**
 * Компонент отрисовки списка расходов / доходов
 */
const DefaultCard: React.FC<CardProps> = ({
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

  const currenciesOptions = getOptionsCurrencies(currencies);

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
          currency: getCurrencyByGoalId(goalId, savingGoals) ?? DEFAULT_CURRENCY,
        };

        onAdd(type, body);
      }

      setEditedItem(null);

      form.setFieldsValue({
        comment: '',
        value: '',
      });
    },
    [form, isLoadingSave, onAdd, type, savingGoals]
  );

  const handleItemClick = useCallback((item: CardItem) => setEditedItem(item), [setEditedItem]);

  const handleModalCancel = useCallback(() => setEditedItem(null), [setEditedItem]);

  const handleChangeForm = useCallback((body: CardFormField) => saveSelectedValues(type, body), [type]);

  useEffect(() => {
    const { date, currency, categoryId, goalId } = getInitialValues({
      cardType: type,
      currenciesOptions,
      selectedDate,
      categories,
      savingGoals,
    });

    form.setFieldsValue({
      date,
      currency,
      actionType: SAVING_ACTION_TYPES_LIST[0].type,
      categoryId,
      goalId,
    });
  }, [form, categories, savingGoals, currenciesOptions, selectedDate, type]);

  const isShowDate =
    type === CARD_TYPES.INCOME_FACT || type === CARD_TYPES.SAVINGS_FACT || type === CARD_TYPES.EXPENSE_FACT;

  const isShowNotContent = (categories && !categories.length) || (savingGoals && !savingGoals.length);

  const cxCard = cx('card', {
    ['card_savings-layout']: type === CARD_TYPES.SAVINGS_PLAN || type === CARD_TYPES.SAVINGS_FACT,
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
        <Form
          className="card__form"
          onFinish={handleFinish}
          form={form}
          layout="vertical"
          onValuesChange={handleChangeForm}>
          {isShowDate && (
            <Form.Item
              name={CARD_FORM_FIELDS.DATE}
              rules={[{ required: true, message: 'Выберите дату' }]}
              className="card__form-date-picker">
              <DatePicker picker="date" format={FORMAT_UI_SHORT_DATE} allowClear={false} />
            </Form.Item>
          )}

          {categories && categories?.length > 0 && (
            <Form.Item
              name={CARD_FORM_FIELDS.CATEGORY_ID}
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
              name={CARD_FORM_FIELDS.GOAL_ID}
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
              name={CARD_FORM_FIELDS.ACTION_TYPE}
              rules={[{ required: true, message: 'Выберите действие' }]}
              className="card__form-radio">
              <Radio.Group>
                <Radio value={SAVING_ACTION_TYPES_LIST[0].type}>{SAVING_ACTION_TYPES_LIST[0].text}</Radio>
                <Radio value={SAVING_ACTION_TYPES_LIST[1].type}>{SAVING_ACTION_TYPES_LIST[1].text}</Radio>
              </Radio.Group>
            </Form.Item>
          )}

          <div className="card__form-price-container">
            <Form.Item dependencies={[CARD_FORM_FIELDS.GOAL_ID]} noStyle>
              {({ getFieldsValue }) => {
                const values = getFieldsValue();
                const currency = getCurrencyByGoalId(values?.goalId, savingGoals);
                const symbol = currency ? getCurrencyInfo(currency).symbol : null;

                return (
                  <Form.Item
                    className="card__form-price"
                    name={CARD_FORM_FIELDS.VALUE}
                    rules={[{ required: true, message: 'Введите сумму' }]}>
                    <InputNumber addonAfter={symbol} placeholder="Сумма" />
                  </Form.Item>
                );
              }}
            </Form.Item>

            {currenciesOptions.length > 0 && (
              <Form.Item name={CARD_FORM_FIELDS.CURRENCY} className="card__form-currency">
                <Select options={currenciesOptions} />
              </Form.Item>
            )}
          </div>

          <Form.Item name={CARD_FORM_FIELDS.COMMENT} className="card__form-comment">
            <Input.TextArea placeholder="Комментарий" />
          </Form.Item>

          <Form.Item dependencies={[CARD_FORM_FIELDS.VALUE, CARD_FORM_FIELDS.DATE]} className="card__form-button">
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

                <Typography.Text className="card__list-item-value">
                  {formatPrice(item.value, item.currency)}

                  {'actionType' in item && (
                    <div
                      className={cx('card__list-item-action-type', {
                        'card__list-item-action-type_income': item.actionType === SAVING_ACTION_TYPE.INCOME,
                      })}>
                      {item.actionType === SAVING_ACTION_TYPE.INCOME ? <CaretDownOutlined /> : <CaretUpOutlined />}
                    </div>
                  )}
                </Typography.Text>
              </div>

              {item.comment && (
                <Typography.Paragraph type="secondary" className="card__list-item-comment">
                  {item.comment}
                </Typography.Paragraph>
              )}
            </List.Item>
          )}
        />

        {list.length > 0 && (
          <div className="card__sum">
            <Typography.Title level={4}>Итого</Typography.Title>
            <div className="card__sum-values">
              {Object.keys(total).map((key, index) => {
                const currency = key as CURRENCIES_TYPE;
                const value = total[currency];

                const cxTotalValue = cx('card__sum-value', {
                  ['card__sum-value_positive']: value && value > 0,
                });

                return (
                  <React.Fragment key={currency}>
                    {index > 0 ? <span className="card__sum-separator">|</span> : ''}
                    <Typography.Title level={4} className={cxTotalValue}>
                      {formatPrice(value, currency)}
                    </Typography.Title>
                  </React.Fragment>
                );
              })}
            </div>
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

export const Card = React.memo(DefaultCard);
export * from './interfaces';
export * from './constants';
