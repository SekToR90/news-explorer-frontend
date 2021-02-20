import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Preloader from '../Preloader/Preloader';

function SavedNews({ cards, currentUser, handleCardDelete, loggedIn }) {
  return (
    <>
      <SavedNewsHeader cards={cards} />
      <section className="saved-news">
        <div className="saved-news__container">
          {cards.length > 0 ? (
            <div className="cards">
              {cards.map(item => (
                <NewsCard {...item} loggedIn={loggedIn} handleCardDelete={handleCardDelete} name="saved-news" />
              ))}
            </div>
          ) : (
            <Preloader
              textSubtitle={'Здесь будут ваши сохраненные статьи'}
              children={
                <>
                  <div className="preloader__image preloader__image_not-found"></div>
                  <h3 className="preloader__title">Ничего не найдено</h3>
                </>
              }
            />
          )}
        </div>
      </section>
    </>
  );
}

export default SavedNews;
