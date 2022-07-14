import { Balance } from '@/components/Balance';
import { MENU } from '@/constants/menu';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { MenuItem } from './MenuItem';
import './index.less';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <ul className="sidebar__menu">
        {MENU.map((item) => (
          <MenuItem key={item.to} {...item} isActive={item.to === location.pathname} />
        ))}
      </ul>

      <Balance />
    </aside>
  );
};
