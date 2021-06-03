import i18n from 'i18next'
import main_en from './en/main.json'
import main_ru from './ru/main.json'
import settings_en from './en/settings.json'
import settings_ru from './ru/settings.json'
import sign_in_en from './en/signin.json'
import sign_in_ru from './ru/signin.json'
import videos_en from './en/videos.json'
import videos_ru from './ru/videos.json'

import { initReactI18next } from 'react-i18next'

export const languages: Record<string, string> = {
    'en': 'English',
    'ru': 'Русский',
} as const;

export const resources = {
    en: {
        main: main_en,
        settings: settings_en,
        sign_in: sign_in_en,
        videos: videos_en,
    },
    ru: {
        main: main_ru,
        settings: settings_ru,
        sign_in: sign_in_ru,
        videos: videos_ru,
    },
} as const

i18n.use(initReactI18next).init({
    lng: 'en',
    ns: ['main', 'settings', 'sign_in', 'videos'],
    resources,
})
