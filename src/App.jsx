import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Stats from './components/Stats';
import Contact from './components/Contact';

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-slate-950 min-h-screen selection:bg-blue-500/30">
      <Hero />
      <Experience /> 
      <Projects />
      <Stats />
      <Contact />

  
      <footer className="py-6 text-center border-t border-slate-900 bg-slate-950">
        <p className="text-slate-500 text-sm font-mono">
          &copy; {currentYear} Kamalovic <br/>
          <span className="text-xs text-slate-600"> All rights reserved </span>
        </p>
      </footer>
    </div>
  );
}

export default App;
