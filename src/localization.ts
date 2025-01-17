import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import frTranslation from './locales/ru/translation.json';


export function initializeLocalization(): void {
    i18n.use(initReactI18next).init({
        debug: true,
        resources: {
            en: { translation: enTranslation },
            fr: { translation: frTranslation },
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    });
}
