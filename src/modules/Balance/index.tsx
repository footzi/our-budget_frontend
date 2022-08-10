import { useAppSelector } from '@/store';
import { formatPrice } from '@/utils/formatPrice';
import WalletOutlined from '@ant-design/icons/WalletOutlined';
import { Typography } from 'antd';
import React from 'react';

import './index.less';

export const Balance: React.FC = () => {
  const { balance } = useAppSelector();

  const value = balance?.value?.common ?? 0;

  return (
    <div className="balance">
      <WalletOutlined />
      <Typography.Text>Баланс</Typography.Text>
      <Typography.Title level={4}>{formatPrice(value)}</Typography.Title>
    </div>
  );
};
