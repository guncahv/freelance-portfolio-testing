import homeIcon from '../assets/icon-home.svg';
import projectsIcon from '../assets/icon-projects.svg';
import aboutIcon from '../assets/icon-about.svg';
import contactIcon from '../assets/icon-contact.svg';

// Пункты меню шапки: to — маршрут React Router (страница или якорь на главной)
const navItems = [
  { id: 'home', label: 'Главная', to: '/', icon: homeIcon },
  { id: 'projects', label: 'Проекты', to: '/#projects', icon: projectsIcon },
  { id: 'about', label: 'Обо мне', to: '/#about', icon: aboutIcon },
  { id: 'contact', label: 'Контакты', to: '/contacts', icon: contactIcon },
];

export default navItems;
