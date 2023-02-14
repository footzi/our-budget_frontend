import React from 'react';

import { ChangePassword } from './ChangePassword';
import { ChangeProfile } from './ChangeProfile';
import './index.less';

const Settings: React.FC = () => {
  return (
    <div className="profile">
      <ChangeProfile />
      <ChangePassword />
    </div>
  );
};

export default Settings;
