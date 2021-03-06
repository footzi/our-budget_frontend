import { PropsWithChildren } from 'react';

import { PADDING_SIZE } from './constants';

export interface SectionProps extends PropsWithChildren {
  title?: string;
  className?: string;
  paddingSize?: PADDING_SIZE;
  hideBorder?: boolean;
}
