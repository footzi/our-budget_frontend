import { MENU } from '@/constants/menu';
import { Balance } from '@/modules/Balance';
import { SidebarProps } from '@/modules/Sidebar/interfaces';
import { useAppSelector } from '@/store';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { MenuItem } from './MenuItem';
import './index.less';

export const Sidebar: React.FC<SidebarProps> = ({ onClickMenu }) => {
  const location = useLocation();
  const { onBoardingStep } = useAppSelector();

  return (
    <aside className="sidebar">
      <nav>
        <ul className="sidebar__menu">
          {MENU.map((item) => (
            <MenuItem
              key={item.to}
              {...item}
              isActive={item.to === location.pathname}
              isOnBoardingsStep={item.onBoardingsStep === onBoardingStep}
              onClick={onClickMenu}
            />
          ))}
        </ul>
      </nav>

      <Balance />
    </aside>
  );
};
