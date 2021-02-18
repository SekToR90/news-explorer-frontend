import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function SavedNews(props) {
  return (
    <>
      <SavedNewsHeader />
      <section className="saved-news">
        <div className="saved-news__container">
          <div className="cards">
            {props.cards.map(item => (
              <NewsCard
                {...item}
                loggedIn={props.loggedIn}
                handleCardDelete={props.handleCardDelete}
                name="saved-news"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default SavedNews;
