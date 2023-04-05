import { CURRENCIES_TYPE, ROUTES } from '@/constants';
import { useAppSelector } from '@/store';
import { formatPrice } from '@/utils/formatPrice';
import WalletOutlined from '@ant-design/icons/WalletOutlined';
import { Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.less';
import { BalanceProps } from './interfaces';

export const Balance: React.FC<BalanceProps> = ({ onClick }) => {
  const { balance } = useAppSelector();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.SETTINGS);
    onClick && onClick();
  };

  const values = balance?.value ?? {};

  return (
    <button className="balance" onClick={handleClick}>
      <WalletOutlined />
      <Typography.Text>Баланс</Typography.Text>
      <div className="balance__values">
        {Object.keys(values).map((item) => {
          const currency = item as CURRENCIES_TYPE;
          const value = values[currency];

          return (
            <Typography.Title level={4} key={currency}>
              {formatPrice(value, currency)}
            </Typography.Title>
          );
        })}
      </div>
    </button>
  );
};
