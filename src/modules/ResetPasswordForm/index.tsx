import { WelcomeHamster } from '@/components/Images/WelcomeHamster';
import { Section } from '@/components/Section';
import { EMAIL, ROUTES } from '@/constants';
import { Button, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.less';

/**
 * Форма сброса пароля
 */
const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => navigate(ROUTES.LOGIN);

  return (
    <div className="reset-password-form">
      <div className="reset-password-form__content">
        <Section className="reset-password-form__section">
          <WelcomeHamster className="reset-password-form__image" />
          <Typography.Title level={4} className="reset-password-form__title">
            Сброс пароля
          </Typography.Title>

          <Typography.Text>
            Данный раздел в разработке, по вопросам восстановления пароля вы можете обратиться на нашу почту{' '}
            <Typography.Link href={`mailto:${EMAIL}`}>{EMAIL}</Typography.Link>
          </Typography.Text>

          <Button type="primary" className="reset-password-form__login" onClick={handleLogin}>
            Войти
          </Button>
        </Section>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
