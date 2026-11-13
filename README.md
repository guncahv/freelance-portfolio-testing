# Портфолио фриланс-разработчика — Unit- и E2E-тесты

Лабораторная работа №29 «Написание Unit-тестов для компонентов и E2E-тестов для пользовательских сценариев
веб-приложения». Вариант 1 — «Портфолио фриланс-разработчика».

Выполнил: Рахманкулов А., группа 310101.

Проект — React-приложение из ЛР №19/№23 (React + React Bootstrap), к которому добавлены страница «Контакты»
с формой обратной связи и автоматические тесты двух уровней:

- **Unit-тесты** — Jest + React Testing Library (`src/**/*.test.js(x)`);
- **E2E-тест** — Playwright (`e2e/contact.spec.js`), запрос к API перехватывается `page.route()`.

## Стек

- React 19, Vite, React Router, React Bootstrap
- Jest 30, babel-jest, jsdom, React Testing Library, user-event, jest-dom
- Playwright Test (Chromium)

## Установка

Нужен [Node.js](https://nodejs.org/) 20.19 или новее.

```bash
git clone https://github.com/guncahv/freelance-portfolio-testing.git
cd freelance-portfolio-testing
npm install
npx playwright install chromium   # браузер для E2E-тестов (один раз)
```

Запуск приложения: `npm run dev` → http://localhost:5174 (страница формы — http://localhost:5174/contacts).
Запросы `/api/...` в режиме разработки проксируются на API из ЛР №28 (http://localhost:5000).

## Unit-тесты (Jest)

```bash
npm test            # все unit-тесты с подробным выводом
npm run test:watch  # режим наблюдения
```

| Файл | Что проверяет |
|---|---|
| `src/utils/validators.test.js` | функция-валидатор `validateEmail` (корректные и некорректные адреса) и `validateContactForm` |
| `src/components/ProjectCard/ProjectCard.test.jsx` | `ProjectCard` отображает все переданные props (title, description, теги, обложку) и реагирует на клик «в избранное» |
| `src/components/ContactForm/ContactForm.test.jsx` | форма показывает ошибки валидации, отправляет данные через API (замокан `jest.mock()`), показывает успех и ошибку сервера |

## E2E-тест (Playwright)

```bash
npm run test:e2e          # запуск в консоли (приложение стартует автоматически)
npm run test:e2e:ui       # интерфейс Test Runner (UI Mode)
npm run test:e2e:report   # HTML-отчёт последнего запуска
```

Сценарий «Отправка сообщения» (`e2e/contact.spec.js`):

1. Открыть главную страницу.
2. Перейти на страницу «Контакты» через меню — проверить URL `/contacts` и заголовок.
3. Заполнить поля формы: имя, email, сообщение.
4. Нажать «Отправить».
5. Проверить сообщение «Сообщение отправлено!», очистку формы и тело перехваченного запроса.

Запрос `POST /api/messages` перехватывается `page.route()` и получает заранее заданный ответ `201 Created`,
поэтому тест не зависит от запущенного сервера и базы данных.

## Структура

```
src/
  api/messages.js                 # клиент API: sendMessage → POST /api/messages
  utils/validators.js             # validateEmail, validateContactForm
  utils/validators.test.js        # unit-тесты валидаторов
  components/ProjectCard/         # ProjectCard.jsx + ProjectCard.test.jsx
  components/ContactForm/         # ContactForm.jsx + ContactForm.test.jsx
  pages/HomePage.jsx, pages/ContactsPage.jsx
e2e/contact.spec.js               # E2E-сценарий Playwright
jest.config.cjs, babel.config.cjs, test/   # настройки Jest
playwright.config.js              # настройки Playwright
```
