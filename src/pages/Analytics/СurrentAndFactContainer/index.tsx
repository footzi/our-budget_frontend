import { ErrorBoundary } from '@/components/ErrorBoundary';
import { CURRENCIES_TYPE, DEFAULT_CURRENCY } from '@/constants';
import { CurrentAnalytics } from '@/pages/Analytics/Current';
import { FactsAnalytics } from '@/pages/Analytics/Facts';
import { useAppSelector } from '@/store';
import { Tabs } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';

import { ContentProps } from './interfaces';

const Content: React.FC<ContentProps> = ({ currency }) => {
  return (
    <>
      <div className="analytics__row">
        <ErrorBoundary>
          <CurrentAnalytics currency={currency} />
        </ErrorBoundary>
      </div>
      <div className="analytics__row">
        <ErrorBoundary>
          <FactsAnalytics currency={currency} />
        </ErrorBoundary>
      </div>
    </>
  );
};

export const CurrentAndFactContainer = () => {
  const { user } = useAppSelector();

  const currencies = useMemo(() => user?.currencies ?? [], [user?.currencies]);
  const initialCurrency = currencies[0] ?? DEFAULT_CURRENCY;

  const [currency, setCurrency] = useState<CURRENCIES_TYPE>(initialCurrency);

  const handleChange = useCallback((currency: string) => setCurrency(currency as CURRENCIES_TYPE), []);

  if (currencies.length === 1) {
    return <Content currency={currency} />;
  }

  const items = currencies.map((currencyType) => {
    return {
      label: currencyType,
      key: currencyType,
      children: <Content currency={currency} />,
    };
  });

  return <Tabs items={items} onChange={handleChange} />;
};
