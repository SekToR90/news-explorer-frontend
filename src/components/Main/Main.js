import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';

function Main(props) {
  const textError = `${
    props.isServerError
      ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
      : 'К сожалению по вашему запросу ничего не найдено.'
  }`;

  return (
    <main className="main">
      {props.isSearchPreloader ? (
        <Preloader
          textSubtitle="Идет поиск новостей..."
          children={<div className="preloader__image preloader__image_search"></div>}
        />
      ) : null}

      {props.isNotFoundPreloader ? (
        <Preloader
          textSubtitle={textError}
          children={
            <>
              <div className="preloader__image preloader__image_not-found"></div>
              <h3 className="preloader__title">Ничего не найдено</h3>
            </>
          }
        />
      ) : null}

      {props.isNewsCardList ? (
        <NewsCardList
          loggedIn={props.loggedIn}
          isNewsCards={props.isNewsCards}
          newsKeyword={props.newsKeyword}
          handleSaveNews={props.handleSaveNews}
        />
      ) : null}
    </main>
  );
}

export default Main;
