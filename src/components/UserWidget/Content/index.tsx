import { ROUTES } from '@/constants/routes';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import MoneyCollectOutlined from '@ant-design/icons/MoneyCollectOutlined';
import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import './index.less';
import { ContentProps } from './interfaces';

export const Content: React.FC<ContentProps> = ({ logout, isLoading }) => {
  return (
    <div className="user-widget-content">
      <Link to={ROUTES.MAIN}>
        <Button type="link" icon={<HomeOutlined />} className="user-widget-content__item">
          Главная
        </Button>
      </Link>

      <Link to={ROUTES.SETTINGS}>
        <Button type="link" icon={<UnorderedListOutlined />} className="user-widget-content__item">
          Категории
        </Button>
      </Link>

      <Link to={ROUTES.SETTINGS + '/savingGoal'}>
        <Button type="link" icon={<MoneyCollectOutlined />} className="user-widget-content__item">
          Копилки
        </Button>
      </Link>

      <Link to={ROUTES.SETTINGS + '/profile'}>
        <Button type="link" icon={<UserOutlined />} className="user-widget-content__item">
          Профиль
        </Button>
      </Link>

      <Button
        type="link"
        loading={isLoading}
        onClick={logout}
        icon={<LogoutOutlined />}
        className="user-widget-content__bottom">
        Выйти
      </Button>
    </div>
  );
};
