import { useAppSelector } from '@/store';
import { formatPrice } from '@/utils/formatPrice';
import { Card, Typography } from 'antd';
import React from 'react';

import './index.less';

export const Balance: React.FC = () => {
  const { balance } = useAppSelector();

  const value = balance?.value?.common ?? 0;

  return (
    <Card className="balance">
      <Typography.Title level={5}>Текущий баланс:</Typography.Title>
      <Typography.Title level={4}>{formatPrice(value)}</Typography.Title>
    </Card>
  );
};
