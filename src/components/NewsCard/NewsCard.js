import React from 'react';

function NewsCard(props) {
  const [saveNewsCard, setSaveNewsCard] = React.useState(false); //проверяем нажата ли кнопка сохранения карточки

  //Ставим активное состояние кнопки сохранения карточки
  const hideMouseClick = () => {
    if (saveNewsCard) {
      return setSaveNewsCard(false);
    }
    setSaveNewsCard(true);
  };
  //

  function handleDeleteCard() {
    console.log('Карточка удалена');
  }

  return (
    <div className="card">
      <div className="card__button-container">
        {!props.loggedIn && props.name === 'main' ? (
          <div className="card__delete-container">
            <button type="button" className="card__button-save" />
            <p className="card__button-text">Войдите, чтобы сохранять статьи</p>
          </div>
        ) : null}

        {props.loggedIn && props.name === 'main' ? (
          <button
            type="button"
            className={`card__button-save card__button-save_main ${saveNewsCard ? 'card__button-save_active' : ''}`}
            onClick={hideMouseClick}
          />
        ) : null}

        {props.loggedIn && props.name === 'saved-news' ? (
          <>
            <div className="card__delete-container">
              <button type="button" className="card__delete-button" onClick={handleDeleteCard} />
              <p className="card__button-text">Убрать из сохранённых</p>
            </div>
            <p className="card__keyword">{props.keyword}</p>
          </>
        ) : null}
      </div>

      <a className="card__link" href={props.link} target="_blank" rel="noreferrer">
        <img className="card__image" src={props.image} alt="Фотография" />
      </a>
      <div className="card__group">
        <div className="card__group-text">
          <p className="card__data">{props.date}</p>
          <a className="card__link" href={props.link} target="_blank" rel="noreferrer">
            <h2 className="card__title">{props.title}</h2>
          </a>
          <p className="card__subtitle">{props.text}</p>
        </div>

        <a className="card__link" href={props.link} target="_blank" rel="noreferrer">
          <p className="card__author">{props.source}</p>
        </a>
      </div>
    </div>
  );
}

export default NewsCard;
