import React from "react";

function SearchForm(props) {
    const [inputSearch , setInputSearch] = React.useState('');
    const [inputSearchErrorMessage , setInputSearchErrorMessage ] = React.useState('');

    console.log(inputSearchErrorMessage)

    function handleInputChange(evt) {
        console.log('Нажали кнопку')
        console.log(evt)
        setInputSearch(evt.target.value);

    }

    function handleSubmit(evt) {
        console.log('мы тут!')
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
        if (!inputSearch) {
            setInputSearchErrorMessage('Введите ключевое слово для поиска');
            return
        }

        setInputSearchErrorMessage('');
        props.handleQueryInClick(); //выставляем флаг о запросе новостей, переделать на 3 этапе
    }

    return (
        <div className='search'>
            <div className='search__container'>
                <h1 className='search__title'>Что творится в мире?</h1>
                <p className='search__subtitle'>Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                <form action="#" className='search__field' onSubmit={handleSubmit} noValidate >
                    <input type="text" name="news" className="search__input"
                           placeholder="Введите тему новости" required value={inputSearch} onChange={handleInputChange} autoComplete="off" />
                    <span className='search__error'>{inputSearchErrorMessage}</span>

                    <button type="submit"  className='search__button' >Искать</button>
                </form>
            </div>
        </div>
    );
}


export default SearchForm;