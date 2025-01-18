import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'

export function initializeLocalization(): void {
    i18n
        .use(Backend)
        .use(initReactI18next)
        .init({
            debug: true,
            lng: 'ru',
            fallbackLng: 'ru',
            interpolation: { escapeValue: false },
            ns: ['common', 'footer', 'menu', 'index'],
            defaultNS: 'common',
            backend: {
                loadPath: '/src/locales/{{lng}}/{{ns}}.json',
            },
        });
}
