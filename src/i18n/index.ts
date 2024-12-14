import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      welcome: 'Добро пожаловать',
      products: 'Продукты',
      subscriptions: 'Подписки',
      profile: 'Профиль',
      admin: 'Админ панель',
      login: 'Войти',
      register: 'Регистрация',
      logout: 'Выйти'
    }
  },
  en: {
    translation: {
      welcome: 'Welcome',
      products: 'Products',
      subscriptions: 'Subscriptions',
      profile: 'Profile',
      admin: 'Admin Panel',
      login: 'Login',
      register: 'Register',
      logout: 'Logout'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;