import React, { useState, useEffect } from 'react';
import { translations } from './translations';
import { LanguageContext, Language } from './LanguageContext-context';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Load saved language from localStorage or default to 'he'
    try {
      const savedLanguage = localStorage.getItem('language');
      return (savedLanguage === 'he' || savedLanguage === 'en') ? savedLanguage : 'he';
    } catch (error) {
      // Fallback for SSR or when localStorage is not available
      return 'he';
    }
  });

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('language', lang);
    } catch (error) {
      // Handle localStorage errors silently
      console.warn('Could not save language to localStorage:', error);
    }
  };

  useEffect(() => {
    // Set document direction and language
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
