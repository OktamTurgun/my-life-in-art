import { createContext, useContext } from 'react';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import uz from '../locales/uz.json';

export type Language = 'uz' | 'en' | 'ru';

const translations = { uz, en, ru };

export type TranslationKeys = typeof uz;

export type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationKeys;
};

export const LanguageContext = createContext<LanguageContextType>({
  lang: 'uz',
  setLang: () => {},
  t: uz,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function getTranslations(lang: Language): TranslationKeys {
  return translations[lang];
}