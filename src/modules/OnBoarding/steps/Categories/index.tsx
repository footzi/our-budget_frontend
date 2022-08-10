import { ROUTES } from '@/constants/routes';
import { Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { OnBoardingStepProps } from '../../interfaces';

export const CategoriesStep: React.FC<OnBoardingStepProps> = ({ onCloseModal }) => {
  return (
    <>
      <Typography.Title level={2} className="on-boarding__title">
        Привет!
      </Typography.Title>
      <Typography.Paragraph type="secondary">Рассказываю как пользоваться приложением:</Typography.Paragraph>

      <div className="on-boarding__bottom">
        <Typography.Paragraph>
          Для начала создайте категории своих расходов и доходов.
          <br />
          Это можно сделать в разделе{' '}
          <Link to={ROUTES.CATEGORIES} onClick={onCloseModal}>
            Список категорий.
          </Link>
        </Typography.Paragraph>
      </div>
    </>
  );
};
