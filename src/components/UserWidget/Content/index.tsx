import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import { Button } from 'antd';
import React from 'react';

import './index.less';
import { ContentProps } from './interfaces';

export const Content: React.FC<ContentProps> = ({ logout, isLoading }) => {
  return (
    <div className="user-widget-content">
      <Button type="link" loading={isLoading} onClick={logout} icon={<LogoutOutlined />}>
        Выйти
      </Button>
    </div>
  );
};
