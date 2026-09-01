import { useState, useEffect } from 'react';
import { Menu, X, Terminal, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Loyihaning avvalgi qismlari dark modeda qilingani uchun default qiymat 'true'
  const [isDark, setIsDark] = useState(true);

  // Scroll effektini kuzatish
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode klasini html tagiga qo'shish/olib tashlash
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navLinks = [
    { name: 'Bosh sahifa', href: '#' },
    { name: 'Tajriba', href: '#experience' },
    { name: 'Loyihalar', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (href === '#') {
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
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-slate-800 py-1' 
          : 'bg-transparent border-b border-transparent py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20 transition-all duration-300">

          {/* Logo qismi */}
          <div
            className="flex-shrink-0 font-bold text-xl tracking-wider flex items-center gap-2 cursor-pointer"
            onClick={(e) => scrollToSection(e, '#')}
          >
            <Terminal className="text-green-500" size={24} />
            <span className="text-slate-900 dark:text-slate-100 transition-colors">Kamalovic</span>
            <span className="text-blue-500">.dev</span>
          </div>

          {/* O'ng tomon konteyneri (Menyu + Dark Mode Toggle) */}
          <div className="flex items-center gap-4 md:gap-8">

            {/* Kompyuter uchun menyu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-slate-600 dark:text-slate-300 hover:text-green-500 dark:hover:text-green-400 font-mono text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Dark/Light Mode Tugmasi */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-gray-200 dark:border-slate-800 hover:border-green-500/50 dark:hover:border-green-500/50 transition-colors"
              aria-label="Mavzuni o'zgartirish"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Telefon uchun Gamburger tugmasi */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 dark:text-slate-300 hover:text-green-500 dark:hover:text-white focus:outline-none transition-colors p-1"
                aria-label={isOpen ? "Menyuni yopish" : "Asosiy menyuni ochish"}
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
            className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-6 pt-2 pb-6 space-y-2 shadow-xl">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="block px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-slate-800 font-mono text-sm transition-all"
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
