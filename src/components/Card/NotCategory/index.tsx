import { NotContent } from '@/components/NotContent';
import React from 'react';

import { NotCategoryProps } from './interfaces';
import { getLink } from './utils/getLink';
import { getText } from './utils/getText';

export const NotCategory: React.FC<NotCategoryProps> = ({ type }) => {
  const text = getText(type);
  const to = getLink(type);

  return <NotContent text={text} to={to} />;
};
