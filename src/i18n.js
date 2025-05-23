import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

// the translations
// (tip: often other resources are loaded from a backend server or a file system, like cdn)

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    debug: true,
    lng: 'fr', // langue par défaut
    fallbackLng: 'en', // langue de repli
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    ns: ['translation'], // namespace(s) to load
    defaultNS: 'translation',
  });

export default i18n; 