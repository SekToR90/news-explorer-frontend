import React from "react";
import {Link, useLocation} from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import headerImage from "../../images/header-image.svg"

function Header(props) {
    const location = useLocation();
    console.log(location);
    return (
        <header className="header">
            <p className="header__logo">NewsExplorer</p>
            <Navigation children={
                <>
                    <Link to={props.routePathStart} className={`header__link ${location.pathname === '/' ?
                        'header__link_active': 'header__link_inactive'}`}>Главная</Link>
                    <Link to={props.routePathNews} className={`header__link ${location.pathname === '/saved-news' ?
                        'header__link_active': 'header__link_inactive'}`}>Сохранённые статьи</Link>

                    {location.pathname === '/' ?
                        <button className='header__button'>Авторизоваться</button> : null
                    }

                    {location.pathname === '/saved-news' ?
                        <button className='header__button'>Грета <img className='header__image' src={headerImage} alt='Кнопка выхода'/></button> : null
                    }

                </>
            }/>
        </header>
    );
};


export default Header;