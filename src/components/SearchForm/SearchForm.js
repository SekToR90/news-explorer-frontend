import React from "react";

function SearchForm(props) {

    return (
        <div className='search'>
            <div className='search__container'>
                <h1 className='search__title'>Что творится в мире?</h1>
                <p className='search__subtitle'>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                <form action="#" className='search__field'>
                    <input type="text" name="news" className="search__input"
                           placeholder="Введите тему новости" required autoComplete="off" />
                    {/*<span className={`search__error ${!er.text ? 'search__error_visible' : '' }`} id="news-error">Введите ключевое слово для поиска</span>*/}

                    <button type="submit" className='search__button'>Искать</button>
                </form>
            </div>
        </div>
    );
}


export default SearchForm;