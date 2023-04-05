import { HelpIcon } from '@/components/Icons/Help';
import { useIsMobile } from '@/hooks/useIsMobile';
import { LocalStorage } from '@/utils/localStorage';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import { Popover } from 'antd';
import cx from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';

import { CLOSE_DELAY, OPEN_DELAY } from './constants';
import './index.less';
import { HelpHintProps } from './interfaces';

export const HelpHint: React.FC<HelpHintProps> = ({ content, className, localStorageKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const isNeedOpen = !isMobile && localStorageKey && !LocalStorage.get(localStorageKey);
  const placement = isMobile ? 'bottom' : 'right';

  const close = useCallback(() => {
    setIsOpen(false);

    if (localStorageKey) {
      LocalStorage.set(localStorageKey, true);
    }
  }, [localStorageKey]);

  const handleCloseClick = () => close();

  const handleOpenChange = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    if (isNeedOpen) {
      setTimeout(() => {
        setIsOpen(true);
      }, OPEN_DELAY);

      setTimeout(() => {
        close();
      }, CLOSE_DELAY);
    }
  }, [close, isNeedOpen, setIsOpen]);

  const cn = cx('help-hint', {
    [className ? className : '']: !!className,
    'help-hint_is-open': isOpen,
  });

  return (
    <Popover
      content={
        <div className="help-hint__content">
          {content}
          <button className="help-hint__close-button" onClick={handleCloseClick}>
            <CloseOutlined className="help-hint__close-icon" />
          </button>
        </div>
      }
      onOpenChange={handleOpenChange}
      overlayClassName="help-hint__popover"
      placement={placement}
      open={isOpen}>
      <span className={cn}>
        <HelpIcon className="help-hint__icon" />
      </span>
    </Popover>
  );
};
