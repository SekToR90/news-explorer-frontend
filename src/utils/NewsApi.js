export const BASE_URL = 'https://nomoreparties.co/news/v2/top-headlines?';

export const API_KEY = '12d81f7e61cf435c96cd193e85253ffb';

const dateComponent = new Date();
const startDate = dateComponent.toISOString().slice(0, 10);
const finishDate = dateComponent.toISOString(dateComponent.setDate(dateComponent.getDate() - 7)).slice(0, 10);

export const newsApi = keyword => {
  return fetch(
    `${BASE_URL}q=${keyword}&apiKey=${API_KEY}&from=${finishDate}&to=${startDate}&sortBy=publishedAt&pageSize=100`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    },
  ).then(res => {
    if (res.ok) {
      console.log(res);
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
