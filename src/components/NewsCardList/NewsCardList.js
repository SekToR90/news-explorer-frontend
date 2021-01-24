import React from 'react';
import NewsCard from "../NewsCard/NewsCard";

import articles from '../../utils/articles'


function NewsCardList() {
    return (
        <section className='elements'>
            {articles.map((item) => (
                <NewsCard {... item} />))}
        </section>
    );
}

export default NewsCardList;