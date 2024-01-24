import { Graph } from '@/components/Icons/Graph';
import { List } from '@/components/Icons/List';
import { ListCoins } from '@/components/Icons/ListCoins';
import { Pencil } from '@/components/Icons/Pencil';
import { Savings } from '@/components/Icons/Savings';
import { Settings } from '@/components/Icons/Settings';
import { Target } from '@/components/Icons/Target';
import { ON_BOARDING_STEPS } from '@/constants/index';
import { ROUTES } from '@/constants/routes';
import React from 'react';

export const MENU = [
  {
    to: ROUTES.MAIN,
    name: 'Аналитика',
    icon: <Graph />,
  },
  {
    to: ROUTES.PLANS,
    name: 'План',
    icon: <Target />,
    onBoardingsStep: ON_BOARDING_STEPS.PLANS,
  },
  {
    to: ROUTES.FACTS,
    name: 'Факт',
    icon: <Pencil />,
    onBoardingsStep: ON_BOARDING_STEPS.FACTS,
  },
  {
    to: ROUTES.SAVINGS,
    name: 'Копилки',
    icon: <Savings />,
    isBorder: true,
  },
  {
    to: ROUTES.CATEGORIES,
    name: 'Список категорий',
    icon: <List />,
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
    icon: <Settings />,
    onBoardingsStep: ON_BOARDING_STEPS.BALANCE,
  },
  {
    to: ROUTES.BALANCE_HISTORY,
    name: 'История изменения баланса',
    isSkip: true,
  },
];
