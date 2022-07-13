import { useAppSelector } from '@/store';
import { formatPrice } from '@/utils/formatPrice';
import { Card, Typography } from 'antd';
import React from 'react';

import './index.less';

export const Goals: React.FC = () => {
  const { savingGoals } = useAppSelector();

  const goals = savingGoals.value ?? [];

  return (
    <div className="goals">
      {goals.map(({ name, value }) => (
        <div className="goals__item" key={name}>
          <Typography.Text type="secondary">{name}</Typography.Text>

          <Card className="goals__card">
            <Typography.Title level={4}>{formatPrice(value)}</Typography.Title>
          </Card>
        </div>
      ))}
    </div>
  );
};
