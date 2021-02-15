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
  //
  return (
    <section className="elements">
      <h2 className="elements__title">Результаты поиска</h2>
      <div className="cards">
        {isCardNumber.map(item => (
          <NewsCard {...item} loggedIn={props.loggedIn} name="main" />
        ))}
      </div>
      <button type="button" className="elements__card-add" onClick={handleClick}>
        Показать еще
      </button>
    </section>
  );
}

export default NewsCardList;
