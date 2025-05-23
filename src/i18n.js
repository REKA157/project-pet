import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip: often other resources are loaded from a backend server or a file system, like cdn)
const resources = {
  fr: {
    translation: {
      "welcome": "Bienvenue"
    }
  },
  en: {
    translation: {
      "welcome": "Welcome"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fr", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: "en", // fallback language is used when lng not found

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n; 