import { Hamster } from '@/components/Images/Hamster';
import { ROUTES } from '@/constants';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Typography } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { Modal } from './Modal';
import { useHowItWorkModal } from './hooks/useHowItWorkModal';
import './index.less';

export const HowItWork = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isOpen, closeModal, openModal } = useHowItWorkModal();

  const handleClick = () => openModal();

  const isHidden = isMobile && (location.pathname === ROUTES.CATEGORIES || location.pathname === ROUTES.SAVING_GOALS);

  if (isHidden) {
    return null;
  }

  return (
    <div className="how-to-work">
      <Hamster className="how-to-work__image" />
      <svg
        width="13"
        height="12"
        viewBox="0 0 13 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="how-to-work__hand">
        <path
          d="M12.0685 10.4048L5 1.5L1 7L2.50235 10.473C2.70683 10.9457 3.48194 10.8474 3.61558 10.35C3.80891 9.63041 4.09406 8.88953 4.5 8.5C5.44737 7.59094 10.8684 10.697 11.5 11C11.8575 11.1715 12.315 10.7154 12.0685 10.4048Z"
          fill="#6D4BBF"
          stroke="#6D4BBF"
          strokeLinecap="round"
        />
      </svg>

      <Typography.Link onClick={handleClick} className="how-to-work__link">
        Инструкция
      </Typography.Link>

      <Modal isOpen={isOpen} onCancel={closeModal} />
    </div>
  );
};
