import React from 'react';
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";

function Main(props) {
    return (
        <main className="main">

            {props.isSearchPreloader ?
                <Preloader textSubtitle="Идет поиск новостей..."
                           children={
                               <div className="preloader__image preloader__image_search"></div>
                           }
                />
                :null
            }

            {props.isNotFoundPreloader ?
                <Preloader textSubtitle="К сожалению по вашему запросу ничего не найдено."
                           children={
                               <>
                                   <div className="preloader__image preloader__image_not-found"></div>
                                   <h3 className="preloader__title">Ничего не найдено</h3>
                               </>
                           }
                />
                : null
            }

            {props.isNewsCardList ?
                <NewsCardList loggedIn={props.loggedIn} />
                :null
            }

        </main>
    );
}

export default Main;