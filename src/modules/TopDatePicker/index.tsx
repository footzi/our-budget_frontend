// @ts-nocheck
import { PADDING_SIZE, Section } from '@/components/Section';
import { DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import './index.less';
import { TopDatePickerProps } from './interfaces';

export const TopDatePicker: React.FC<TopDatePickerProps> = ({ onChange, selectedDate }) => {
  const [oldPathname, setOldPathname] = useState('');
  const location = useLocation();

  // @todo вынести в хук
  useEffect(() => {
    setTimeout(() => {
      setOldPathname(location.pathname);
    }, 300);
  }, [location]);

  return (
    <CSSTransition timeout={300} in={Boolean(location.pathname !== oldPathname)} className="top-date-picker">
      <Section paddingSize={PADDING_SIZE.SMALL}>
        <DatePicker onChange={onChange} picker="month" value={selectedDate} format="MMMM YYYY" allowClear={false} />
      </Section>
    </CSSTransition>
  );
};
