import React from 'react';

function SearchForm(props) {
  const [inputSearch, setInputSearch] = React.useState('');
  const [inputSearchErrorMessage, setInputSearchErrorMessage] = React.useState('');

  function handleInputChange(evt) {
    setInputSearch(evt.target.value);
  }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    if (!inputSearch) {
      setInputSearchErrorMessage('Введите ключевое слово для поиска');
      return;
    }

    setInputSearchErrorMessage('');
    const toUpperSearch = inputSearch[0].toUpperCase() + inputSearch.slice(1);
    props.handleQueryInClick(toUpperSearch); //Вызываем функцию поиска по ключевому слову
  }

  return (
    <section className="search">
      <div className="search__container">
        <h1 className="search__title">Что творится в мире?</h1>
        <p className="search__subtitle">
          Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.
        </p>
        <form action="#" className="search__field" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="news"
            className="search__input"
            placeholder="Введите тему новости"
            required
            value={inputSearch}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <span className="search__error">{inputSearchErrorMessage}</span>

          <button type="submit" className="search__button">
            Искать
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
