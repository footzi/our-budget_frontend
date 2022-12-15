import { useRefetchBalance, useRefetchUser } from '@/api';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Section } from '@/components/Section';
import { CURRENCIES, CURRENCIES_TYPE } from '@/constants';
import { useLogout } from '@/hooks/useLogout';
import { Maybe } from '@/interfaces';
import { useAppSelector } from '@/store';
import { formatPrice } from '@/utils/formatPrice';
import EditOutlined from '@ant-design/icons/EditOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import { Button, Typography } from 'antd';
import React, { useCallback, useState } from 'react';

import { ProfileModal } from './Modal';
import { PROFILE_ITEM_TYPES } from './constants';
import { useUpdateBalance } from './hooks/useUpdateBalance';
import { useUpdateUser } from './hooks/useUpdateUser';
import './index.less';
import { ProfileEditableItem, ProfileEditableValue } from './interfaces';

const Settings: React.FC = () => {
  const { user, balance } = useAppSelector();
  const [editableItem, setEditableItem] = useState<Maybe<ProfileEditableItem>>(null);
  const [editableBalanceCurrency, setEditableBalanceCurrency] = useState<Maybe<CURRENCIES_TYPE>>(null);

  const refetchUser = useRefetchUser();
  const refetchBalance = useRefetchBalance();

  const { update: updateUser, isLoading: isLoadingUpdateUser } = useUpdateUser();
  const { update: updateBalance, isLoading: isLoadingUpdateBalance } = useUpdateBalance();
  const { logout, isLoading: isLoadingLogout } = useLogout();

  const handleClick = useCallback(
    (type: PROFILE_ITEM_TYPES, value: ProfileEditableValue, currency?: CURRENCIES_TYPE) => {
      setEditableItem({ type, value });

      if (currency) {
        setEditableBalanceCurrency(currency);
      }
    },
    []
  );

  const handleModalCancel = useCallback(() => setEditableItem(null), []);

  const handleModal = useCallback(
    async (value: ProfileEditableValue, type: PROFILE_ITEM_TYPES) => {
      if (type === PROFILE_ITEM_TYPES.FIRST_NAME) {
        await updateUser(value, type);
        refetchUser();
        refetchBalance();
      }

      if (type === PROFILE_ITEM_TYPES.CURRENCY) {
        await updateUser(value, type);
        refetchUser();
        refetchBalance();
      }

      if (type === PROFILE_ITEM_TYPES.BALANCE && editableBalanceCurrency) {
        await updateBalance(value, editableBalanceCurrency);
        refetchBalance();
      }
    },
    [updateUser, refetchUser, updateBalance, refetchBalance, editableBalanceCurrency]
  );

  const handleLogout = useCallback(() => logout(), [logout]);

  if (!user || !balance) {
    return null;
  }

  const currencies = user.currencies.reduce((acc, item, index) => {
    const symbol = CURRENCIES[item].symbol;
    const res = index > 0 ? `, ${symbol}` : `${symbol}`;

    acc = acc + res;
    return acc;
  }, '');

  const balances = balance?.value ?? {};

  return (
    <ErrorBoundary>
      <Section className="profile">
        <div className="profile__row">
          <Typography.Title level={5}>ID:</Typography.Title>
          <div className="profile__row-value">
            <Typography.Text>{user.id}</Typography.Text>
          </div>
        </div>

        <div className="profile__row">
          <Typography.Title level={5}>Логин:</Typography.Title>
          <div className="profile__row-value">
            <Typography.Text>{user.login}</Typography.Text>
          </div>
        </div>

        <div className="profile__row">
          <Typography.Title level={5}>Имя:</Typography.Title>
          <div className="profile__row-value">
            <Typography.Text>{user.firstName}</Typography.Text>
            <Button
              icon={<EditOutlined />}
              size="small"
              className="profile__row-button"
              onClick={() => handleClick(PROFILE_ITEM_TYPES.FIRST_NAME, user.firstName)}
            />
          </div>
        </div>

        <div className="profile__row">
          <Typography.Title level={5}>Баланс:</Typography.Title>

          <div>
            {Object.keys(balances).map((item) => {
              const currency = item as CURRENCIES_TYPE;
              const value = balances[currency] ?? 0;

              return (
                <div className="profile__row-value" key={currency}>
                  <Typography.Text>{formatPrice(value, currency)}</Typography.Text>
                  <Button
                    icon={<EditOutlined />}
                    size="small"
                    className="profile__row-button"
                    onClick={() => handleClick(PROFILE_ITEM_TYPES.BALANCE, value.toString(), currency)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="profile__row">
          <Typography.Title level={5}>Валюты:</Typography.Title>
          <div className="profile__row-value">
            <Typography.Text>{currencies}</Typography.Text>
            <Button
              icon={<EditOutlined />}
              size="small"
              className="profile__row-button"
              onClick={() => handleClick(PROFILE_ITEM_TYPES.CURRENCY, user.currencies)}
            />
          </div>
        </div>

        <Button className="profile__logout" icon={<LogoutOutlined />} onClick={handleLogout} loading={isLoadingLogout}>
          Выйти
        </Button>
      </Section>

      <ProfileModal
        item={editableItem}
        onCancel={handleModalCancel}
        isLoading={isLoadingUpdateUser || isLoadingUpdateBalance}
        onSubmit={handleModal}
      />
    </ErrorBoundary>
  );
};

export default Settings;
