import { AddButtonProps } from '@/components/AddButton/interfaces';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Typography } from 'antd';
import React from 'react';

import './index.less';

export const AddButton: React.FC<AddButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="add-button">
      <div className="add-button__icon">
        <PlusOutlined />
      </div>
      <Typography.Text>{children}</Typography.Text>
    </button>
  );
};
