import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNewsHeader({ cards }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [firstKeyword, setFirstKeyword] = React.useState('');
  const [secondKeyword, setSecondKeyword] = React.useState('');
  const [thirdKeyword, setThirdKeyword] = React.useState('');

  const numberCards = cards.length;
  const keywordCards = cards.map(item => (item = item.keyword));
  const keywordsArr = [...new Set(keywordCards)]; //Запоминаем все ключевые не повторяющиеся слова

  const noneKeywords = `${numberCards === 0 ? 'saved-news-header__subtitle_none' : ''}`;
  const zeroKeywords = `${thirdKeyword === 0 ? 'saved-news-header__subtitle_none' : ''}`;
  const zeroKeywordsText = `${thirdKeyword === 0 || thirdKeyword === '' ? '' : 'и'}`;

  //Выставляем нужные слова и склонения
  function declensionWords(data) {
    if (data === 0) {
      return 'сохранённых статей';
    } else if (data === 1) {
      return 'сохранённая статья';
    } else if (data >= 2 && data < 5) {
      return 'сохранённые статьи';
    } else if (data >= 5) {
      return 'сохранённых статей';
    }
  }
  //////////////////////////////////////

  function findFreqElem(data) {
    const store = {};

    data.forEach(item => {
      store[item] = store[item] ? store[item] + 1 : 1;
    });

    const entries = Object.entries(store).sort((a, b) => b[1] - a[1]);

    const firstMeaning = entries[0][0];
    setFirstKeyword(firstMeaning);

    if (entries.length === 1) {
      return;
    }
    const secondMeaning = entries[1][0];
    setSecondKeyword(secondMeaning);

    const firstResiduaryKeywords = deleteItems(keywordsArr, firstMeaning);
    const secondResiduaryKeywords = deleteItems(firstResiduaryKeywords, secondMeaning);

    if (secondResiduaryKeywords.length === 1) {
      setThirdKeyword(entries[2][0]);
    } else {
      setThirdKeyword(secondResiduaryKeywords.length);
    }
  }

  function deleteItems(data, element) {
    return data.filter(function (item) {
      return item !== element;
    });
  }

  React.useEffect(() => {
    if (numberCards !== 0) {
      findFreqElem(keywordCards);
    }
  }, [cards]);

  return (
    <section className="saved-news-header">
      <p className="saved-news-header__info">Сохранённые статьи</p>
      <h2 className="saved-news-header__title">
        {currentUser.userName}, у вас {numberCards} {declensionWords(numberCards)}
      </h2>
      <p className={`saved-news-header__subtitle ${noneKeywords}`}>
        По ключевым словам:{' '}
        <span className="saved-news-header__subtitle saved-news-header__subtitle_bold">
          {keywordsArr.length < 2 ? `${firstKeyword}` : `${firstKeyword}, ${secondKeyword}`}
        </span>{' '}
        {keywordsArr.length > 3 ? (
          <>
            {' '}
            {zeroKeywordsText}
            <span className={`saved-news-header__subtitle ${zeroKeywords} saved-news-header__subtitle_bold`}>
              {' '}
              {thirdKeyword} другим
            </span>
          </>
        ) : (
          <>
            {' '}
            {zeroKeywordsText}
            <span className={`saved-news-header__subtitle ${zeroKeywords} saved-news-header__subtitle_bold`}>
              {' '}
              {thirdKeyword}
            </span>
          </>
        )}
      </p>
    </section>
  );
}

export default SavedNewsHeader;
