import { Spin } from 'antd';
import React from 'react';

import './index.less';

export const MainLoader = () => {
  return (
    <div className="main-loader">
      <Spin tip="Загрузка..." size="large" />
    </div>
  );
};
