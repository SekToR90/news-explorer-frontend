import React from 'react';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList(props) {
  const [isCardNumber, setIsCardNumber] = React.useState([]);

  //логика отрисовки карточек
  React.useEffect(() => {
    setIsCardNumber(props.isNewsCards.slice(0, 3));
  }, []);

  function handleClick() {
    setIsCardNumber(props.isNewsCards.slice(0, isCardNumber.length + 3));
  }

  const endedCardNews = `${isCardNumber >= props.isNewsCards ? 'elements__card-add_none' : ''}`;

  //
  return (
    <section className="elements">
      <h2 className="elements__title">Результаты поиска</h2>
      <div className="cards">
        {isCardNumber.map(item => (
          <NewsCard
            {...item}
            loggedIn={props.loggedIn}
            name="main"
            newsKeyword={props.newsKeyword}
            handleSaveNews={props.handleSaveNews}
            deleteArticle={props.deleteArticle}
            cards={props.cards}
          />
        ))}
      </div>
      <button type="button" className={`elements__card-add ${endedCardNews}`} onClick={handleClick}>
        Показать еще
      </button>
    </section>
  );
}

export default NewsCardList;
