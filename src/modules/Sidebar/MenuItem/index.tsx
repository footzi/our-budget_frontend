import cx from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import './index.less';
import { MenuItemProps } from './interfaces';

export const MenuItem: React.FC<MenuItemProps> = ({ icon, to, name, onClick, isActive, isBorder }) => {
  const cxLink = cx('menu-item', {
    ['is-active']: isActive,
  });

  const handleClick = () => onClick && onClick();

  return (
    <li>
      <Link
        onClick={handleClick}
        to={{
          pathname: to,
        }}
        className={cxLink}>
        {icon && icon}
        <span>{name}</span>
      </Link>
      {isBorder && <div className="menu-item__border" />}
    </li>
  );
};
