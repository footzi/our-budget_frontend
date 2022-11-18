import { CURRENCIES_TYPE } from '@/constants';
import { useAppSelector } from '@/store';
import { formatPrice } from '@/utils/formatPrice';
import WalletOutlined from '@ant-design/icons/WalletOutlined';
import { Typography } from 'antd';
import React from 'react';

import './index.less';

export const Balance: React.FC = () => {
  const { balance } = useAppSelector();

  const values = balance?.value ?? {};

  return (
    <div className="balance">
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
    </div>
  );
};
