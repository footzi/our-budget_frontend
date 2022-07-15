import { Section } from '@/components/Section';
import { useAppSelector } from '@/store';
import { formatPrice } from '@/utils/formatPrice';
import { Typography } from 'antd';
import React from 'react';

import './index.less';

export const Goals: React.FC = () => {
  const { savingGoals } = useAppSelector();

  const goals = savingGoals.value ?? [];

  if (!goals.length) {
    return null;
  }

  return (
    <div className="goals">
      {goals.map(({ name, value }) => (
        <Section className="goals__item" key={name}>
          <div>
            <Typography.Text>{name}</Typography.Text>
            <Typography.Title level={4}>{formatPrice(value)}</Typography.Title>
          </div>
        </Section>
      ))}
    </div>
  );
};
