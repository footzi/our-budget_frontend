import { useCallback, useLayoutEffect, useState } from 'react';

import { MatchedMediaResult, MediaQueryProps } from './interfaces';

export const useMatchMedia = (queries: MediaQueryProps): MatchedMediaResult => {
  const mediaQueryLists = queries.map((q) => window.matchMedia(q));

  const getValue = useCallback((): MatchedMediaResult => {
    return mediaQueryLists.map((mql) => mql.matches);
  }, [mediaQueryLists]);

  const [value, setValue] = useState(getValue);

  useLayoutEffect(() => {
    const handler = (): void => setValue(getValue);
    mediaQueryLists.forEach((mql) => mql.addListener(handler));

    return (): void => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
  }, [getValue, mediaQueryLists]);

  return value;
};
