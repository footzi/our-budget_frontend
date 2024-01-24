import { BalanceHistory } from '@/interfaces';
import { BalanceHistoryRender } from '@/pages/BalanceHistory/interfaces';
import { BALANCE_HISTORY_ACTION_TEXT, CURRENCIES } from '@/constants';
import { formatToHumanDate } from '@/utils/formatToHumanDate';

export const transformBalanceHistory = (history: BalanceHistory[]): BalanceHistoryRender[] => {
  return history.map((item) => {
    const currency = CURRENCIES[item.currency];

    return {
      key: item.id,
      date: formatToHumanDate(item.createdAt, true),
      oldValue: `${item.oldValue} ${currency.symbol}`,
      newValue: `${item.newValue} ${currency.symbol}`,
      diff: `${item.newValue - item.oldValue} ${currency.symbol}`,
      action: BALANCE_HISTORY_ACTION_TEXT[item.action],
    };
  });
};
