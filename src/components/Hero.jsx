import { useState, useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { Server, Database, TerminalSquare, Send } from 'lucide-react';
import { useLanguage } from '../context/contexts';
import MathScene from './MathScene';
import { highlightPython } from './pythonHighlight';
import { solverScript } from '../three/solverScript';

const TYPING_DELAY = 24;    // kod yozilganda har bir belgi orasidagi pauza, ms
const STEP_PAUSE = 450;     // kod qatorlari orasidagi pauza, ms
const OUTPUT_DELAY = 250;   // Enter bosilgandan keyin natija chiqquncha, ms
const OUTPUT_PAUSE = 1100;  // natijani o'qib olish uchun pauza, ms
const PROBLEM_PAUSE = 3000; // masala yechilgandan keyin keyingisigacha, ms

// Chap qismdagi matn CSS animatsiya bilan chiqadi (index.css → .hero-reveal):
// u JavaScript yuklanishini kutmaydi, shuning uchun sarlavha darhol ko'rinadi (LCP / SEO uchun).
// Har bir element 0.1 soniya farq bilan chiqadi
const revealDelay = (index) => ({ animationDelay: `${index * 0.1}s` });

const Hero = () => {
  const [text, setText] = useState('');
  // Terminalda yozilayotgan yechim bosqichi — 3D sahna shu bosqichni ko'rsatadi
  const [stage, setStage] = useState({ problem: solverScript[0].problem, stage: 0 });
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  // 3D terminal: tinch holatda ham biroz burilgan, sichqoncha bilan esa unga ergashadi.
  // Kursorning hero ichidagi o'rni: -0.5..0.5 (0 — markaz)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 20 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-18, 2]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -4]);

  const handlePointerMove = (e) => {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  // Terminal masalalarni Python REPL da bosqichma-bosqich "yechadi": kod harfma-harf yoziladi,
  // natija birdaniga chiqadi, 3D sahna esa har qadamda mos bosqichga o'tadi.
  // Masalalar navbat bilan cheksiz takrorlanadi
  useEffect(() => {
    let cancelled = false;
    const timers = new Set();
    const wait = (ms) => new Promise((resolve) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        resolve();
      }, ms);
      timers.add(timer);
    });

    const run = async () => {
      while (!cancelled) {
        for (const { problem, steps } of solverScript) {
          let typed = '';
          setText('');
          for (const step of steps) {
            if (cancelled) return;
            if (step.output) {
              await wait(OUTPUT_DELAY);
              if (cancelled) return;
              setStage({ problem, stage: step.stage });
              typed += `${step.output}\n`;
              setText(typed);
              await wait(OUTPUT_PAUSE);
              continue;
            }
            setStage({ problem, stage: step.stage });
            for (const char of `${step.code}\n`) {
              typed += char;
              setText(typed);
              await wait(TYPING_DELAY);
              if (cancelled) return;
            }
            await wait(STEP_PAUSE);
          }
          await wait(PROBLEM_PAUSE);
        }
      }
    };

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative isolate min-h-screen flex items-center justify-center px-4 md:px-6 py-20 overflow-hidden"
    >
      {/* Orqa fonda 3D perspektivali to'r (index.css → .hero-grid) */}
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-x-0 bottom-0 h-1/2 -z-10" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

        {/* Chap qism: Matn va Ma'lumot */}
        <div className="w-full">
          <div style={revealDelay(0)} className="hero-reveal flex items-center gap-2 mb-3 md:mb-4 text-green-800 dark:text-green-400">
            <Server size={20} className="md:w-6 md:h-6" aria-hidden="true" />
            <Database size={20} className="md:w-6 md:h-6" aria-hidden="true" />
            <span className="font-mono text-xs md:text-sm tracking-wider">DATA & BACKEND ENGINEER</span>
          </div>

          {/* SEO: Sahifadagi yagona H1 sarlavha — ism (qidiruvda aynan shu izlanadi) */}
          <h1 style={revealDelay(1)} className="hero-reveal text-xl md:text-3xl font-medium text-slate-600 dark:text-slate-300 mb-6 tracking-wide">
            Mavlonxon <span className="text-slate-900 dark:text-white font-bold">Mamadaliev</span>
          </h1>

          <p style={revealDelay(2)} className="hero-reveal text-3xl sm:text-3xl md:text-6xl font-bold mb-3 md:mb-6 text-slate-900 dark:text-slate-100 tracking-wide leading-tight">
            {t.hero.titleLine1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 dark:from-green-400 to-blue-600 dark:to-blue-500">
              {t.hero.titleLine2}
            </span>
          </p>

          <p style={revealDelay(3)} className="hero-reveal text-slate-600 dark:text-slate-400 text-sm md:text-lg mb-6 md:mb-8 max-w-lg leading-relaxed tracking-wide">
            {t.hero.subtitle}
          </p>

          <div style={revealDelay(4)} className="hero-reveal flex flex-wrap gap-3 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(34, 197, 94, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
              className="px-4 py-2.5 md:px-6 md:py-3 bg-green-500 hover:bg-green-600 text-slate-900 text-sm md:text-base font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <TerminalSquare size={18} aria-hidden="true" />
              {t.hero.projectsButton}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2.5 md:px-6 md:py-3 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-surface-alt dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300 text-sm md:text-base font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <Send size={16} aria-hidden="true" />
              {t.hero.contactButton}
            </motion.button>
          </div>
        </div>

        {/* O'ng qism: 3D matematik sahna + uning yechimini yozayotgan 3D terminal (ikkala mavzuda ham qorong'i) */}
        <div className="relative w-full max-w-full">
          {/* Three.js: tekisliklar kesishishi (Gauss usuli) va determinant — kub hajmining o'zgarishi */}
          <MathScene
            stage={stage}
            pointerX={smoothX}
            pointerY={smoothY}
            className="w-full aspect-[4/3]"
          />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            className="relative w-full max-w-full -mt-24 md:-mt-28"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }} // Havoda suzish effekti
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(74, 222, 128, 0.2)" }}
              className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-[0_40px_80px_-20px_rgba(2,6,23,0.6)] cursor-default"
            >
              <div className="flex items-center px-4 py-2.5 bg-slate-950 border-b border-slate-800">
                <div className="flex gap-2">
                  <motion.div whileHover={{ scale: 1.5 }} className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></motion.div>
                  <motion.div whileHover={{ scale: 1.5 }} className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></motion.div>
                  <motion.div whileHover={{ scale: 1.5 }} className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></motion.div>
                </div>
                <div className="mx-auto text-slate-400 text-[10px] md:text-xs font-mono tracking-wider">python3 — numpy</div>
              </div>

              {/* justify-end: yangi qatorlar pastdan qo'shiladi, eskilari yuqoridan "chiqib ketadi" */}
              <div className="p-4 md:p-5 h-44 md:h-52 overflow-hidden flex flex-col justify-end font-mono text-xs md:text-sm leading-relaxed">
                <p className="whitespace-pre-wrap break-words">
                  {highlightPython(text)}
                  <span className="animate-pulse text-green-400">|</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
