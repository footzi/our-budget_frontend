import { ON_BOARDING_STEPS } from '@/constants';
import { Maybe } from '@/interfaces';

export interface UseOnBoardingStepResult {
  step: Maybe<ON_BOARDING_STEPS>;
  update: () => void;
  isVisible: boolean;
}
