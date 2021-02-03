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

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false); //Временное решение авторизации

  const [queryIn, setQueryIn] = React.useState(false); //Определяем нажали ли кнопку "Поиск", переделать на 3 этапе
  const [isSearchPreloader, setIsSearchPreloader] = React.useState(false); //запускаем прелоудер поиска, переделать на 3 этапе
  const [isNotFoundPreloader, setIsNotFoundPreloader] = React.useState(false); //запускаем прелоудер "ничего не найдено", переделать на 3 этапе
  const [isNewsCardList, setIsNewsCardList] = React.useState(false); //запускаем отрисовку карточек, переделать на 3 этапе

  const handleQueryInClick = () => {
    // Определяем нажали ли кнопку "Поиск" , переделать на 3 этапе
    setQueryIn(true);
    setIsNewsCardList(false);
    setIsSearchPreloader(true);

    setTimeout(startNotFoundPreloader, 3000);
  };

  const startNotFoundPreloader = () => {
    // отрисовываем прелоудер "ничего не найдено" , переделать на 3 этапе
    setIsSearchPreloader(false);
    setIsNotFoundPreloader(true);

    setTimeout(startNewsCardList, 3000);
  };

  const startNewsCardList = () => {
    // отрисовываем блок с карточками , переделать на 3 этапе
    setIsNotFoundPreloader(false);
    setIsNewsCardList(true);
  };

  //Обработчики событий открытия/закрытия модалок
  const handleLoginPopupClick = () => {
    setIsLoginPopupOpen(true);
  };

  const handleRegisterPopupClick = () => {
    setIsRegisterPopupOpen(true);
  };

  const handleInfoTooltipPopupClick = () => {
    setIsInfoTooltipPopupOpen(true);
  };

  const closeAllPopup = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  };

  function keydownEscape(evt) {
    if (evt.key === 'Escape') {
      closeAllPopup();
      window.removeEventListener('keydown', keydownEscape);
    }
  }
  //

  //функция смены попапов
  function handleChangePopup() {
    if (isLoginPopupOpen) {
      handleRegisterPopupClick();
    } else if (isRegisterPopupOpen) {
      handleLoginPopupClick();
    } else if (isInfoTooltipPopupOpen) {
      handleLoginPopupClick();
    }
  }

  //Закрытие попапов по нажатию на клавишу
  React.useEffect(() => {
    window.addEventListener('keydown', keydownEscape);
  });

  //Блоки регистрации и авторизации
  const handleLogin = () => {
    setLoggedIn(true); //Временное решение авторизации
  };

  const handleLogout = () => {
    // Удаляем токен и обнуляем стейты
    setLoggedIn(false);
  };
  //

  return (
    <div className="App">
      <Route exact path="/">
        {' '}
        {/*отображается главная страница проекта*/}
        <Header
          routePathStart={'/'}
          routePathNews={'/saved-news'}
          handleLoginPopupClick={handleLoginPopupClick}
          loggedIn={loggedIn}
          handleLogout={handleLogout}
        />
        <SearchForm handleQueryInClick={handleQueryInClick} />
        {queryIn ? ( // Определяем нажали ли кнопку "Поиск" , переделать на 3 этапе
          <Main
            loggedIn={loggedIn}
            isSearchPreloader={isSearchPreloader}
            isNotFoundPreloader={isNotFoundPreloader}
            isNewsCardList={isNewsCardList}
          />
        ) : null}
        <About />
      </Route>

      <Route path="/saved-news">
        <Header routePathStart={'/'} routePathNews={'/saved-news'} loggedIn={loggedIn} handleLogout={handleLogout} />
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
        openInfoTooltipPopup={handleInfoTooltipPopupClick}
      />

      <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopup} openNewPopup={handleChangePopup} />
    </div>
  );
}

export default App;
