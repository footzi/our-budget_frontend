import { ROUTES } from '@/constants/routes';
import AimOutlined from '@ant-design/icons/AimOutlined';
import CreditCardOutlined from '@ant-design/icons/CreditCardOutlined';
import MoneyCollectOutlined from '@ant-design/icons/MoneyCollectOutlined';
import PieChartOutlined from '@ant-design/icons/PieChartOutlined';
import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import React from 'react';

export const MENU = [
  {
    to: ROUTES.MAIN,
    name: 'Аналитика',
    icon: <PieChartOutlined />,
  },
  {
    to: ROUTES.PLANS,
    name: 'Планирование',
    icon: <AimOutlined />,
  },
  {
    to: ROUTES.FACTS,
    name: 'Факты',
    icon: <CreditCardOutlined />,
  },
  {
    to: ROUTES.SAVINGS,
    name: 'Копилки',
    icon: <MoneyCollectOutlined />,
  },
  {
    to: ROUTES.CATEGORIES,
    name: 'Категории',
    icon: <UnorderedListOutlined />,
  },
  {
    to: ROUTES.SAVING_GOALS,
    name: 'Список копилок',
    icon: <MoneyCollectOutlined />,
  },
  {
    to: ROUTES.PROFILE,
    name: 'Профиль',
    icon: <UserOutlined />,
  },
];
