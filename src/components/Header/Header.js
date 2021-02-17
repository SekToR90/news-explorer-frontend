import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import headerImageMain from '../../images/header-image-main.svg';
import headerImageArticles from '../../images/header-image-articles.svg';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Header(props) {
  const location = useLocation();
  const currentUser = React.useContext(CurrentUserContext);

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
  const headerBoxShadow = `${location.pathname === '/saved-news' ? 'header-box_articles' : 'header-box_main'}`;

  function handleMenuClick() {
    props.handleNavigationPopupClick();
  }

  return (
    <header className={`header ${headerBlack} ${headerBoxShadow}`}>
      <p
        className={`header__logo ${headerLogoBlack} ${headerMenuLogoBlack} ${
          props.clickAuthenticate ? 'header__logo_none' : ''
        }`}
      >
        NewsExplorer
      </p>
      {location.pathname === '/saved-news' ? (
        <div
          className={`header__burger-button ${
            props.isOpen ? 'header__burger-button_close' : 'header__burger-button_menu-black'
          }`}
          onClick={handleMenuClick}
        />
      ) : (
        <div
          className={`header__burger-button ${props.clickAuthenticate ? 'header__burger-button_none' : ''} ${
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
                <Link to={props.routePathStart} className={`header__link ${headerLinkMain} ${headerLinkBlack}`}>
                  Главная
                </Link>
                <Link to={props.routePathNews} className={`header__link ${headerLinkArticles} ${headerLinkBlack}`}>
                  Сохранённые статьи
                </Link>

                <button
                  className={`header__button header__button_articles ${headerButtonBlack}`}
                  onClick={props.handleLogout}
                >
                  {currentUser.userName} <img className="header__image" src={headerMainImage} alt="Кнопка выхода" />
                </button>
              </>
            ) : (
              <>
                <Link to={props.routePathStart} className={`header__link header__link_active ${headerLinkBlack}`}>
                  Главная
                </Link>

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
