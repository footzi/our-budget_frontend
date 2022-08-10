import { ROUTES } from '@/constants/routes';
import { Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { OnBoardingStepProps } from '../../interfaces';

export const PlansStep: React.FC<OnBoardingStepProps> = ({ onCloseModal }) => {
  return (
    <>
      <Typography.Title level={2} className="on-boarding__title">
        Отлично!
      </Typography.Title>
      <Typography.Paragraph type="secondary">
        Вы можете создавать и редактировать категории в любое время.
      </Typography.Paragraph>

      <div className="on-boarding__bottom">
        <Typography.Paragraph>
          Теперь нужно создать свой план расходов и доходов на <br />
          ближайший месяц. Это можно сделать в разделе{' '}
          <Link to={ROUTES.PLANS} onClick={onCloseModal}>
            План.
          </Link>
        </Typography.Paragraph>
      </div>
    </>
  );
};
