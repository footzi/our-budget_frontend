import React from 'react';

export interface MenuItemProps {
  icon: React.ReactElement;
  to: string;
  name: string;
  isActive: boolean;
  isBorder?: boolean;
  isOnBoardingsStep: boolean;
}
