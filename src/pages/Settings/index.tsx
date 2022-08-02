import { useRefetchBalance, useRefetchUser } from '@/api';
import { Section } from '@/components/Section';
import { Maybe } from '@/interfaces';
import { useAppSelector } from '@/store';
import { formatPrice } from '@/utils/formatPrice';
import EditOutlined from '@ant-design/icons/EditOutlined';
import { Button, Typography } from 'antd';
import React, { useCallback, useState } from 'react';

import { ProfileModal } from './Modal';
import { PROFILE_ITEM_TYPES } from './constants';
import { useUpdateBalance } from './hooks/useUpdateBalance';
import { useUpdateUser } from './hooks/useUpdateUser';
import './index.less';
import { ProfileEditableItem } from './interfaces';

export const Settings: React.FC = () => {
  const { user, balance } = useAppSelector();
  const [editableItem, setEditableItem] = useState<Maybe<ProfileEditableItem>>(null);

  const refetchUser = useRefetchUser();
  const refetchBalance = useRefetchBalance();

  const { update: updateUser, isLoading: isLoadingUpdateUser } = useUpdateUser();
  const { update: updateBalance, isLoading: isLoadingUpdateBalance } = useUpdateBalance();

  const handleClick = useCallback((type: PROFILE_ITEM_TYPES, value: string) => {
    setEditableItem({ type, value });
  }, []);

  const handleModalCancel = useCallback(() => setEditableItem(null), []);

  const handleModal = useCallback(
    async (value: string, type: PROFILE_ITEM_TYPES) => {
      if (type === PROFILE_ITEM_TYPES.FIRST_NAME) {
        await updateUser(value, type);
        refetchUser();
      }

      if (type === PROFILE_ITEM_TYPES.BALANCE) {
        await updateBalance(value);
        refetchBalance();
      }
    },
    [updateUser, refetchUser, updateBalance, refetchBalance]
  );

  if (!user || !balance) {
    return null;
  }

  return (
    <>
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
          <div className="profile__row-value">
            <Typography.Text>{formatPrice(balance.value.common)}</Typography.Text>
            <Button
              icon={<EditOutlined />}
              size="small"
              className="profile__row-button"
              onClick={() => handleClick(PROFILE_ITEM_TYPES.BALANCE, balance.value.common.toString())}
            />
          </div>
        </div>
      </Section>

      <ProfileModal
        item={editableItem}
        onCancel={handleModalCancel}
        isLoading={isLoadingUpdateUser || isLoadingUpdateBalance}
        onSubmit={handleModal}
      />
    </>
  );
};
