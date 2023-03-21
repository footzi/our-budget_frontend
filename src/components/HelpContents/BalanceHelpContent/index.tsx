import React from 'react';

import '../index.less';

export const BalanceHelpContent = () => {
  return (
    <div className="help-content">
      <div className="help-content__section">
        <u className="help-content__item_accent">Пример</u>
        <p>
          <i>
            У Алевтины есть две банковские карточки (сейчас на одной лежит 18 000р, на другой - 5 400р) и немного
            налички (2 500р) - всем этим она регулярно пользуется.
          </i>
        </p>
        <p>
          <i>
            Еще Алевтина регулярно откладывает деньги на сберегательный счет (6 000р) и немного наличкой под матрац (1
            500р).
          </i>
        </p>
      </div>

      <div className="help-content__section">
        <b className="help-content__item_accent">Что Алевтина должна указать в текущем балансе?</b>
      </div>

      <u className="help-content__item_accent">Ответ</u>
      <p>
        <i>
          18 000р + 5 400р + 2 500р ={' '}
          <b>
            <u>25 900р.</u>
          </b>
        </i>
      </p>
    </div>
  );
};
