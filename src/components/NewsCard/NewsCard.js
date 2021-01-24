import React from 'react';


function NewsCard(props) {
    return (
        <div className='card'>
            <div className='card__button-container'>
                <p className='card__button-text'>Войдите, чтобы сохранять статьи</p>
                <button type='button' className='card__save-button' />
            </div>
            <div className='card__group'>
                <img className='card__image' src={props.image} alt='Фотография'/>
                <div className='card__group-text'>
                    <p className='card__data'>{props.date}</p>
                    <h2 className='card__title'>{props.title}</h2>
                    <p className='card__subtitle'>{props.text.length > 157 ? props.text.substr(0,157)+'...' : props.text}</p>
                </div>
            </div>
                <p className='card__author'>{props.source}</p>
        </div>
    );
}

export default NewsCard;