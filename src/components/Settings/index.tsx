import { Categories } from '@/components/Settings/Categories';
import { SavingGoals } from '@/components/Settings/SavingGoals';
import MoneyCollectOutlined from '@ant-design/icons/MoneyCollectOutlined';
import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { Tabs } from 'antd';
import React from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

import './index.less';

export const Content: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (key: string) => {
    const link = key === '/' ? '/settings' : `/settings/${key}`;

    navigate(link);
  };

  return (
    <div className="settings">
      <Tabs defaultActiveKey={params.tab} onChange={handleChange}>
        <Tabs.TabPane
          key="/"
          tab={
            <span>
              <UnorderedListOutlined />
              Категории
            </span>
          }>
          <Categories />
        </Tabs.TabPane>
        <Tabs.TabPane
          key="savingGoal"
          tab={
            <span>
              <MoneyCollectOutlined />
              Копилки
            </span>
          }>
          <SavingGoals />
        </Tabs.TabPane>
        <Tabs.TabPane
          key="profile"
          tab={
            <span>
              <UserOutlined />
              Профиль
            </span>
          }>
          Профиль
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export const Settings: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<Content />}></Route>
      <Route path=":tab" element={<Content />}></Route>
    </Routes>
  );
};
