import { Section } from '@/components/Section';
import { ROUTES } from '@/constants/routes';
import LockOutlined from '@ant-design/icons/LockOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogin } from './hooks/useLogin';
import './index.less';

/**
 * Форма авторизации
 */
export const LoginForm: React.FC = () => {
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  const onFinish = (form: { login: string; password: string }) => {
    const replacedLogin = form.login.replace(/[- )(]/g, '');

    login(replacedLogin, form.password);
  };

  const handleSignUp = () => navigate(ROUTES.SIGNUP);

  return (
    <div className="login-form">
      <Section className="login-form__content">
        <div className="login-form__title">
          <Typography.Title level={3}>Авторизация</Typography.Title>
          <Button type="link" onClick={handleSignUp}>
            Регистрация
          </Button>
        </div>

        <Form name="loginForm" layout="vertical" autoComplete="off" onFinish={onFinish}>
          <Form.Item label="Логин" name="login" rules={[{ required: true, message: 'Введите логин' }]}>
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
      </Section>
    </div>
  );
};
