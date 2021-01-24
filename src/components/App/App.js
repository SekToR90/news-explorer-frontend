import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Maim from "../Main/Main";

function App() {
  return (
    <div className="App">

     <Route path="/">  {/*отображается главная страница проекта*/}
         <Header routePathStart={'/'} routePathNews={'/saved-news'}/>
         <SearchForm />
         <Maim />
      </Route>

      <Route path="/saved-news">  {/*отображается страница «Сохранённые статьи»*/}

      </Route>

    </div>
  );
}

export default App;
