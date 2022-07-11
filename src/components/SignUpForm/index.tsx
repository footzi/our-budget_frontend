import { ROUTES } from '@/constants/routes';
import LockOutlined from '@ant-design/icons/LockOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignUp } from './hooks/useSignUp';
import './index.less';

const passwordValidator = (value1: string, value2: string) => {
  if (!value1 || !value2 || value1 === value2) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error('Пароли должны совпадать'));
  }
};

/**
 * Форма регистрации
 */
export const SignUpForm: React.FC = () => {
  const { signUp, isLoading } = useSignUp();
  const navigate = useNavigate();

  const onFinish = (form: { login: string; password: string; password2: string; firstName: string }) => {
    const { login, password, password2, firstName } = form;
    const replacedLogin = login.replace(/[- )(]/g, '');

    const body = {
      login: replacedLogin,
      password,
      password2,
      firstName,
    };

    signUp(body);
  };

  const handleLogin = () => navigate(ROUTES.LOGIN);

  return (
    <Row className="login-form">
      <Col span={6}>
        <Card>
          <div className="sign-up-form__title">
            <Typography.Title level={3}>Регистрация</Typography.Title>
            <Button type="link" onClick={handleLogin}>
              Авторизация
            </Button>
          </div>

          <Form name="loginForm" layout="vertical" autoComplete="off" onFinish={onFinish}>
            <Form.Item label="Логин" name="login" rules={[{ required: true, message: 'Введите логин' }]}>
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item label="Имя" name="firstName" rules={[{ required: true, message: 'Введите имя' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              dependencies={['password2']}
              rules={[
                { required: true, message: 'Введите пароль' },
                ({ getFieldValue }) => ({
                  validator: (_, value: string) => passwordValidator(getFieldValue('password2'), value),
                }),
              ]}>
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
              label="Повторите пароль"
              name="password2"
              rules={[{ required: true, message: 'Повторите ввод пароля' }]}>
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
