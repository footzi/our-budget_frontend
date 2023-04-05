import { Logo } from '@/components/Images/Logo';
import { MENU } from '@/constants/menu';
import { Balance } from '@/modules/Balance';
import { SidebarProps } from '@/modules/Sidebar/interfaces';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { MenuItem } from './MenuItem';
import './index.less';

export const Sidebar: React.FC<SidebarProps> = ({ onClickMenu }) => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <a href="/" aria-label="Главная страница" className="sidebar__logo">
        <Logo />
      </a>
      <nav className="sidebar__nav">
        <ul className="sidebar__menu">
          {MENU.map((item) => (
            <MenuItem key={item.to} {...item} isActive={item.to === location.pathname} onClick={onClickMenu} />
          ))}
        </ul>
      </nav>

      <Balance onClick={onClickMenu} />
    </aside>
  );
};
