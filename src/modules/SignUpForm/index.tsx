import { WelcomeHamster } from '@/components/Images/WelcomeHamster';
import { Section } from '@/components/Section';
import { AGREEMENTS, EMAIL_REGEXP, PRIVACY_POLICY } from '@/constants';
import { ROUTES } from '@/constants/routes';
import { minSizePasswordValidator } from '@/utils/minSizePasswordValidator';
import { passwordValidator } from '@/utils/passwordValidator';
import LockOutlined from '@ant-design/icons/LockOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignUp } from './hooks/useSignUp';
import './index.less';

/**
 * Форма регистрации
 */
const SignUpForm: React.FC = () => {
  const { signUp, isLoading } = useSignUp();
  const navigate = useNavigate();

  const onFinish = (form: {
    login: string;
    password: string;
    password2: string;
    firstName: string;
    agreements: boolean;
  }) => {
    const { login, password, password2, firstName, agreements } = form;
    const replacedLogin = login.replace(/[- )(]/g, '');

    const body = {
      login: replacedLogin,
      password,
      password2,
      firstName,
      agreements,
    };

    signUp(body);
  };

  const handleLogin = () => navigate(ROUTES.LOGIN);

  return (
    <div className="sign-up-form">
      <div className="sign-up-form__content">
        <Section className="sign-up-form__section">
          <WelcomeHamster className="sign-up-form__image" />
          <Typography.Title level={4} className="sign-up-form__title">
            Регистрация
          </Typography.Title>

          <Form name="loginForm" layout="vertical" autoComplete="off" onFinish={onFinish}>
            <Form.Item
              label="E-mail"
              name="login"
              rules={[
                { required: true, message: 'Введите логин' },
                {
                  pattern: new RegExp(EMAIL_REGEXP),
                  message: 'Введите корректный e-mail',
                },
              ]}>
              <Input type="email" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Имя пользователя"
              name="firstName"
              rules={[{ required: true, message: 'Введите имя пользователя' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              dependencies={['password2']}
              rules={[
                () => ({
                  validator: (_, value: string) => minSizePasswordValidator(value),
                }),
              ]}>
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
              label="Повторите пароль"
              name="password2"
              rules={[
                { required: true, message: 'Повторите ввод пароля' },
                ({ getFieldValue }) => ({
                  validator: (_, value: string) => passwordValidator(getFieldValue('password'), value),
                }),
              ]}>
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
              name="agreements"
              valuePropName="checked"
              rules={[{ required: true, message: 'Необходимо принять условия' }]}>
              <Checkbox>
                Я соглашаюсь с{' '}
                <Typography.Link href={PRIVACY_POLICY} target="_blank">
                  политикой конфиденциальности
                </Typography.Link>{' '}
                и{' '}
                <Typography.Link href={AGREEMENTS} target="_blank">
                  обработкой персональных данных
                </Typography.Link>
              </Checkbox>
            </Form.Item>

            <Form.Item noStyle>
              <Button type="primary" htmlType="submit" loading={isLoading} className="sign-up-form__submit">
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Form>

          <Button onClick={handleLogin} className="sign-up-form__login">
            Войти
          </Button>
        </Section>
      </div>
    </div>
  );
};

export default SignUpForm;
