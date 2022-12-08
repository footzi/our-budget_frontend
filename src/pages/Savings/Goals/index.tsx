import { Section } from '@/components/Section';
import { useAppSelector } from '@/store';
import { formatPrice } from '@/utils/formatPrice';
import { Typography } from 'antd';
import React from 'react';

import './index.less';

export const Goals: React.FC = () => {
  const { savingGoals } = useAppSelector();

  const goals = savingGoals.value ?? [];
  const sortedGoals = [...goals].sort((a, b) => (a.order >= b.order ? 1 : -1));

  if (!sortedGoals.length) {
    return null;
  }

  return (
    <div className="saving-goals">
      {sortedGoals.map(({ name, value, currency }) => (
        <Section className="saving-goals__item" key={name}>
          <div>
            <Typography.Text>{name}</Typography.Text>
            <Typography.Title level={4}>{formatPrice(value, currency)}</Typography.Title>
          </div>
        </Section>
      ))}
    </div>
  );
};
