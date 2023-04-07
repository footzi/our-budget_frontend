import { ROUTES } from '@/constants';
import { Modal as AntModal, Button, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './index.less';
import { ModalProps } from './interfaces';

export const Modal: React.FC<ModalProps> = ({ isOpen, onCancel }) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    onCancel();
  };

  const handleButtonClick = (path: ROUTES) => {
    onCancel();
    navigate(path);
  };

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
              <Link to={ROUTES.SETTINGS} onClick={handleLinkClick}>
                {'Настройки'}
              </Link>{' '}
              и укажите ваш текущий баланс.
            </Typography.Paragraph>
          </div>
          <Button className="how-to-work-modal__button" onClick={() => handleButtonClick(ROUTES.SETTINGS)}>
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
              <Link to={ROUTES.CATEGORIES} onClick={handleLinkClick}>
                {'Список категорий'}
              </Link>
              .
            </Typography.Paragraph>
          </div>
          <Button className="how-to-work-modal__button" onClick={() => handleButtonClick(ROUTES.CATEGORIES)}>
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
              <Link to={ROUTES.PLANS} onClick={handleLinkClick}>
                {'План'}
              </Link>
              .
            </Typography.Paragraph>
          </div>
          <Button className="how-to-work-modal__button" onClick={() => handleButtonClick(ROUTES.PLANS)}>
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
              <Link to={ROUTES.FACTS} onClick={handleLinkClick}>
                {'Факт'}
              </Link>
              .
            </Typography.Paragraph>
          </div>
          <Button className="how-to-work-modal__button" onClick={() => handleButtonClick(ROUTES.FACTS)}>
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
              <Link to={ROUTES.MAIN} onClick={handleLinkClick}>
                {'Аналитика'}
              </Link>
              .
            </Typography.Paragraph>
          </div>
          <Button className="how-to-work-modal__button" onClick={() => handleButtonClick(ROUTES.MAIN)}>
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
              <Link to={ROUTES.SAVING_GOALS} onClick={handleLinkClick}>
                {'Список копилок'}
              </Link>
              .
            </Typography.Paragraph>
          </div>
          <Button className="how-to-work-modal__button" onClick={() => handleButtonClick(ROUTES.SAVING_GOALS)}>
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
              <Link to={ROUTES.SAVINGS} onClick={handleLinkClick}>
                {'Копилки'}
              </Link>
              .
            </Typography.Paragraph>
          </div>
          <Button className="how-to-work-modal__button" onClick={() => handleButtonClick(ROUTES.SAVINGS)}>
            Перейти -{'>'}
          </Button>
        </li>
      </ul>
    </AntModal>
  );
};
