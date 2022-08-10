import { ROUTES } from '@/constants/routes';
import { Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { OnBoardingStepProps } from '../../interfaces';

export const BalanceStep: React.FC<OnBoardingStepProps> = ({ onCloseModal }) => {
  return (
    <>
      <Typography.Title level={2} className="on-boarding__title">
        Думаю, принцип вы поняли:)
      </Typography.Title>
      <Typography.Paragraph type="secondary">
        Планирование вы также можете редактировать и дополнять в любое время.
      </Typography.Paragraph>

      <div className="on-boarding__bottom">
        <Typography.Paragraph>
          Еще одна важная деталь - нужно ввести начальный баланс. <br />
          Это та сумма, которая имеется у вас на текущий момент. <br />
          Ее можно указать в разделе{' '}
          <Link to={ROUTES.SETTINGS} onClick={onCloseModal}>
            Настройки.
          </Link>
        </Typography.Paragraph>
      </div>
    </>
  );
};
