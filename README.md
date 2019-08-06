# Инструкция по запуску приложения [movie-info-app-react](https://github.com/Onefun1/movie-info-app-react/tree/local)

<<<<<<< HEAD
## 1. Запуск локально

• С помощью терминала [IDE](https://ru.wikipedia.org/wiki/Интегрированная_среда_разработки) или [Git](https://git-scm.com) (git bash) скачиваем или клонируем (git clone URL) репозиторий приложения movie-info-app-react.

• устанавливаем все зависимости для сервера и приложения, которые указаны в файле package.json - для этого вводим команду npm inastall находясь в соответсвующей директории.
**Для сервера и приложения есть свой package.json, локальный сервер находиться в папке приложения src/server/package.json (запускать его нужно с помощью другого терминала или командной строки)**

• После установки зависимостей, можно запускать сервер npm run dev (**_с nodemon - после внесения изменений обновляется самостоятельно_**) или npm start и приложение npm run start / ( npm start ). **_команды указаны в package.json файле._**

• Приложение готово к работе

## 2. Запуск приложения на [Heroku](https://devcenter.heroku.com/start)

• Переходим по ссылке, приложение готово к работе. ( _есть отличия в работе с локальным приложением_ )

## [Link for prewiev](https://onefun1.github.io/movie-info-app-react/)

# Архитектура приложения

Приложение состоит из двух основных частей: **_локального NodeJs сервера и самого ReactJs приложения._**

## Приложение состоит из таких компонентов:

1. Стандартного компонента App \*( create-react-app ), который включает в себя все остальные компоненты.
2. Header – шапка приложения.
3. Основной компонент Main в котором происходят все процессы.

## Компонент Main включает в себя такие дочерние элементы:

• **_Form_** – компонент который отвечает за отправку формы в данном случае мы можем добавить новый фильм со своей информацией как на сервер так и в своё приложение с помощью запроса POST. Кнопка Add оправляет запрос на наш сервер с последующим сохранением данных на сервере. Кнопка Cancel стандартная отмена действия.

• **_Section_** – компонент который отвечает за информацию одного фильма. В этом компоненте отображается: **_title, year, format, stars, movieID_**. Также в нём есть кнопки, которые меняют его состояние и состояние всего приложения - **_Watch и Delete_**. Кнопка Delete удаляет информацию о фильме с приложения. Watch – кнопка для добавления в список просмотра.
=======
## 1.	Запуск локально

•	С помощью терминала [IDE](https://ru.wikipedia.org/wiki/Интегрированная_среда_разработки) или [Git](https://git-scm.com) (git bash) скачиваем или клонируем (git clone URL) репозиторий приложения movie-info-app-react.

•	устанавливаем все зависимости для сервера и приложения, которые указаны в файле package.json - для этого вводим команду npm inastall находясь в соответсвующей директории. 
**Для сервера и приложения есть свой package.json, локальный сервер находиться в папке приложения src/server/package.json (запускать его нужно с помощью другого терминала или командной строки)**

•	После установки зависимостей, можно запускать сервер npm run dev (***с nodemon - после внесения изменений обновляется самостоятельно***) или npm start и приложение npm run start  / ( npm start ). ***команды указаны в package.json файле.***

• Приложение готово к работе

## 2.	Запуск приложения на [Heroku](https://devcenter.heroku.com/start)

• Переходим по ссылке, приложение готово к работе. ( *есть отличия в работе с локальным приложением* )

[Link for prewiev](https://onefun1.github.io/movie-info-app-react/)
-----

# Архитектура приложения


Приложение состоит из двух основных частей: ***локального NodeJs сервера и самого ReactJs приложения.***

## Приложение состоит из таких компонентов:
1.	Стандартного компонента App  *( create-react-app ), который включает в себя все остальные компоненты.
2.	Header – шапка приложения.
3.	Основной компонент Main в котором происходят все процессы.
## Компонент Main включает в себя такие дочерние элементы:
•	***Form*** – компонент который отвечает за отправку формы в данном случае мы можем добавить новый фильм со своей информацией как на сервер так и в своё приложение с помощью запроса POST. Кнопка Add оправляет запрос на наш сервер с последующим сохранением данных на сервере. Кнопка Cancel стандартная отмена действия.
 
•	***Section*** – компонент который отвечает за информацию одного фильма. В этом компоненте отображается: ***title, year, format, stars, movieID***. Также в нём есть кнопки, которые меняют его состояние и состояние всего приложения - ***Watch и Delete***. Кнопка Delete удаляет информацию о фильме  с приложения. Watch – кнопка для добавления в список просмотра.
>>>>>>> 6dafae690738628ef54af52ce9bcd8cf5790b278

### Приложение при своём запуске предлагает два возможных начала работы – загрузить данные, что хранятся на сервере или загрузить свой текстовый файл со списком фильмов, который храниться в корне приложения. (src/sample_movies[756].txt)
