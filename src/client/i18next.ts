import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Fetch from 'i18next-fetch-backend';
import type { InitOptions } from 'i18next'
import options from 'shared/i18n';

i18next.use(Fetch);
i18next.use(initReactI18next);
i18next.init({
  ...options,
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json'
  }
} as InitOptions);

