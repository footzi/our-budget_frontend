import { ON_BOARDING_STEPS } from '@/constants';
import { PlansStep } from '@/modules/OnBoarding/steps/Plan';
import { Modal } from 'antd';
import React, { useCallback } from 'react';

import { useOnBoardingStep } from './hooks/useOnBoardingStep';
import './index.less';
import { BalanceStep } from './steps/Balance';
import { CategoriesStep } from './steps/Categories';
import { FactStep } from './steps/Fact';

export const OnBoarding: React.FC = () => {
  const { step, update, isVisible } = useOnBoardingStep();

  const handleCloseModal = useCallback(() => {
    update();
  }, [update]);

  if (!step) {
    return null;
  }

  return (
    <Modal open={isVisible} footer={null} onCancel={handleCloseModal} className="on-boarding" destroyOnClose>
      {
        {
          [ON_BOARDING_STEPS.CATEGORIES]: <CategoriesStep onCloseModal={handleCloseModal} />,
          [ON_BOARDING_STEPS.BALANCE]: <BalanceStep onCloseModal={handleCloseModal} />,
          [ON_BOARDING_STEPS.PLANS]: <PlansStep onCloseModal={handleCloseModal} />,
          [ON_BOARDING_STEPS.FACTS]: <FactStep onCloseModal={handleCloseModal} />,
        }[step]
      }
    </Modal>
  );
};
