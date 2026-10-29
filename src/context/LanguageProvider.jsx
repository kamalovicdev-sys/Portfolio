import { useCallback, useEffect, useMemo, useState } from 'react';
import { LanguageContext } from './contexts';
import translations from '../i18n/translations';
import { getLangFromPath, langPath } from '../seo';

// Til URL dan olinadi: / — inglizcha (standart), /uz/ — o'zbekcha.
// Prerender paytida (serverda) window yo'q, shuning uchun til initialLang orqali beriladi
const LanguageProvider = ({ initialLang, children }) => {
  const [lang, setLangState] = useState(() =>
    initialLang in translations ? initialLang : getLangFromPath(window.location.pathname)
  );

  // Til almashganda URL ham almashadi — har bir til alohida sahifa (SEO uchun)
  const setLang = useCallback((nextLang) => {
    setLangState(nextLang);
    if (window.location.pathname !== langPath(nextLang)) {
      window.history.pushState(null, '', langPath(nextLang));
    }
  }, []);

  // Brauzerning "Orqaga" / "Oldinga" tugmalari
  useEffect(() => {
    const handlePopState = () => setLangState(getLangFromPath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // <html lang>, sahifa sarlavhasi va tavsifini joriy tilga moslash
  useEffect(() => {
    const { seo } = translations[lang];
    document.documentElement.lang = lang;
    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
