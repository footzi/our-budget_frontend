// @ts-nocheck
import { PADDING_SIZE, Section } from '@/components/Section';
import { DatePicker } from 'antd';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { useAnimationIn } from './hooks/useAnimationIn';
import './index.less';
import { TopDatePickerProps } from './interfaces';

export const TopDatePicker: React.FC<TopDatePickerProps> = ({ onChange, selectedDate }) => {
  const isAnimate = useAnimationIn();

  return (
    <CSSTransition timeout={300} in={isAnimate} className="top-date-picker">
      <Section paddingSize={PADDING_SIZE.SMALL}>
        <DatePicker
          onChange={onChange}
          picker="month"
          value={selectedDate}
          format="MMMM YYYY"
          allowClear={false}
          inputReadOnly
        />
      </Section>
    </CSSTransition>
  );
};
