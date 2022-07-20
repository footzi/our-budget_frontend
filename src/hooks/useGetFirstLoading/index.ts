import { useEffect, useState } from 'react';

export const useGetFirstLoading = (items: boolean[]): boolean => {
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  useEffect(() => {
    const isLoading = items.some((item) => item);

    if (!isLoading) {
      setIsFirstLoading(false);
    }
  }, [items]);

  return isFirstLoading;
};
