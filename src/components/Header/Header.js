import React from "react";
import {Link, useLocation} from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import headerImageMain from "../../images/header-image-main.svg"
import headerImageArticles from "../../images/header-image-articles.svg"

function Header(props) {
    const location = useLocation();
    console.log(props.loggedIn )

    const headerLinkMain = `${location.pathname === '/' ? 'header__link_active': 'header__link_inactive'}`
    const headerImageBlack = `${location.pathname === '/' ? `${headerImageMain}` : `${headerImageArticles}`}`
    const headerLinkArticles = `${location.pathname === '/saved-news' ? 'header__link_active': 'header__link_inactive'}`
    const headerLogoBlack = `${location.pathname === '/saved-news' ? 'header__logo_black': ''}`;
    const headerLinkBlack = `${location.pathname === '/saved-news' ? 'header__link_black': ''}`;
    const headerButtonBlack = `${location.pathname === '/saved-news' ? 'header__button_black': ''}`;

    return (
        <header className="header">
            <p className={`header__logo ${headerLogoBlack}`}>NewsExplorer</p>
            <Navigation children={
                <>
                    {props.loggedIn ?
                        <>
                            <Link to={props.routePathStart} className={`header__link ${headerLinkMain} ${headerLinkBlack}`}>Главная</Link>
                            <Link to={props.routePathNews} className={`header__link ${headerLinkArticles} ${headerLinkBlack}`}>Сохранённые статьи</Link>
                            <button className={`header__button header__button_articles ${headerButtonBlack}`} onClick={props.handleLogout}>Грета <img className='header__image' src={headerImageBlack} alt='Кнопка выхода'/></button>
                        </> :
                        <>
                            <Link to={props.routePathStart} className={`header__link header__link_active ${headerLinkBlack}`}>Главная</Link>
                            <button className='header__button' onClick={props.handleLoginPopupClick}>Авторизоваться</button>
                        </>
                    }
                </>
            }/>
        </header>
    );
};


export default Header;