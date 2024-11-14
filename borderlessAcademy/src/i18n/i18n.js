import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { 
  enTranslations, 
  arTranslations, 
  hiTranslations, 
  zhTranslations, 
  deTranslations 
} from './translations/all';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      ar: {
        translation: arTranslations
      },
      hi: {
        translation: hiTranslations
      },
      zh: {
        translation: zhTranslations
      },
      de: {
        translation: deTranslations
      }
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar', 'hi', 'zh', 'de'],
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;