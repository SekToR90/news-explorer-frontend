## News Explorer
<img src="https://github.com/SekToR90/news-explorer-frontend/blob/edit/src/images/news-explorer-logo.png" width="1060">

### О проекте
News Explorer - это сервис, в котором можно найти новости по запросу и сохранить в личном кабинете.

Проект можно посмотреть [здесь](www.sektor.news.students.nomoredomains.icu).
Бэкенд приложения расположен в [этом](https://github.com/SekToR90/news-explorer-api) репозитории

### Функциональность
- Поиск новостей
- Регистрация и авторизация
- Сохранение найденных статей в личном кабинете

### Используемый стек
[![Java Script](https://img.icons8.com/color/48/000000/js.png)](https://www.javascript.com/)
[![CSS](https://img.icons8.com/color/50/000000/css.png)]((https://www.w3.org/Style/CSS/specs.ru.html))
[![HTML](https://img.icons8.com/color/50/000000/html.png)](https://www.w3.org/TR/html52/introduction.html#introduction)
[![React.js](https://img.icons8.com/clouds/50/000000/react.png)](https://ru.reactjs.org/)

### Инструкция по разрёртыванию проекта:
```bash
# клонирование репозитория
$ git clone https://github.com/SekToR90/news-explorer-frontend.git

# установка зависимостей
$ npm install

# запуск приложения в режиме разработчика
$ npm run start

# сборка проекта
$ npm run build
```

##  Планы по доработке проекта
- Переписать код на TypeScript
- Изменить работу модальных окон
- Добавить анимацию для гамбургер-иконки в разрешении 320px
- Маркер на кнопке сохранения должен устанавливается после ответа сервера
- Поля формы должны быть заблокированны во время отправки запросов
- Сделать страницй с сообщение если запрос завершился ошибкой (например если пропал интернет)