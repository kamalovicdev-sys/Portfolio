import { useState, useEffect } from 'react';
import { Menu, X, Terminal, Sun, Moon, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, useTheme } from '../context/contexts';
import { langPath } from '../seo';

// Til va mavzu tugmalari uchun umumiy klasslar
const iconButtonClass = "relative inline-flex p-2 rounded-xl bg-surface-card dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-green-500/50 dark:hover:border-green-500/50 transition-colors";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Mavzu va til butun sayt uchun umumiy (context/ThemeProvider, context/LanguageProvider)
  const { toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const otherLang = lang === 'en' ? 'uz' : 'en';

  // Scroll effektini kuzatish
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#hero' },
    { name: t.nav.experience, href: '#experience' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/80 dark:bg-slate-950/80 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-slate-800 py-1'
          : 'bg-transparent border-b border-transparent py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 transition-all duration-300">

          {/* Logo qismi */}
          <a
            href="#hero"
            className="flex-shrink-0 font-bold text-lg sm:text-xl tracking-wider max-[359px]:text-base max-[359px]:tracking-normal flex items-center gap-2 cursor-pointer"
            onClick={(e) => scrollToSection(e, '#hero')}
          >
            <Terminal className="text-green-500" size={24} aria-hidden="true" />
            <span className="text-slate-900 dark:text-slate-100 transition-colors">Kamalovic</span>
            <span className="text-blue-500">.dev</span>
          </a>

          {/* O'ng tomon konteyneri (Menyu + Til + Dark Mode Toggle) */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8">

            {/* Kompyuter uchun menyu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-slate-600 dark:text-slate-300 hover:text-green-800 dark:hover:text-green-400 font-mono text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Til tugmasi: EN ↔ UZ, burchakdagi belgi joriy tilni ko'rsatadi.
                  Havola (a) — qidiruv tizimlari ikkinchi til sahifasini ham topishi uchun */}
              <motion.a
                href={langPath(otherLang)}
                hrefLang={otherLang}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  setLang(otherLang);
                }}
                className={iconButtonClass}
                // Ko'rinib turgan til belgisi (EN/UZ) ham nomga kiradi — ekran o'quvchilar uchun
                aria-label={`${lang.toUpperCase()} · ${t.nav.switchLanguage}`}
                title={t.nav.switchLanguage}
              >
                <Languages size={20} aria-hidden="true" />
                <span aria-hidden="true" className="absolute -bottom-1.5 -right-1.5 px-1 rounded-md bg-green-500 text-slate-900 text-[9px] font-bold font-mono uppercase leading-4">
                  {lang}
                </span>
              </motion.a>

              {/* Dark/Light Mode Tugmasi: ikonka CSS orqali almashadi (oldindan tayyorlangan HTML bilan mos bo'lishi uchun) */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={iconButtonClass}
                aria-label={t.nav.toggleTheme}
                title={t.nav.toggleTheme}
              >
                <Sun size={20} className="hidden dark:block" aria-hidden="true" />
                <Moon size={20} className="dark:hidden" aria-hidden="true" />
              </motion.button>
            </div>

            {/* Telefon uchun Gamburger tugmasi */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 dark:text-slate-300 hover:text-green-800 dark:hover:text-white focus:outline-none transition-colors p-1"
                aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Telefon uchun ochiladigan menyu (Animatsiya bilan) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-surface dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-6 pt-2 pb-6 space-y-2 shadow-xl">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="block px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:text-green-800 dark:hover:text-green-400 hover:bg-surface-alt dark:hover:bg-slate-800 font-mono text-sm transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
