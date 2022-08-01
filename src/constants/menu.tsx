import { Coins } from '@/components/Icons/Coins';
import { ListCoins } from '@/components/Icons/ListCoins';
import { ROUTES } from '@/constants/routes';
import AimOutlined from '@ant-design/icons/AimOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import LineChartOutlined from '@ant-design/icons/LineChartOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined';
import React from 'react';

export const MENU = [
  {
    to: ROUTES.MAIN,
    name: 'Аналитика',
    icon: <LineChartOutlined />,
  },
  {
    to: ROUTES.PLANS,
    name: 'План',
    icon: <AimOutlined />,
  },
  {
    to: ROUTES.FACTS,
    name: 'Факт',
    icon: <EditOutlined />,
  },
  {
    to: ROUTES.SAVINGS,
    name: 'Копилки',
    icon: <Coins />,
    isBorder: true,
  },
  {
    to: ROUTES.CATEGORIES,
    name: 'Список категорий',
    icon: <UnorderedListOutlined />,
  },
  {
    to: ROUTES.SAVING_GOALS,
    name: 'Список копилок',
    icon: <ListCoins />,
    isBorder: true,
  },
  {
    to: ROUTES.SETTINGS,
    name: 'Настройки',
    icon: <SettingOutlined />,
  },
];
