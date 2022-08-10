import { Coins } from '@/components/Icons/Coins';
import { ListCoins } from '@/components/Icons/ListCoins';
import { ON_BOARDING_STEPS } from '@/constants/index';
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
    onBoardingsStep: ON_BOARDING_STEPS.PLANS,
  },
  {
    to: ROUTES.FACTS,
    name: 'Факт',
    icon: <EditOutlined />,
    onBoardingsStep: ON_BOARDING_STEPS.FACTS,
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
    onBoardingsStep: ON_BOARDING_STEPS.CATEGORIES,
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
    onBoardingsStep: ON_BOARDING_STEPS.BALANCE,
  },
];
