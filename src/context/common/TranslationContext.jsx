'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '@/src/hooks';
import ENG from '@/src/i18n/eng';
import JPY from '@/src/i18n/jpy';

const TranslationContext = createContext();

const LANGUAGES = {
  ENG: 'eng',
  JPY: 'jpy'
};

const TRANSLATIONS = {
  [LANGUAGES.ENG]: ENG,
  [LANGUAGES.JPY]: JPY
};

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useLocalStorage('language', LANGUAGES.ENG);
  const [translations, setTranslations] = useState(TRANSLATIONS[language]);

  useEffect(() => {
    console.log(TRANSLATIONS[language])
    setTranslations(TRANSLATIONS[language]);
  }, [language]);

  const updateLanguage = (newLanguage) => {
    if (LANGUAGES[newLanguage.toUpperCase()]) {
      setLanguage(newLanguage.toLowerCase());
    }
  };

  return (
    <TranslationContext.Provider value={{
      currentLanguage: language,
      translations,
      updateLanguage,
      LANGUAGES
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};