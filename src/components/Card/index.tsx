import './index.less';
import React from 'react';
import { Button, Card as AntCard, Form, InputNumber, List, Select, Typography } from 'antd';
import { CardProps } from './interfaces';

export const Card: React.FC<CardProps> = ({ categories, onSave, isLoadingSave, list, title, total }) => {
  const onFinish = (form: { categoryId: string; value: number }) => {
    onSave(form.categoryId, form.value);
  };

  return (
    <AntCard title={title} className="card">
      <Form className="card__form" onFinish={onFinish}>
        <div className="card__form-control">
          <Form.Item name="categoryId" rules={[{ required: true, message: 'Выберите категорию' }]}>
            <Select>
              {categories.map((category) => (
                <Select.Option value={category.id} key={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="value" rules={[{ required: true, message: 'Выберите сумму' }]}>
            <InputNumber addonAfter={<span>₽</span>}></InputNumber>
          </Form.Item>
        </div>
        <Form.Item>
          <Button htmlType="submit" loading={isLoadingSave}>
            Добавить
          </Button>
        </Form.Item>
      </Form>

      <List
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text>{item.category.name}</Typography.Text>
            <Typography.Text> {item.value} ₽</Typography.Text>
          </List.Item>
        )}
      />

      <div className="card__sum">
        <Typography.Title level={4}>Итого</Typography.Title>
        <Typography.Title level={4} type="success">
          {total} ₽
        </Typography.Title>
      </div>
    </AntCard>
  );
};
