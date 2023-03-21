import { LOCAL_STORAGE_ITEMS } from '@/constants';
import React from 'react';

export interface HelpHintProps {
  className?: string;
  content: React.ReactElement;
  title?: string;
  localStorageKey?: LOCAL_STORAGE_ITEMS;
}
