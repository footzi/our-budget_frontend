// @ts-nocheck
import { PADDING_SIZE, Section } from '@/components/Section';
import { DatePicker } from 'antd';
import React from 'react';

import './index.less';
import { TopDatePickerProps } from './interfaces';

export const TopDatePicker: React.FC<TopDatePickerProps> = ({ onChange, selectedDate }) => {
  return (
    <Section paddingSize={PADDING_SIZE.SMALL}>
      <DatePicker
        onChange={onChange}
        picker="month"
        value={selectedDate}
        format="MMMM YYYY"
        allowClear={false}
        className="top-date-picker"
      />
    </Section>
  );
};
