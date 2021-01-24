import React from 'react';
import NewsCardList from "../NewsCardList/NewsCardList";


function Maim() {
    return (
        <main className="main">
            <h2 className='main__title'>Результаты поиска</h2>
            <NewsCardList />
            <button type='button' className='main__card-add'>Показать еще</button>
        </main>
    );
}

export default Maim;