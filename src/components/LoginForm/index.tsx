import LockOutlined from '@ant-design/icons/LockOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import React from 'react';

import { useLogin } from './hooks/useLogin';
import './index.less';

/**
 * Форма авторизации
 */
export const LoginForm: React.FC = () => {
  const { login, isLoading } = useLogin();

  const onFinish = (form: { login: string; password: string }) => {
    const replacedLogin = form.login.replace(/[- )(]/g, '');

    login(replacedLogin, form.password);
  };

  return (
    <Row className="login-form">
      <Col span={6}>
        <Card>
          <Typography.Title level={3}>Авторизация</Typography.Title>

          <Form name="loginForm" layout="vertical" autoComplete="off" onFinish={onFinish}>
            <Form.Item
              label="Логин"
              name="login"
              rules={[
                { required: true, message: 'Введите логин' },
                // { message: 'Логин введен не верно', pattern: REGEXP_LOGIN },
              ]}>
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Войти
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
