import { useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Bosh sahifa', href: '#' },
    { name: 'Tajriba', href: '#experience' },
    { name: 'Loyihalar', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setIsOpen(false); // Telefon menyusini yopish

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
    <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo qismi */}
          <div className="flex-shrink-0 font-bold text-xl tracking-wider flex items-center gap-2 cursor-pointer" onClick={(e) => scrollToSection(e, '#')}>
            <Terminal className="text-green-500" size={24} />
            <span className="text-slate-100">Kamalovic</span>
            <span className="text-blue-500">.dev</span>
          </div>

          {/* Kompyuter uchun menyu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-slate-300 hover:text-green-400 font-mono text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Telefon uchun Gamburger tugmasi */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white focus:outline-none" aria-label={isOpen ? "Menyuni yopish" : "Asosiy menyuni ochish"} aria-expanded={isOpen}>
              {isOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
            </button>
          </div>

      {/* Telefon uchun ochiladigan menyu (Animatsiya bilan) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
          >
            <div className="px-6 pt-2 pb-6 space-y-2 shadow-xl">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="block px-4 py-3 rounded-lg text-slate-300 hover:text-green-400 hover:bg-slate-800 font-mono text-sm transition-colors"
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
