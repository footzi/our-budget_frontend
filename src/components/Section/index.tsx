import cx from 'classnames';
import React from 'react';

import { PADDING_SIZE } from './constants';
import './index.less';
import { SectionProps } from './interfaces';

export const Section: React.FC<SectionProps> = ({ children, title, className, paddingSize, hideBorder }) => {
  const cxSection = cx('section', className, {
    ['section_padding-small']: paddingSize === PADDING_SIZE.SMALL,
    ['section_padding-large']: paddingSize === PADDING_SIZE.LARGE,
    ['section_hide-border']: hideBorder,
  });

  return (
    <section className={cxSection}>
      {title && <div className="section__title">{title}</div>}
      {children}
    </section>
  );
};

export * from './constants';
