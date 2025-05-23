import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18nextHttpBackend from 'i18next-http-backend';

// the translations
// (tip: often other resources are loaded from a backend server or a file system, like cdn)

i18n
  .use(i18nextHttpBackend) // passes i18n down to react-i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "fr", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: "en", // fallback language is used when lng not found

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json' // adjusted path to load from public/locales
    },

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n; 