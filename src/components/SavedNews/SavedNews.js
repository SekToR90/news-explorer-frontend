import React from 'react';
import NewsCard from "../NewsCard/NewsCard";

import articles from '../../utils/articles'

function SavedNews(props) {

    return (
        <section className='saved-news'>
            <div className='saved-news__container'>
                <div className='cards'>
                    {articles.map((item) => (
                        <NewsCard {... item} loggedIn={props.loggedIn} name="saved-news"/>))}
                </div>
            </div>
        </section>
    );
}

export default SavedNews;