import { createContext, useContext } from 'react';

export const LanguageContext = createContext(null);
export const ThemeContext = createContext(null);

// Joriy til va matnlar: const { t, lang, setLang } = useLanguage();
export const useLanguage = () => useContext(LanguageContext);

// Joriy mavzu: const { isDark, toggleTheme } = useTheme();
export const useTheme = () => useContext(ThemeContext);
