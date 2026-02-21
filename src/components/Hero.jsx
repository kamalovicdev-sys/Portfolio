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

        // Matn tugagach, 3 soniya kutib yana boshidan boshlaydi
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

  // Tugma bosilganda kerakli bo'limga silliq tushish funksiyasi
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Chap qism: Matn va Ma'lumot */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-4 text-green-400">
            <Server size={24} />
            <Database size={24} />
            <span className="font-mono text-sm tracking-wider">DATA & BACKEND ENGINEER</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-100 tracking-wide">
            Murakkab muammolarga <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              soddalashgan yechimlar.
            </span>
          </h1>

          <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed tracking-wide">
            Men ma'lumotlarni tahlil qilish va yuqori yuklanishga bardosh beruvchi, ishonchli backend tizimlarini qurishga ixtisoslashganman.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-slate-900 font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <TerminalSquare size={20} />
              Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <Send size={18} />
              Contact
            </button>
          </div>
        </motion.div>

        {/* O'ng qism: Terminal Animatsiyasi */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl"
        >
          {/* Terminal sarlavhasi */}
          <div className="flex items-center px-4 py-3 bg-slate-950 border-b border-slate-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto text-slate-500 text-xs font-mono tracking-wider">bash - terminal</div>
          </div>

          {/* Terminal tanasi */}
          <div className="p-6 h-64 font-mono text-[15px] leading-relaxed text-green-400 whitespace-pre-wrap">
            {text}
            <span className="animate-pulse">|</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
