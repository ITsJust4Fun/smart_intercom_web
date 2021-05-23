import i18n from 'i18next';
import main_en from './en/main.json';
import main_ru from './ru/main.json';
import settings_en from './en/settings.json';
import settings_ru from './ru/settings.json';

import { initReactI18next } from 'react-i18next';

export const languages: Record<string, string> = {
    "en": "English",
    "ru": "Русский",
} as const;

export const resources = {
    en: {
        main: main_en,
        settings: settings_en,
    },
    ru: {
        main: main_ru,
        settings: settings_ru,
    },
} as const;

i18n.use(initReactI18next).init({
    lng: "en",
    ns: ["main", "settings"],
    resources,
});
