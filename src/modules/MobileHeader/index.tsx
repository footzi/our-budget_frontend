import { ROUTES } from '@/constants/routes';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { Sidebar } from '../Sidebar';
import './index.less';

export const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClickButton = () => setIsMenuOpen((isOpen) => !isOpen);

  return (
    <header className="mobile-header">
      <Link to={ROUTES.MAIN} className="mobile-header__logo">
        <img src="./images/logo.svg" alt="" />
      </Link>

      <CSSTransition in={isMenuOpen} timeout={0}>
        <button className="mobile-header__menu-button" aria-label="Открыть меню" onClick={handleClickButton}>
          <span />
          <span />
          <span />
          <span />
        </button>
      </CSSTransition>

      <CSSTransition in={isMenuOpen} timeout={{ exit: 300 }} unmountOnExit>
        <div className="mobile-header__menu">
          <Sidebar />
        </div>
      </CSSTransition>

      <CSSTransition in={isMenuOpen} timeout={{ exit: 300 }} unmountOnExit>
        <div className="mobile-header__menu-overlay" />
      </CSSTransition>
    </header>
  );
};
