import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Maim from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import LoginPopup from "../LoginPopup/LoginPopup";

function App() {
    const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);

    const [loggedIn, setLoggedIn] = React.useState(false) //Временное решение авторизации

    //Обработчики событий открытия/закрытия модалок
    const handleLoginPopupClick = () => {
        setIsLoginPopupOpen(true);
    }
    const closeLoginPopup = () => {
        setIsLoginPopupOpen(false);

        setLoggedIn(true); //Временное решение авторизации
    }
    //

    //Блоки регистрации и авторизации
    const handleLogout = () => { // Удаляем токен и обнуляем стейты
        setLoggedIn(false);
    }
    //

  return (
    <div className="App">

     <Route exact path="/">  {/*отображается главная страница проекта*/}
         <Header routePathStart={'/'}
                 routePathNews={'/saved-news'}
                 handleLoginPopupClick={handleLoginPopupClick}
                 loggedIn={loggedIn}
                 handleLogout ={handleLogout}
         />
         <SearchForm />
         <Maim />
         <About />
      </Route>

      <Route path="/saved-news">  {/*отображается страница «Сохранённые статьи»*/}
          <Header routePathStart={'/'}
                  routePathNews={'/saved-news'}
                  loggedIn={loggedIn}
                  handleLogout ={handleLogout}
          />
      </Route>

        <Footer routePathStart={'/'}/>

        <LoginPopup isOpen={isLoginPopupOpen}
                    onClose={closeLoginPopup}
                    setLoggedIn={setLoggedIn}
                    closeLoginPopup={closeLoginPopup}/>
    </div>
  );
}

export default App;
