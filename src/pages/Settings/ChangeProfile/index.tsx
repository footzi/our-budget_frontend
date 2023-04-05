import { useRefetchBalance, useRefetchUser } from '@/api';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { BalanceHelpContent } from '@/components/HelpContents/BalanceHelpContent';
import { HelpHint } from '@/components/HelpHint';
import { SuperHamster } from '@/components/Images/SuperHamster';
import { Section } from '@/components/Section';
import { CURRENCIES_TYPE, LOCAL_STORAGE_ITEMS, OPTIONS_CURRENCIES } from '@/constants';
import { useLogout } from '@/hooks/useLogout';
import { useAppSelector } from '@/store';
import { getCurrencyInfo } from '@/utils/getCurrencyInfo';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import { Button, Form, Input, InputNumber, Select, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useUpdateBalance } from './hooks/useUpdateBalance';
import { useUpdateUser } from './hooks/useUpdateUser';
import { SettingsFormBody } from './interfaces';
import { formValidator } from './utils/formValidator';
import { getIsChangedBalance } from './utils/getIsChangedBalance';

export const ChangeProfile: React.FC = () => {
  const [hasChanges, setIsHasChanges] = useState(false);
  const { user, balance } = useAppSelector();

  const refetchUser = useRefetchUser();
  const refetchBalance = useRefetchBalance();

  const { update: updateUser, isLoading: isLoadingUpdateUser } = useUpdateUser();
  const { update: updateBalance, isLoading: isLoadingUpdateBalance } = useUpdateBalance();
  const { logout, isLoading: isLoadingLogout } = useLogout();

  const [form] = useForm();
  const balances = useMemo(() => balance?.value ?? {}, [balance]);

  const handleSubmit = useCallback(
    async (form: SettingsFormBody) => {
      const isChangedBalance = getIsChangedBalance(balances, form.balances);

      if (isChangedBalance) {
        // @todo сделать на бэке метод обновления баланса массивом либо
        //  отдельную ручку для измененя профиля
        for (const item in form.balances) {
          const currency = item as CURRENCIES_TYPE;
          const value = form.balances[currency] ?? 0;

          await updateBalance(currency, value);
        }
      }

      const body = { firstName: form.firstName, currencies: form.currencies };

      await updateUser(body);
      setIsHasChanges(false);
      refetchUser();
      refetchBalance();
    },
    [balances, refetchBalance, refetchUser, updateBalance, updateUser]
  );

  const handleLogout = useCallback(() => logout(), [logout]);

  const handleFieldsChange = () => {
    setIsHasChanges(true);
  };

  useEffect(() => {
    if (user && balances) {
      const { firstName, currencies } = user;

      form.setFieldsValue({
        firstName,
        currencies,
        balances,
      });
    }
  }, [form, user, balances]);

  if (!user || !balance) {
    return null;
  }

  return (
    <ErrorBoundary>
      <Section
        className="profile__section"
        title="Данные профиля"
        footer={
          <div className="profile__footer">
            <Button icon={<LogoutOutlined />} onClick={handleLogout} loading={isLoadingLogout}>
              Выйти
            </Button>
          </div>
        }>
        <div className="profile__content">
          <Form form={form} onFinish={handleSubmit} onFieldsChange={handleFieldsChange}>
            <div className="profile__row">
              <Typography.Text strong>E-mail</Typography.Text>
              <div className="profile__row-value">
                <Typography.Text>{user.login}</Typography.Text>
              </div>
            </div>

            <div className="profile__row">
              <Typography.Text strong>Имя пользователя</Typography.Text>
              <div className="profile__row-value">
                <Form.Item name="firstName" rules={[{ required: true, message: 'Введите имя' }]}>
                  <Input placeholder="Василий Петров" />
                </Form.Item>
              </div>
            </div>

            <div className="profile__row">
              <Typography.Text strong>Валюты</Typography.Text>

              <div className="profile__row-value">
                <Form.Item name="currencies" rules={[{ required: true, message: 'Выберите валюту' }]}>
                  <Select mode="multiple" placeholder="$, ₽" options={OPTIONS_CURRENCIES} />
                </Form.Item>
              </div>
            </div>

            <div className="profile__row">
              <div className="profile__row-label">
                <Typography.Text strong>Текущий баланс</Typography.Text>
                <HelpHint
                  className="profile__row-hint"
                  content={<BalanceHelpContent />}
                  localStorageKey={LOCAL_STORAGE_ITEMS.SHOW_BALANCE_HELP_HINT}
                />
              </div>

              <div className="profile__row-value">
                {Object.keys(balances).map((item) => {
                  const currency = item as CURRENCIES_TYPE;
                  const symbol = getCurrencyInfo(currency).symbol;

                  return (
                    <div className="profile__row-value" key={currency}>
                      <Form.Item
                        name={['balances', currency]}
                        rules={[{ required: true, message: 'Введите значение' }]}>
                        <InputNumber placeholder="10000" addonAfter={symbol} />
                      </Form.Item>
                    </div>
                  );
                })}

                <Form.Item shouldUpdate>
                  {({ getFieldsValue }) => {
                    const values = getFieldsValue();
                    const isValid = formValidator(values);

                    return (
                      <Button
                        disabled={!isValid || !hasChanges}
                        className="profile__submit"
                        loading={isLoadingUpdateUser || isLoadingUpdateBalance}
                        type="primary"
                        htmlType="submit">
                        Сохранить
                      </Button>
                    );
                  }}
                </Form.Item>
              </div>
            </div>
          </Form>

          <div className="profile__image">
            <SuperHamster />
          </div>
        </div>
      </Section>
    </ErrorBoundary>
  );
};
