import React from "react";
import Github from '../../images/footer-git.svg'
import Facebook from '../../images/footer-facebook.svg'

function Footer(props) {
    return (
        <footer className='footer'>
            <p className='footer__logo'>&#169; 2020 Supersite, Powered by News API</p>
            <ul className='footer__container'>
                <li className='footer__link-main'>
                    <a className='footer__link-item' href={props.routePathStart}>Главная</a>
                </li>

                <li className='footer__link-yandex'>
                    <a className='footer__link-item' href='https://praktikum.yandex.ru/' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
                </li>

                <li className='footer__link'>
                    <a className='footer__link-git' href='https://github.com/SekToR90' target='_blank' rel='noreferrer'>
                        <img className='footer__image' src={Github} alt='гитхаб'/>
                    </a>
                </li>

                <li className='footer__link'>
                    <a className='footer__link-facebook' href='https://ru-ru.facebook.com/' target='_blank' rel='noreferrer'>
                        <img className='footer__image' src={Facebook} alt='фейсбук'/>
                    </a>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;