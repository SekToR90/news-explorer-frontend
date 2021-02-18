import React from 'react';
import { useHistory, Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Main from '../Main/Main';
import About from '../About/About';
import Footer from '../Footer/Footer';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import SavedNews from '../SavedNews/SavedNews';
import * as news from '../../utils/NewsApi';
import * as newsAuth from '../../utils/newsAuth';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import MainApi from '../../utils/MainApi';

function App() {
  const location = useLocation();
  const history = useHistory();

  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({}); // Данные о пользователе
  const [userExists, setUserExists] = React.useState({});
  const [newsKeyword, setNewsKeyword] = React.useState(''); //Хранит ключевое слово по которому искали новости
  const [cards, setCards] = React.useState([]); // Хранит все карточки пользователя

  const [queryIn, setQueryIn] = React.useState(false); //Определяем нажали ли кнопку "Поиск"
  const [isSearchPreloader, setIsSearchPreloader] = React.useState(false); //запускаем прелоудер поиска
  const [isNotFoundPreloader, setIsNotFoundPreloader] = React.useState(false); //запускаем прелоудер "ничего не найдено"
  const [isNewsCardList, setIsNewsCardList] = React.useState(false); //запускаем отрисовку карточек
  const [isNewsCards, setIsNewsCards] = React.useState([]); //Стейт с новостными данными
  const [isServerError, setIsServerError] = React.useState(false);

  //На разрешении 320px удаляем логотип и кнопку из блока Header
  const [isClickButtonAuthenticate, setIsClickButtonAuthenticate] = React.useState(false);

  function handleButtonAuthenticateClick() {
    setIsClickButtonAuthenticate(true);
  }
  ///////////////////////////////////////////////

  //Блоки регистрации и авторизации
  const handleRegister = (email, password, name) => {
    newsAuth
      .register(email, password, name)
      .then(() => {
        resetValidation();
        closeAllPopup();
        handleInfoTooltipPopupClick();
      })
      .catch(err => {
        if (err === 'Ошибка: 409') {
          setUserExists({
            error: true,
            text: 'Такой пользователь уже есть',
          });
        }
        console.log(err);
      });
  };

  const handleLogin = (email, password) => {
    newsAuth
      .authorize(email, password)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
        }
      })
      .catch(err => {
        if (err.status === 400) {
          console.log('не передано одно из полей');
        } else if (err.status === 401) {
          console.log('пользователь с email не найден');
        }
      });
  };

  //Проверяем, есть ли токен и отрисовываем карточки из локального хранилища
  React.useEffect(() => {
    tokenCheck();
    setNewsKeyword(localStorage.getItem('keyword'));
    const articles = JSON.parse(localStorage.getItem('articles'));
    if (articles === null) {
      return;
    }
    setIsNewsCards(
      articles.map(item => ({
        link: item.url,
        date: item.publishedAt,
        title: item.title,
        text: item.description,
        source: item.author,
        image: item.urlToImage,
      })),
    );
    setQueryIn(true);
    setIsNewsCardList(true);
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      newsAuth
        .getContent(jwt)
        .then(res => {
          if (res.email) {
            setCurrentUser({ userName: res.name, id: res._id });
            setLoggedIn(true);
          }
        })
        .catch(err => {
          if (err.status === 401) {
            console.log(err.statusText);
          } else {
            throw err;
          }
        });
    }
  };

  // Удаляем токен и обнуляем стейты
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setLoggedIn(false);
  };
  ////////////////////////////////////////////

  //Функция поиска новостей
  const handleQueryInClick = keyword => {
    localStorage.removeItem('keyword');
    localStorage.removeItem('articles');
    setQueryIn(true);
    setIsNewsCardList(false);
    setIsNotFoundPreloader(false);
    setIsSearchPreloader(true);
    news
      .newsApi(keyword)
      .then(data => {
        if (data.articles.length === 0) {
          return startNotFoundPreloader();
        }
        localStorage.setItem('keyword', keyword);
        setNewsKeyword(keyword);
        localStorage.setItem('articles', JSON.stringify(data.articles));
        const articles = JSON.parse(localStorage.getItem('articles'));
        setIsNewsCards(
          articles.map(item => ({
            link: item.url,
            date: item.publishedAt,
            title: item.title,
            text: item.description,
            source: item.author,
            image: item.urlToImage,
          })),
        );
        setIsNewsCardList(true);
        setIsSearchPreloader(false);
      })
      .catch(err => {
        setIsServerError(true);
      });
  };

  //Поличаем новости
  React.useEffect(() => {
    if (loggedIn) {
      MainApi.getAllCards()
        .then(data => {
          setCards(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [currentUser, loggedIn]);
  ///////////////////////////////////

  //Функция сохранения новостей
  const handleSaveNews = value => {
    MainApi.postAddNewsCard(value)
      .then(res => {
        const newCard = {
          link: res.link,
          date: res.date,
          title: res.title,
          text: res.text,
          source: res.source,
          image: res.image,
          _id: res._id,
        };
        setCards([newCard, ...cards]);
      })
      .catch(err => {
        console.log(err);
      });
  };
  //////////////////////////////////////////////

  //Удаляем новостную карточку
  const handleCardDelete = _id => {
    MainApi.deleteCards(_id)
      .then(() => {
        // Формируем новый массив на основе имеющегося, удаляя из него выбранную карточку
        const cardsDelete = cards.filter(item => item._id !== _id);
        setCards(cardsDelete);
      })
      .catch(err => {
        console.log(err);
      });
  };
  //////////////////////////////////////////////////

  //Удаление сохраненных новостей
  const deleteArticle = data => {
    const mySavedArticle = cards.find(item => item.title === data.title && item.text === data.text);

    handleCardDelete(mySavedArticle._id);
  };
  /////////////////////////////////////////////////
  //
  // const searchArticle = () => {
  //   const myArticle = cards.find(item => item.title === cards.title && item.text === cards.text);
  //   console.log(myArticle);
  // };

  //Открываем модалку при вводе в адресную строку "/saved-news" для не зарегистрированного пользователя
  React.useEffect(() => {
    const routerState = history.location.state;
    if (routerState && routerState.noAuthRedirected && history.action === 'REPLACE') {
      setIsLoginPopupOpen(true);
    }
  }, []);
  //////////////////////////////////////////////////////

  // Функция запускает прелоудер "ничего не найдено"
  const startNotFoundPreloader = () => {
    setIsNewsCardList(false);
    setIsSearchPreloader(false);
    setIsNotFoundPreloader(true);
  };
  /////////////////////////////////////////////////////

  //Обработчики событий открытия/закрытия модалок
  const handleLoginPopupClick = () => {
    setIsLoginPopupOpen(true);
    setIsNavigationPopupOpen(false);
    handleButtonAuthenticateClick();
  };

  const handleRegisterPopupClick = () => {
    setIsRegisterPopupOpen(true);
  };

  const handleInfoTooltipPopupClick = () => {
    setIsInfoTooltipPopupOpen(true);
  };

  const handleNavigationPopupClick = () => {
    if (!isNavigationPopupOpen) {
      return setIsNavigationPopupOpen(true);
    }
    setIsNavigationPopupOpen(false);
  };

  const closeAllPopup = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setIsClickButtonAuthenticate(false);
  };

  function keydownEscape(evt) {
    if (evt.key === 'Escape') {
      closeAllPopup();
      window.removeEventListener('keydown', keydownEscape);
    }
  }

  const resetValidation = () => {
    setUserExists({
      error: false,
      text: '',
    });
  };
  //

  //функция смены попапов
  function handleChangePopup() {
    if (isLoginPopupOpen) {
      handleButtonAuthenticateClick();
      handleRegisterPopupClick();
    } else if (isRegisterPopupOpen) {
      handleButtonAuthenticateClick();
      handleLoginPopupClick();
    } else if (isInfoTooltipPopupOpen) {
      handleButtonAuthenticateClick();
      handleLoginPopupClick();
    }
  }

  //Закрытие попапов по нажатию на клавишу
  React.useEffect(() => {
    window.addEventListener('keydown', keydownEscape);
  });
  ////////////////////////////////////////

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {location.pathname === '/' ? (
          <Header
            routePathStart={'/'}
            routePathNews={'/saved-news'}
            handleLoginPopupClick={handleLoginPopupClick}
            loggedIn={loggedIn}
            handleLogout={handleLogout}
            handleNavigationPopupClick={handleNavigationPopupClick}
            isOpen={isNavigationPopupOpen}
            clickAuthenticate={isClickButtonAuthenticate}
          />
        ) : (
          <Header
            routePathStart={'/'}
            routePathNews={'/saved-news'}
            loggedIn={loggedIn}
            handleLogout={handleLogout}
            handleNavigationPopupClick={handleNavigationPopupClick}
            isOpen={isNavigationPopupOpen}
          />
        )}

        <Switch>
          <Route exact path="/">
            <SearchForm handleQueryInClick={handleQueryInClick} />
            {queryIn ? ( // Определяем нажали ли кнопку "Поиск"
              <Main
                loggedIn={loggedIn}
                isSearchPreloader={isSearchPreloader}
                isNotFoundPreloader={isNotFoundPreloader}
                isNewsCardList={isNewsCardList}
                isServerError={isServerError}
                isNewsCards={isNewsCards}
                newsKeyword={newsKeyword}
                handleSaveNews={handleSaveNews}
                deleteArticle={deleteArticle}
                cards={cards}
              />
            ) : null}
            <About />
          </Route>

          <ProtectedRoute
            path="/saved-news"
            loggedIn={loggedIn}
            component={SavedNews}
            handleCardDelete={handleCardDelete}
            cards={cards}
          />
        </Switch>

        <Footer routePathStart={'/'} />

        <LoginPopup
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopup}
          setLoggedIn={setLoggedIn}
          handleLogin={handleLogin}
          openNewPopup={handleChangePopup}
        />

        <RegisterPopup
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopup}
          openNewPopup={handleChangePopup}
          handleRegister={handleRegister}
          userExists={userExists}
          resetValidation={resetValidation}
        />

        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopup} openNewPopup={handleChangePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
