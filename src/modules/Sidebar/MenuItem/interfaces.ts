import React from 'react';

export interface MenuItemProps {
  icon: React.ReactElement;
  to: string;
  name: string;
  onClick?: () => void;
  isActive: boolean;
  isBorder?: boolean;
}
