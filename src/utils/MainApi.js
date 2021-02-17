class Api {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }

  // Получаем массив карточек
  getAllCards() {
    return fetch(`${this.url}/articles`, {
      method: 'GET',
      headers: this.headers,
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //Сохраняем новую карточку
  postAddNewsCard(value) {
    return fetch(`${this.url}/articles`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        keyword: value.keyword,
        title: value.title,
        text: value.text,
        date: value.date,
        source: value.source,
        link: value.link,
        image: value.image,
      }),
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // //Запрос на удаление карточки
  // deleteCards(id) {
  //   return fetch(`${this.url}/cards/${id}`, {
  //     method: 'DELETE',
  //     headers: this.headers,
  //   }).then(res => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   });
  // }
}

const api = new Api({
  url: 'https://api.sektor.news.students.nomoredomains.icu',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-type': 'application/json',
  },
});

export default api;
