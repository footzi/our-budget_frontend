import { CARD_TYPES } from '@/components/Card/constants';
import { SAVING_ACTION_TYPE, SAVING_ACTION_TYPES_LIST } from '@/constants';
import { formatPrice } from '@/utils/formatPrice';
import { formatToHumanDate } from '@/utils/formatToHumanDate';
import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined';
import CaretUpOutlined from '@ant-design/icons/CaretUpOutlined';
import { Card as AntCard, Button, DatePicker, Form, Input, InputNumber, List, Select, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import cx from 'classnames';
import { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';

import { CardModal } from './Modal';
import './index.less';
import { CardAddBalancesBody, CardAddSavingBody, CardItem, CardProps } from './interfaces';

/**
 * Компонент отрисовки cписка расходов / доходов
 */
export const Card: React.FC<CardProps> = ({
  categories,
  savingGoals,
  type,
  onAdd,
  onUpdate,
  onDelete,
  isLoadingSave,
  isLoadingDelete,
  list,
  title,
  total,
  isShowDate,
  isShowComment,
  isLoadingUpdate,
}) => {
  const [form] = useForm();
  const [editedItem, setEditedItem] = useState<CardItem | null>(null);

  const handleFinish = (form: {
    date: Dayjs;
    categoryId?: string;
    value: number;
    comment: string;
    goalId?: number;
    actionType?: SAVING_ACTION_TYPE;
  }) => {
    const { date, categoryId, value, comment, goalId, actionType } = form;

    // Сохранение доходов / расходов
    if (categoryId) {
      const body: CardAddBalancesBody = {
        date,
        categoryId,
        value,
        comment,
      };

      return onAdd(type, body);
    }

    // Сохранение копилки
    if (goalId && actionType) {
      const body: CardAddSavingBody = {
        date,
        goalId,
        actionType,
        value,
        comment,
      };

      return onAdd(type, body);
    }
  };

  const handleItemClick = (item: CardItem) => {
    setEditedItem(item);
  };

  const handleModalCancel = () => {
    setEditedItem(null);
  };

  useEffect(() => {
    form.setFieldsValue({
      actionType: SAVING_ACTION_TYPES_LIST[0].type,
      categoryId: categories && categories.length > 0 ? categories[0].id : null,
      goalId: savingGoals && savingGoals.length > 0 ? savingGoals[0].id : null,
    });
  }, [form, categories, savingGoals]);

  return (
    <>
      <AntCard title={title} className="card">
        <Form className="card__form" onFinish={handleFinish} form={form}>
          <div className="card__form-control">
            {isShowDate && (
              <Form.Item name="date" rules={[{ required: true, message: 'Выберите дату' }]}>
                <DatePicker picker="date" format="DD.MM.YYYY" />
              </Form.Item>
            )}

            {categories && categories?.length > 0 && (
              <Form.Item name="categoryId" rules={[{ required: true, message: 'Выберите категорию' }]}>
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
              <Form.Item name="goalId" rules={[{ required: true, message: 'Выберите копилку' }]}>
                <Select>
                  {savingGoals.map((goal) => (
                    <Select.Option value={goal.id} key={goal.id}>
                      {goal.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            <Form.Item name="value" rules={[{ required: true, message: 'Введите сумму' }]}>
              <InputNumber addonAfter={<span>₽</span>}></InputNumber>
            </Form.Item>
          </div>

          {(type === CARD_TYPES.SAVINGS_FACT || type === CARD_TYPES.SAVINGS_PLAN) && (
            <Form.Item name="actionType" rules={[{ required: true, message: 'Выберите действие' }]}>
              <Select>
                {SAVING_ACTION_TYPES_LIST.map((type) => (
                  <Select.Option value={type.type} key={type.type}>
                    {type.text}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {isShowComment && (
            <Form.Item name="comment">
              <Input.TextArea />
            </Form.Item>
          )}

          <Form.Item>
            <Button htmlType="submit" loading={isLoadingSave}>
              Добавить
            </Button>
          </Form.Item>
        </Form>

        <List
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

        {total > 0 && (
          <div className="card__sum">
            <Typography.Title level={4}>Итого</Typography.Title>
            <Typography.Title level={4} type="success">
              {formatPrice(total)}
            </Typography.Title>
          </div>
        )}
      </AntCard>

      <CardModal
        item={editedItem}
        type={type}
        onCancel={handleModalCancel}
        onSubmit={onUpdate}
        onDelete={onDelete}
        isShowComment={isShowComment ?? false}
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
