import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Main from '../Main/Main';
import About from '../About/About';
import Footer from '../Footer/Footer';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SavedNews from '../SavedNews/SavedNews';
import * as news from '../../utils/NewsApi';
import * as newsAuth from '../../utils/newsAuth';

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({}); ///! Данные о пользователе
  const [userExists, setUserExists] = React.useState({});

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

  //Функция поиска новостей
  const handleQueryInClick = keyword => {
    setQueryIn(true);
    setIsNewsCardList(false);
    setIsNotFoundPreloader(false);
    setIsSearchPreloader(true);
    news
      .newsApi(keyword)
      .then(data => {
        console.log(data);
        if (data.articles.length === 0) {
          return startNotFoundPreloader();
        }
        setIsNewsCards(
          data.articles.map(item => ({
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

  //Проверяем, есть ли токен
  React.useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      newsAuth
        .getContent(jwt)
        .then(res => {
          setUserData({ userName: res.name });
          setLoggedIn(true);
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
    setUserData({});
    setLoggedIn(false);
  };
  console.log(userData);
  ////////////////////////////////////////////

  return (
    <div className="App">
      <Route exact path="/">
        <Header
          routePathStart={'/'}
          routePathNews={'/saved-news'}
          handleLoginPopupClick={handleLoginPopupClick}
          loggedIn={loggedIn}
          handleLogout={handleLogout}
          handleNavigationPopupClick={handleNavigationPopupClick}
          isOpen={isNavigationPopupOpen}
          clickAuthenticate={isClickButtonAuthenticate}
          userData={userData}
        />
        <SearchForm handleQueryInClick={handleQueryInClick} />
        {queryIn ? ( // Определяем нажали ли кнопку "Поиск"
          <Main
            loggedIn={loggedIn}
            isSearchPreloader={isSearchPreloader}
            isNotFoundPreloader={isNotFoundPreloader}
            isNewsCardList={isNewsCardList}
            isNewsCards={isNewsCards} //Новостные данные
            isServerError={isServerError}
          />
        ) : null}
        <About />
      </Route>

      <Route path="/saved-news">
        <Header
          routePathStart={'/'}
          routePathNews={'/saved-news'}
          loggedIn={loggedIn}
          handleLogout={handleLogout}
          handleNavigationPopupClick={handleNavigationPopupClick}
          isOpen={isNavigationPopupOpen}
          userData={userData}
        />
        <SavedNewsHeader />
        <SavedNews loggedIn={loggedIn} />
      </Route>

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
  );
}

export default App;
