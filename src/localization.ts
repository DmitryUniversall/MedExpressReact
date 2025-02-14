import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Localization RU
import commonLocalizationRU from "./locales/ru/common.json"
import menuLocalizationRU from "./locales/ru/menu.json"
import footerLocalizationRU from "./locales/ru/footer.json"
import indexLocalizationRU from "./locales/ru/index.json"
import cartLocalizationRU from "./locales/ru/cart.json"
import profileLocalizationRU from "./locales/ru/profile.json"

// Localization EN
import commonLocalizationEN from "./locales/en/common.json"
import menuLocalizationEN from "./locales/en/menu.json"
import footerLocalizationEN from "./locales/en/footer.json"
import indexLocalizationEN from "./locales/en/index.json"
import cartLocalizationEN from "./locales/en/cart.json"
import profileLocalizationEN from "./locales/en/profile.json"


export function initializeLocalization(): void {
    i18n.use(initReactI18next)
        .init({
            debug: true,
            lng: 'ru',
            fallbackLng: 'ru',
            interpolation: { escapeValue: false },
            defaultNS: 'common',
            resources: {
                ru: {
                    common: commonLocalizationRU,
                    footer: footerLocalizationRU,
                    index: indexLocalizationRU,
                    menu: menuLocalizationRU,
                    cart: cartLocalizationRU,
                    profile: profileLocalizationRU
                },
                en: {
                    common: commonLocalizationEN,
                    footer: footerLocalizationEN,
                    index: indexLocalizationEN,
                    menu: menuLocalizationEN,
                    cart: cartLocalizationEN,
                    profile: profileLocalizationEN
                }
            }
        });
}
