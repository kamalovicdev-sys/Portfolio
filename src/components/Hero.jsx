import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Database, TerminalSquare, Send } from 'lucide-react';

const Hero = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const codeLines = [
      "kamalovic@portfolio:~$ init_backend_env",
      "> Loading Django & Flask configurations... [OK]",
      "> Connecting to Databases... [OK]",
      "kamalovic@portfolio:~$ start_data_pipeline",
      "> Analyzing data arrays... [OK]",
      "> System Ready. Scroll to explore_"
    ].join('\n');

    let i = 0;
    let timer;

    const startTyping = () => {
      timer = setInterval(() => {
        setText(codeLines.slice(0, i));
        i++;

        if (i > codeLines.length) {
          clearInterval(timer);
          setTimeout(() => {
            i = 0;
            startTyping();
          }, 3000);
        }
      }, 40);
    };

    startTyping();

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 md:px-6 py-20 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

        {/* Chap qism: Matn va Ma'lumot */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="flex items-center gap-2 mb-3 md:mb-4 text-green-400">
            <Server size={20} className="md:w-6 md:h-6" />
            <Database size={20} className="md:w-6 md:h-6" />
            <span className="font-mono text-xs md:text-sm tracking-wider">DATA & BACKEND ENGINEER</span>
          </div>

          <h2 className="text-xl md:text-3xl font-medium text-slate-300 mb-6 tracking-wide">
            Mavlonxon <span className="text-white font-bold">Mamadaliev</span>
          </h2>

          {/* SEO: Sahifadagi yagona H1 sarlavha */}
          <h1 className="text-3xl sm:text-3xl md:text-6xl font-bold mb-3 md:mb-6 text-slate-100 tracking-wide leading-tight">
            Murakkab muammolarga <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              soddalashgan yechimlar.
            </span>
          </h1>

          <p className="text-slate-400 text-sm md:text-lg mb-6 md:mb-8 max-w-lg leading-relaxed tracking-wide">
            Ma'lumotlar tahlili va yuqori yuklanishga bardosh beruvchi, ishonchli backend tizimlarini qurishga ixtisoslashganman
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-4 py-2.5 md:px-6 md:py-3 bg-green-500 hover:bg-green-600 text-slate-900 text-sm md:text-base font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <TerminalSquare size={18} />
              Loyihalar
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2.5 md:px-6 md:py-3 border border-slate-700 hover:border-slate-500 text-slate-300 text-sm md:text-base font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <Send size={16} />
              Bog'lanish
            </button>
          </div>
        </motion.div>

        {/* O'ng qism: Terminal Animatsiyasi */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl"
        >
          <div className="flex items-center px-4 py-2.5 bg-slate-950 border-b border-slate-800">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto text-slate-500 text-[10px] md:text-xs font-mono tracking-wider">bash - terminal</div>
          </div>

          {/* Terminal balandligi va shrifti telefonda qisqartirildi */}
          <div className="p-4 md:p-6 h-48 md:h-64 overflow-hidden font-mono text-xs md:text-[15px] leading-relaxed text-green-400 whitespace-pre-wrap break-words">
            {text}
            <span className="animate-pulse">|</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
