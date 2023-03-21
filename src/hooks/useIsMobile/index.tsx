import { useMatchMedia } from '@/hooks/useMatchMedia';

export const useIsMobile = () => {
  const [isMobile] = useMatchMedia(['(max-width: 575px)']);

  return isMobile;
};
