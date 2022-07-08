import { Button } from 'antd';
import React, { useEffect } from 'react';

import { SubmitHiddenButtonProps } from './interfaces';

/**
 * Скрытая кнопка на форме для проставления валидации
 */
export const SubmitHiddenButton: React.FC<SubmitHiddenButtonProps> = ({ onValid, validator }) => {
  useEffect(() => {
    const isValid = validator();

    onValid(isValid);
  }, [onValid, validator]);

  return <Button htmlType="submit" />;
};
