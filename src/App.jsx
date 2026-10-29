import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Stats from './components/Stats';
import Contact from './components/Contact';
import { useLanguage } from './context/contexts';

function App() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <div className="bg-surface dark:bg-slate-950 min-h-screen selection:bg-blue-500/30 font-sans overflow-x-hidden transition-colors">
      <Navbar />

      {/* Navbar fixed bo'lgani uchun sections ostida qolib ketmasligiga  pt-20 (padding-top) qo'shamiz */}
      <main className="pt-20">
        <Hero />
        <Experience />
        <Projects />
        <Stats />
        <Contact />
      </main>


      <footer className="py-6 text-center border-t border-slate-200 dark:border-slate-900 bg-surface dark:bg-slate-950">
        <p className="text-slate-700 dark:text-slate-300 text-sm font-mono">
          {/* Yil build paytida va brauzerda farq qilishi mumkin — hydration ogohlantirishini o'chiramiz */}
          &copy; <span suppressHydrationWarning>{currentYear}</span> Kamalovic  <br/>
          <span className="text-xs text-slate-600 dark:text-slate-400">{t.footer.rights}</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
