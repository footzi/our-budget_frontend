import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useAnimationIn = () => {
  const [oldPathname, setOldPathname] = useState('');
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setOldPathname(location.pathname);
    }, 300);
  }, [location]);

  return Boolean(location.pathname !== oldPathname);
};
