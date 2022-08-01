import cx from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import './index.less';
import { MenuItemProps } from './interfaces';

export const MenuItem: React.FC<MenuItemProps> = ({ icon, to, name, isActive, isBorder }) => {
  const cxLink = cx('menu-item', {
    ['is-active']: isActive,
  });

  return (
    <li>
      <Link to={to} className={cxLink}>
        {icon}
        <span>{name}</span>
      </Link>
      {isBorder && <div className="menu-item__border" />}
    </li>
  );
};
