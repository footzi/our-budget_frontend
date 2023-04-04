import { ROUTES } from '@/constants';
import { Modal as AntModal, Button, Typography } from 'antd';
import React from 'react';

import './index.less';
import { ModalProps } from './interfaces';

export const Modal: React.FC<ModalProps> = ({ isOpen, onCancel }) => {
  return (
    <AntModal className="how-to-work-modal" open={isOpen} footer={null} onCancel={onCancel}>
      <Typography.Title className="how-to-work-modal__title" level={5}>
        Как вносить доходы и расходы в Money Hamster?
      </Typography.Title>

      <ul className="how-to-work-modal__list">
        <li className="how-to-work-modal__item">
          <div className="how-to-work-modal__content">
            <div className="how-to-work-modal__item-titles">
              <Typography.Text className="how-to-work-modal__step" strong>
                Шаг 1
              </Typography.Text>
            </div>
            <Typography.Paragraph className="how-to-work-modal__text">
              Перейдите в раздел{' '}
              <a target="_blank" rel="noreferrer" href={ROUTES.SETTINGS}>
                {'Настройки'}
              </a>{' '}
              и укажите ваш текущий баланс.
            </Typography.Paragraph>
          </div>
          <Button className="how-to-work-modal__button" href={ROUTES.SETTINGS} target="_blank">
            Перейти -{'>'}
          </Button>
        </li>

        <li className="how-to-work-modal__item">
          <div className="how-to-work-modal__content">
            <div className="how-to-work-modal__item-titles">
              <Typography.Text className="how-to-work-modal__step" strong>
                Шаг 2
              </Typography.Text>
            </div>
            <Typography.Paragraph className="how-to-work-modal__text">
              Теперь создайте ваши категории расходов и доходов, это можно сделать в разделе{' '}
              <a target="_blank" rel="noreferrer" href={ROUTES.CATEGORIES}>
                {'Список категорий'}
              </a>
              .
            </Typography.Paragraph>
          </div>
          <Button className="how-to-work-modal__button" href={ROUTES.CATEGORIES} target="_blank">
            Перейти -{'>'}
          </Button>
        </li>

        <li className="how-to-work-modal__item">
          <div className="how-to-work-modal__content">
            <div className="how-to-work-modal__item-titles">
              <Typography.Text className="how-to-work-modal__step" strong>
                Шаг 3
              </Typography.Text>
              <Typography.Text italic type="secondary">
                Можно пропустить
              </Typography.Text>
            </div>
            <Typography.Paragraph className="how-to-work-modal__text">
              Спланируйте свои траты на ближайший месяц, для этого перейдите в раздел{' '}
              <a target="_blank" rel="noreferrer" href={ROUTES.PLANS}>
                {'План'}
              </a>
              .
            </Typography.Paragraph>
          </div>
          <Button className="how-to-work-modal__button" href={ROUTES.PLANS} target="_blank">
            Перейти -{'>'}
          </Button>
        </li>

        <li className="how-to-work-modal__item">
          <div className="how-to-work-modal__content">
            <div className="how-to-work-modal__item-titles">
              <Typography.Text className="how-to-work-modal__step" strong>
                Шаг 4
              </Typography.Text>
            </div>
            <Typography.Paragraph className="how-to-work-modal__text">
              Начните регулярно вносить в программу все свои расходы и доходы. Это можно сделать в разделе{' '}
              <a target="_blank" rel="noreferrer" href={ROUTES.FACTS}>
                {'Факт'}
              </a>
              .
            </Typography.Paragraph>
          </div>
          <Button className="how-to-work-modal__button" href={ROUTES.FACTS} target="_blank">
            Перейти -{'>'}
          </Button>
        </li>

        <li className="how-to-work-modal__item">
          <div className="how-to-work-modal__content">
            <div className="how-to-work-modal__item-titles">
              <Typography.Text className="how-to-work-modal__step" strong>
                Шаг 5
              </Typography.Text>
            </div>
            <Typography.Paragraph className="how-to-work-modal__text">
              Сравнивайте и анализируйте свои доходы и расходы в разделе{' '}
              <a target="_blank" rel="noreferrer" href={ROUTES.HOME}>
                {'Аналитика'}
              </a>
              .
            </Typography.Paragraph>
          </div>
          <Button className="how-to-work-modal__button" href={ROUTES.HOME} target="_blank">
            Перейти -{'>'}
          </Button>
        </li>
      </ul>

      <Typography.Title level={5} className="how-to-work-modal__title">
        Как учитывать в Money Hamster свои накопления?
      </Typography.Title>

      <ul className="how-to-work-modal__list">
        <li className="how-to-work-modal__item">
          <div className="how-to-work-modal__content">
            <div className="how-to-work-modal__item-titles">
              <Typography.Text className="how-to-work-modal__step" strong>
                Шаг 1
              </Typography.Text>
            </div>
            <Typography.Paragraph className="how-to-work-modal__text">
              Создайте свою копилку. Это можно сделать в разделе{' '}
              <a target="_blank" rel="noreferrer" href={ROUTES.SAVING_GOALS}>
                {'Список копилок'}
              </a>
              .
            </Typography.Paragraph>
          </div>
          <Button className="how-to-work-modal__button" href={ROUTES.SAVING_GOALS} target="_blank">
            Перейти -{'>'}
          </Button>
        </li>

        <li className="how-to-work-modal__item">
          <div className="how-to-work-modal__content">
            <div className="how-to-work-modal__item-titles">
              <Typography.Text className="how-to-work-modal__step" strong>
                Шаг 2
              </Typography.Text>
            </div>
            <Typography.Paragraph className="how-to-work-modal__text">
              Регулярно вносите в программу данные, сколько и в какую копилку вы откладываете, для этого перейдите в
              раздел{' '}
              <a target="_blank" rel="noreferrer" href={ROUTES.SAVINGS}>
                {'Копилки'}
              </a>
              .
            </Typography.Paragraph>
          </div>
          <Button className="how-to-work-modal__button" href={ROUTES.SAVINGS} target="_blank">
            Перейти -{'>'}
          </Button>
        </li>
      </ul>
    </AntModal>
  );
};
