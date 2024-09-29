import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import HttpBackend from 'i18next-http-backend';
i18n
  .use(HttpBackend)
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false }, // React already does escaping
    fallbackLng: 'en',
    ns: ['common', 'glossary', 'user-menu'],
    defaultNS: 'common',
    backend: {
      // Path to your translation files
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  })
export default i18n
