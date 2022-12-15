import { useLogout } from '@/hooks/useLogout';
import { useAppSelector } from '@/store';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { Avatar, Popover } from 'antd';
import React from 'react';

import { Content } from './Content';
import './index.less';

export const UserWidget = () => {
  const { logout, isLoading } = useLogout();
  const { user } = useAppSelector();

  if (!user) {
    return null;
  }

  return (
    <Popover
      placement="bottomRight"
      content={<Content logout={logout} user={user} isLoading={isLoading} />}
      trigger="click"
      className="user-widget">
      <button>
        <Avatar icon={<UserOutlined />} />
      </button>
    </Popover>
  );
};
