import { useLogout } from '@/components/UserWidget/hooks/useLogout';
import { useAppSelector } from '@/store';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { Avatar, Popover, Typography } from 'antd';
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
      placement="bottom"
      content={<Content logout={logout} user={user} isLoading={isLoading} />}
      trigger="click"
      className="user-widget">
      <Avatar icon={<UserOutlined />} size="small" />
      <Typography.Text className="user-widget__name">{user.firstName}</Typography.Text>
    </Popover>
  );
};
