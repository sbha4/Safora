import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { type Language, getStoredLanguage, setStoredLanguage, translate } from './index';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getStoredLanguage);

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    setStoredLanguage(l);
  }, []);

  const t = useCallback((key: string, params?: Record<string, string | number>) => {
    return translate(key, lang, params);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
