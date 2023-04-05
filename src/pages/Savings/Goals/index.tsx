import { Check } from '@/components/Icons/Check';
import { Target } from '@/components/Icons/Target';
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
      {sortedGoals.map(({ name, value, currency, finishValue }) => (
        <div className="saving-goals__item" key={name}>
          <div className="saving-goals__name" title={name}>
            <span>{name}</span>
          </div>
          <div className="saving-goals__row">
            <Typography.Text className="saving-goals__label">
              <Target className="saving-goals__icon" /> Цель:
            </Typography.Text>

            <Typography.Text>{finishValue ? formatPrice(finishValue, currency) : '-'}</Typography.Text>
          </div>

          <div className="saving-goals__row">
            <Typography.Text className="saving-goals__label">
              <Check className="saving-goals__icon" /> Отложено:
            </Typography.Text>

            <Typography.Title level={4}>{formatPrice(value, currency)}</Typography.Title>
          </div>
        </div>
      ))}
    </div>
  );
};
