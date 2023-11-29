import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import EN from './locales/en.json';
import SR from './locales/sr-Latn.json';
import SR_CYRL from './locales/sr-Cyrl.json';

export const LANGUAGES = {
  en: EN,
  sr: SR,
  'sr-Cyrl': SR_CYRL,
};

i18n
  .use(initReactI18next)
  // set options
  .init({
    compatibilityJSON: 'v3',
    resources: LANGUAGES,
    lng: 'sr',
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });
