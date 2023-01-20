import { useRefetchBalance, useRefetchUser } from '@/api';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SuperHamster } from '@/components/Images/SuperHamster';
import { Section } from '@/components/Section';
import { CURRENCIES_TYPE, OPTIONS_CURRENCIES } from '@/constants';
import { useLogout } from '@/hooks/useLogout';
import { formValidator } from '@/pages/Settings/utils/formValidator';
import { getIsChangedBalance } from '@/pages/Settings/utils/getIsChangedBalance';
import { useAppSelector } from '@/store';
import { getCurrencyInfo } from '@/utils/getCurrencyInfo';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import { Button, Form, Input, InputNumber, Select, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useCallback, useEffect, useMemo } from 'react';

import { useUpdateBalance } from './hooks/useUpdateBalance';
import { useUpdateUser } from './hooks/useUpdateUser';
import './index.less';
import { SettingsFormBody } from './interfaces';

const Settings: React.FC = () => {
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
      refetchUser();
      refetchBalance();
    },
    [balances, refetchBalance, refetchUser, updateBalance, updateUser]
  );

  const handleLogout = useCallback(() => logout(), [logout]);

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
      <Section className="profile" title="Данные профиля">
        <div className="profile__content">
          <Form form={form} onFinish={handleSubmit}>
            <div className="profile__row">
              <Typography.Text strong>ID</Typography.Text>
              <div className="profile__row-value">
                <Typography.Text>{user.id}</Typography.Text>
              </div>
            </div>

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
              <Typography.Text strong>Текущий баланс</Typography.Text>

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
                        disabled={!isValid}
                        className="profile__submit"
                        loading={isLoadingUpdateUser || isLoadingUpdateBalance}
                        type="primary"
                        htmlType="submit">
                        {/*Сохранить изменения*/}
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

          <div className="profile__logout">
            <Button icon={<LogoutOutlined />} onClick={handleLogout} loading={isLoadingLogout}>
              Выйти
            </Button>
          </div>
        </div>
      </Section>
    </ErrorBoundary>
  );
};

export default Settings;
