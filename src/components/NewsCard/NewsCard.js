import React from 'react';


function NewsCard(props) {
    const [isShown, setIsShown] = React.useState(false); //проверяем состояние при наведении мыши на элемент
    const [saveNewsCard, setSaveNewsCard] = React.useState(false); //проверяем нажата ли кнопка сохранения карточки

    const showItem =() => {
        setIsShown(true);
    }

    const hideItem =() => {
        setIsShown(false);
    }

    const hideMouseClick =() => {
        if (saveNewsCard) {
            return  setSaveNewsCard(false);
        }
        setSaveNewsCard(true);
    }

    return (
        <div className='card'>
            <div className='card__button-container'>
                {isShown ?  <p className='card__button-text'>Войдите, чтобы сохранять статьи</p> : null}
                {props.loggedIn ?
                    <button type='button' className={`card__save-button ${saveNewsCard ? 'card__save-button_active' : ''}`}  onClick={hideMouseClick}/>
                :
                    <button type='button' className='card__save-button' onMouseEnter={showItem} onMouseLeave={hideItem}/>
                }
            </div>
            <div className='card__group'>
                <a className='card__link' href={props.link} target='_blank' rel='noreferrer'><img className='card__image' src={props.image} alt='Фотография'/></a>
                <div className='card__group-text'>
                    <p className='card__data'>{props.date}</p>
                    <a className='card__link' href={props.link} target='_blank' rel='noreferrer'><h2 className='card__title'>{props.title}</h2></a>
                    <p className='card__subtitle'>{props.text.length > 157 ? props.text.substr(0,157)+'...' : props.text}</p>
                </div>
            </div>
            <a className='card__link' href={props.link} target='_blank' rel='noreferrer'><p className='card__author'>{props.source}</p></a>
        </div>
    );
}

export default NewsCard;