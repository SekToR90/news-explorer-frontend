import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import headerImageMain from '../../images/header-image-main.svg';
import headerImageArticles from '../../images/header-image-articles.svg';

function Header(props) {
  const location = useLocation();

  const headerBlack = `${props.isOpen ? 'header__black' : ''}`;
  const headerMenuLogoBlack = `${props.isOpen || location.pathname === '/' ? 'header__logo_white' : ''}`;

  const headerLinkMain = `${location.pathname === '/' ? 'header__link_active' : 'header__link_inactive'}`;
  const headerMainImage = `${
    props.isOpen || location.pathname === '/' ? `${headerImageMain}` : `${headerImageArticles}`
  }`;
  const headerLinkArticles = `${location.pathname === '/saved-news' ? 'header__link_active' : 'header__link_inactive'}`;
  const headerLogoBlack = `${!props.isOpen && location.pathname === '/saved-news' ? 'header__logo_black' : ''}`;
  const headerLinkBlack = `${location.pathname === '/saved-news' ? 'header__link_black' : ''}`;
  const headerButtonBlack = `${!props.isOpen && location.pathname === '/saved-news' ? 'header__button_black' : ''}`;

  function handleMenuClick() {
    props.handleNavigationPopupClick();
  }

  return (
    <header className={`header ${headerBlack}`}>
      <p className={`header__logo ${headerLogoBlack} ${headerMenuLogoBlack}`}>NewsExplorer</p>
      {location.pathname === '/saved-news' ? (
        <div
          className={`header__burger-button ${
            props.isOpen ? 'header__burger-button_close' : 'header__burger-button_menu-black'
          }`}
          onClick={handleMenuClick}
        />
      ) : (
        <div
          className={`header__burger-button ${
            props.isOpen ? 'header__burger-button_close' : 'header__burger-button_menu'
          }`}
          onClick={handleMenuClick}
        />
      )}

      <Navigation
        children={
          <>
            {props.loggedIn ? (
              <>
                <div className="header__link-container">
                  <Link to={props.routePathStart} className={`header__link ${headerLinkMain} ${headerLinkBlack}`}>
                    Главная
                  </Link>
                  <Link to={props.routePathNews} className={`header__link ${headerLinkArticles} ${headerLinkBlack}`}>
                    Сохранённые статьи
                  </Link>
                </div>

                <button
                  className={`header__button header__button_articles ${headerButtonBlack}`}
                  onClick={props.handleLogout}
                >
                  Грета <img className="header__image" src={headerMainImage} alt="Кнопка выхода" />
                </button>
              </>
            ) : (
              <>
                <div className="header__link-container">
                  <Link to={props.routePathStart} className={`header__link header__link_active ${headerLinkBlack}`}>
                    Главная
                  </Link>
                </div>

                <button className="header__button" onClick={props.handleLoginPopupClick}>
                  Авторизоваться
                </button>
              </>
            )}
          </>
        }
        isOpen={props.isOpen}
      />
    </header>
  );
}

export default Header;
