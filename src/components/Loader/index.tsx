import { Spin } from 'antd';
import React from 'react';
import cn from 'classnames';

import './index.less';

export const Loader: React.FC<{ isInner?: boolean }> = ({ isInner }) => {
  const className = cn('loader', {
    ['loader_is-inner']: isInner,
  });

  return (
    <div className={className}>
      <Spin tip="Загрузка..." size="large" />
    </div>
  );
};
