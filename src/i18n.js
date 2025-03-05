// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Til resurslari (uzbek, rus va ingliz tillari uchun)
i18n.use(initReactI18next).init({
  resources: {
    uz: {
      translation: {
        welcome: 'Xush kelibsiz',
        login: 'Kirish',
        news: 'Yangiliklar',
        projects: 'Loyihalar',
        partners: 'Hamkorlar',
        services: 'Xizmatlar',
        aboutUs: 'Biz haqimizda',
      },
    },
    ru: {
      translation: {
        welcome: 'Добро пожаловать',
        login: 'Войти',
        news: 'Новости',
        projects: 'Проекты',
        partners: 'Партнеры',
        services: 'Услуги',
        aboutUs: 'О нас',
      },
    },
    en: {
      translation: {
        welcome: 'Welcome',
        login: 'Login',
        news: 'News',
        projects: 'Projects',
        partners: 'Partners',
        services: 'Services',
        aboutUs: 'About Us',
      },
    },
  },
  lng: 'uz', // Boshlang'ich til
  fallbackLng: 'uz', // Agar til topilmasa, uzbek tilini fallback sifatida ishlatish
  interpolation: {
    escapeValue: false, // React uchun
  },
});

export default i18n;
