import { formatPrice } from '@/utils/formatPrice';
import { formatToHumanDate } from '@/utils/formatToHumanDate';
import { Card as AntCard, Button, DatePicker, Form, Input, InputNumber, List, Select, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';

import { CardModal } from './Modal';
import './index.less';
import { CardItem, CardProps } from './interfaces';

/**
 * Компонент отрисовки cписка расходов / доходов
 */
export const Card: React.FC<CardProps> = ({
  categories,
  type,
  onSave,
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
  const [editedItem, setEditedItem] = useState<CardItem | null>(null);

  const handleFinish = (form: { date: Dayjs; categoryId: string; value: number; comment: string }) => {
    const body = {
      date: form.date,
      categoryId: form.categoryId,
      value: form.value,
      comment: form.comment,
    };
    onSave(type, body);
  };

  const handleItemClick = (item: CardItem) => {
    setEditedItem(item);
  };

  const handleModalCancel = () => {
    setEditedItem(null);
  };

  return (
    <>
      <AntCard title={title} className="card">
        <Form className="card__form" onFinish={handleFinish}>
          <div className="card__form-control">
            {isShowDate && (
              <Form.Item name="date" rules={[{ required: true, message: 'Выберите дату' }]}>
                <DatePicker picker="date" format="DD.MM.YYYY" />
              </Form.Item>
            )}

            <Form.Item name="categoryId" rules={[{ required: true, message: 'Выберите категорию' }]}>
              <Select>
                {categories.map((category) => (
                  <Select.Option value={category.id} key={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="value" rules={[{ required: true, message: 'Введите сумму' }]}>
              <InputNumber addonAfter={<span>₽</span>}></InputNumber>
            </Form.Item>
          </div>

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

                <Typography.Text>{item.category.name}</Typography.Text>
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
      />
    </>
  );
};

export * from './interfaces';
export * from './constants';
