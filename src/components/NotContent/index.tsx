import { Button, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import './index.less';
import { NotContentProps } from './interfaces';

export const NotContent: React.FC<NotContentProps> = ({ text, to }) => {
  return (
    <div className="not-content">
      <Typography.Title level={5}>{text}</Typography.Title>
      <Link to={to} className="not-content__button">
        <Button>Создать</Button>
      </Link>
    </div>
  );
};
