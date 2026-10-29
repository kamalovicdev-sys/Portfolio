import { useMemo, useSyncExternalStore } from 'react';
import { ThemeContext } from './contexts';

const STORAGE_KEY = 'theme';

// Mavzu manbai — <html> dagi .dark klassi. index.html dagi skript uni sahifa chizilishidan oldin qo'yadi
const subscribe = (callback) => {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
};
const getSnapshot = () => document.documentElement.classList.contains('dark');
// Prerender (server) va hydration paytida standart — tungi mavzu
const getServerSnapshot = () => true;

const toggleTheme = () => {
  const isDark = document.documentElement.classList.toggle('dark');
  try {
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  } catch {
    // Saqlab bo'lmasa ham mavzu joriy sessiyada ishlayveradi
  }
};

const ThemeProvider = ({ children }) => {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo(() => ({ isDark, toggleTheme }), [isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
