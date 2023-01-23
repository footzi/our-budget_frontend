import { WelcomeHamster } from '@/components/Images/WelcomeHamster';
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
const LoginForm: React.FC = () => {
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  const onFinish = (form: { login: string; password: string }) => {
    const replacedLogin = form.login.replace(/[- )(]/g, '');

    login(replacedLogin, form.password);
  };

  const handleSignUp = () => navigate(ROUTES.SIGNUP);

  return (
    <div className="login-form">
      <div className="login-form__content">
        <WelcomeHamster className="login-form__image" />
        <Section className="login-form__section">
          <Typography.Title level={4} className="login-form__title">
            Авторизация
          </Typography.Title>

          <Form name="loginForm" layout="vertical" autoComplete="off" onFinish={onFinish}>
            <Form.Item label="E-mail" name="login" rules={[{ required: true, message: 'Введите логин' }]}>
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item noStyle>
              <Button type="primary" htmlType="submit" loading={isLoading} className="login-form__submit">
                Войти
              </Button>
            </Form.Item>
          </Form>

          <Button type="link" onClick={handleSignUp} className="login-form__signup">
            Регистрация
          </Button>
        </Section>
      </div>
    </div>
  );
};

export default LoginForm;
