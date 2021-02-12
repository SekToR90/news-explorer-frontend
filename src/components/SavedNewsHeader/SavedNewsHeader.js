import React from "react";

function SavedNewsHeader () {
    return (
        <section className="saved-news-header">
            <p className="saved-news-header__info">Сохранённые статьи</p>
            <h2 className="saved-news-header__title">Грета, у вас 5 сохранённых статей</h2>
            <p className="saved-news-header__subtitle">По ключевым словам:
                <span className="saved-news-header__subtitle saved-news-header__subtitle_bold"> Природа, Тайга</span> и
                <span className="saved-news-header__subtitle saved-news-header__subtitle_bold"> 2-м другим</span>
            </p>
        </section>
    );
}

export default SavedNewsHeader;