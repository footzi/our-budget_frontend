import { ROUTES } from '@/constants/routes';
import { Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { OnBoardingStepProps } from '../../interfaces';

export const FactStep: React.FC<OnBoardingStepProps> = ({ onCloseModal }) => {
  return (
    <>
      <Typography.Title level={2} className="on-boarding__title">
        Мы на финише!
      </Typography.Title>
      <Typography.Paragraph type="secondary">Рассказываю как пользоваться приложением:</Typography.Paragraph>

      <div className="on-boarding__bottom">
        <Typography.Paragraph>
          После выполнения всех предыдущих шагов можно смело
          <br />
          заполнять раздел с фактическими расходами и доходами.
          <br />
          Его можно найти в разделе{' '}
          <Link to={ROUTES.FACTS} onClick={onCloseModal}>
            Факт.
          </Link>
        </Typography.Paragraph>
      </div>
    </>
  );
};
