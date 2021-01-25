import React from 'react';


function NewsCard(props) {
    const [isShown, setIsShown] = React.useState(false);

    const showItem =() => {
        setIsShown(true);
    }

    const hideItem =() => {
        setIsShown(false);
    }

    return (
        <div className='card'>
            <div className='card__button-container'>
                {isShown ? <p className='card__button-text'>Войдите, чтобы сохранять статьи</p> : null}
                <button type='button' className='card__save-button' onMouseEnter={showItem} onMouseLeave={hideItem}/>
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