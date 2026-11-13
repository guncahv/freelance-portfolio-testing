import marketplaceCover from '../assets/project-marketplace.svg';
import crmCover from '../assets/project-crm.svg';
import fintechCover from '../assets/project-fintech.svg';
import portfolioCover from '../assets/project-portfolio.svg';
import mobileCover from '../assets/project-mobile.svg';
import dashboardCover from '../assets/project-dashboard.svg';

// Данные проектов портфолио. В ProjectCard передаются через props.
// Шесть карточек, чтобы на всех брейкпоинтах были видны полные ряды сетки (3 / 2 / 1).
const projects = [
  {
    id: 'marketplace',
    title: 'Маркетплейс handmade-товаров',
    description: 'Каталог, корзина и кабинет мастера. Загрузка страниц стала быстрее на 40 %.',
    image: marketplaceCover,
    tags: ['React', 'TypeScript', 'Node.js'],
    meta: '2026 · фриланс',
  },
  {
    id: 'crm',
    title: 'CRM для автосервиса',
    description: 'Запись клиентов, учёт запчастей и уведомления в Telegram для сети из 5 станций.',
    image: crmCover,
    tags: ['Vue', 'Laravel', 'MySQL'],
    meta: '2026 · фриланс',
  },
  {
    id: 'fintech',
    title: 'Лендинг финтех-стартапа',
    description: 'Адаптивный лендинг с калькулятором вклада. Конверсия в заявку выросла до 7,8 %.',
    image: fintechCover,
    tags: ['Next.js', 'Tailwind', 'Figma'],
    meta: '2026 · фриланс',
  },
  {
    id: 'portfolio',
    title: 'Сайт-портфолио фотографа',
    description: 'Галерея с ленивой загрузкой, онлайн-бронирование съёмки и админка для альбомов.',
    image: portfolioCover,
    tags: ['React', 'Firebase'],
    meta: '2025 · фриланс',
  },
  {
    id: 'mobile',
    title: 'Приложение доставки еды',
    description: 'Кроссплатформенное приложение с отслеживанием курьера и оплатой в два касания.',
    image: mobileCover,
    tags: ['React Native', 'Expo', 'Stripe'],
    meta: '2025 · команда',
  },
  {
    id: 'dashboard',
    title: 'Дашборд аналитики продаж',
    description: 'Графики выручки, воронка заказов и выгрузка отчётов в Excel для интернет-магазина.',
    image: dashboardCover,
    tags: ['React', 'Chart.js', 'NestJS'],
    meta: '2025 · фриланс',
  },
];

export default projects;
