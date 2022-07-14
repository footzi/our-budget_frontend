import { MENU } from '@/constants/menu';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import './index.less';

export const PageTitle: React.FC = () => {
  const location = useLocation();

  const menuItem = useMemo(() => MENU.find((item) => item.to === location.pathname), [location.pathname]);

  if (!menuItem) {
    return null;
  }
  return (
    <h1 className="page-title">
      {menuItem.icon}
      {menuItem.name}
      <span></span>
      <span></span>
    </h1>
  );
};
