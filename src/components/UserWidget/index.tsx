import { PADDING_SIZE, Section } from '@/components/Section';
import { useLogout } from '@/components/UserWidget/hooks/useLogout';
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
    <Section paddingSize={PADDING_SIZE.SMALL}>
      <Popover
        placement="bottomRight"
        content={<Content logout={logout} user={user} isLoading={isLoading} />}
        trigger="click"
        className="user-widget">
        <Avatar icon={<UserOutlined />} />
        <span className="user-widget__name">{user.firstName}</span>
      </Popover>
    </Section>
  );
};
