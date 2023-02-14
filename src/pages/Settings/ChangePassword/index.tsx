import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Section } from '@/components/Section';
import { minSizePasswordValidator } from '@/utils/minSizePasswordValidator';
import { passwordValidator } from '@/utils/passwordValidator';
import { Button, Form, Input, Typography } from 'antd';
import React from 'react';

import { useChangePassword } from './hooks/useChangePassword';
import { ChangePasswordForm } from './interfaces';
import { formValidator } from './utils/formValidator';

export const ChangePassword: React.FC = () => {
  const { changePassword, isLoading } = useChangePassword();

  const handleSubmit = (body: ChangePasswordForm) => {
    changePassword(body);
  };

  return (
    <ErrorBoundary>
      <Section title="Смена пароля" className="profile__section">
        <div className="profile__content">
          {/*form={form} onFinish={handleSubmit}*/}
          <Form onFinish={handleSubmit}>
            <div className="profile__row">
              <Typography.Text strong>Старый пароль</Typography.Text>
              <div className="profile__row-value">
                <Form.Item name="oldPassword" rules={[{ required: true, message: 'Введите старый пароль' }]}>
                  <Input.Password />
                </Form.Item>
              </div>
            </div>

            <div className="profile__row">
              <Typography.Text strong>Новый пароль</Typography.Text>
              <div className="profile__row-value">
                <Form.Item
                  name="newPassword"
                  rules={[
                    () => ({
                      validator: (_, value: string) => minSizePasswordValidator(value),
                    }),
                  ]}>
                  <Input.Password />
                </Form.Item>
              </div>
            </div>

            <div className="profile__row">
              <Typography.Text strong>Повторите новый пароль</Typography.Text>
              <div className="profile__row-value">
                <Form.Item
                  name="newPassword2"
                  rules={[
                    { required: true, message: 'Повторите ввод пароля' },
                    ({ getFieldValue }) => ({
                      validator: (_, value: string) => passwordValidator(getFieldValue('newPassword'), value),
                    }),
                  ]}>
                  <Input.Password />
                </Form.Item>

                <Form.Item shouldUpdate>
                  {({ getFieldsValue }) => {
                    const values = getFieldsValue();
                    const isValid = formValidator(values);

                    return (
                      <Button
                        disabled={!isValid}
                        className="profile__submit"
                        loading={isLoading}
                        type="primary"
                        htmlType="submit">
                        Изменить
                      </Button>
                    );
                  }}
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </Section>
    </ErrorBoundary>
  );
};
