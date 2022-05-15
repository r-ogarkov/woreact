import en from '../../public/locales/en/translation.json';
import ru from '../../public/locales/ru/translation.json';

export default {
  fallbackLng: false,
  lng: 'en',
  interpolation: {
    escapeValue: false
  },
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json'
  },
  debug: false,
  react: {
    useSuspense: false
  },
  resources: {
    en: {
      translation: en
    },
    ru: {
      translation: ru
    }
  }
}
