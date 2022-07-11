import { Button } from 'antd';
import React from 'react';

import { ContentProps } from './interfaces';

export const Content: React.FC<ContentProps> = ({ logout, isLoading }) => {
  return (
    <div>
      <Button type="link" loading={isLoading} onClick={logout}>
        Выйти
      </Button>
    </div>
  );
};
