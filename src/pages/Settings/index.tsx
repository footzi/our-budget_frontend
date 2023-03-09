import React from 'react';

import { ChangePassword } from './ChangePassword';
import { ChangeProfile } from './ChangeProfile';
import { Info } from './Info';
import './index.less';

const Settings: React.FC = () => {
  return (
    <div className="profile">
      <ChangeProfile />
      <Info />
      <ChangePassword />
    </div>
  );
};

export default Settings;
