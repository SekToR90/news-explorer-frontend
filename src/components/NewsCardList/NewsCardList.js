import React from 'react';
import NewsCard from "../NewsCard/NewsCard";

import articles from '../../utils/articles'

function NewsCardList(props) {
    const [isCardNumber, setIsCardNumber] = React.useState([]);

    React.useEffect(() => {
        setIsCardNumber(articles.slice(0, 3));
    }, []);

    function handleClick () {
        setIsCardNumber(articles.slice(0, isCardNumber.length + 3));
    }

    return (
        <section className='elements'>
            <h2 className='elements__title'>Результаты поиска</h2>
            <div className='cards'>
                {isCardNumber.map((item) => (
                    <NewsCard {... item} loggedIn={props.loggedIn} />))}
            </div>
            <button type='button' className='elements__card-add' onClick={handleClick}>Показать еще</button>
        </section>
    );
}

export default NewsCardList;