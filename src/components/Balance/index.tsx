import { useAppContext } from '@/context';
import { formatPrice } from '@/utils/formatPrice';
import { Card, Typography } from 'antd';
import React from 'react';

import './index.less';

export const Balance: React.FC = () => {
  const { balance } = useAppContext();

  if (!balance?.value?.common) {
    return null;
  }

  return (
    <Card className="balance">
      <Typography.Title level={5}>Текущий баланс:</Typography.Title>
      <Typography.Title level={4}>{formatPrice(balance.value.common)}</Typography.Title>
    </Card>
  );
};
