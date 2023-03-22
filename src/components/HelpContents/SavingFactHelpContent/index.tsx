import React from 'react';

import '../index.less';

export const SavingFactHelpContent = () => {
  return (
    <div className="help-content">
      <div className="help-content__section">
        <p>Выбирая действие “Положить”, указанная сумма:</p>
        <p className="help-content__item_accent">
          вычитается из{' '}
          <b>
            <i>текущего баланса</i>
          </b>{' '}
          и прибавляется к{' '}
          <b>
            <i>балансу копилки</i>
          </b>
        </p>
      </div>

      <div className="help-content__section">
        <p>Выбирая действие “Положить”, указанная сумма:</p>
        <p className="help-content__item_accent">
          вычитается из{' '}
          <b>
            <i>баланса копилки</i>
          </b>{' '}
          и прибавляется к{' '}
          <b>
            <i>текущему балансу</i>
          </b>
        </p>
      </div>
    </div>
  );
};
